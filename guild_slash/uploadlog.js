// /uploadlog — two ways in:
//   * With a file, it is an explicit upload: the log is parsed publicly in the
//     channel it was run in, UNLESS it is a type that always relays (tspack /
//     dmp / appcrash / dalamud.injector), which go to the server's designated
//     private relay channel via modules/relayFile.js.
//   * With no file, it opens the same dialog the FAQ's Upload Log button does
//     (modals/uploadLog.js), where the file, the handling mode and the relay
//     destination are all chosen. This is what lets an always-present upload
//     button work in a channel where no FAQ has just been read.
//
// This command owns its whole Discord conversation: the option read, the
// ephemeral rejections, the defer, and every reply. Nothing about it lives in
// modules/ — see modules/respond.js for the pieces shared with the other
// handlers.

const {
	SlashCommandBuilder,
} = require('discord.js');
const {
	buildUploadLogModal,
} = require('../modals/uploadLog');

const {
	checkUpload, isSpecialRelayAttachment,
} = require('../modules/processAttachment');
const {
	relayFile,
} = require('../modules/relayFile');
const {
	parseLog,
} = require('../modules/parseLog');
const {
	replyToSource, failAfterDefer, noParseableData,
} = require('../modules/respond');
const dmRelay = require('../modules/dmRelay');

/**
 * Build the slash command data. The file option is optional on purpose: with a
 * file the command is a one-shot public upload, without one it opens the upload
 * dialog. When attached it opens the OS file picker on the client.
 */
exports.commandData = () => new SlashCommandBuilder()
	.setName('uploadlog')
	.setDescription('Upload and parse a Dalamud or XIVLauncher log file.')
	.addAttachmentOption(o => o.setName('file')
		.setDescription('The log file to parse. Omit to open the upload dialog.')
		.setRequired(false))
	.toJSON();

exports.run = async (client, interaction) => {
	const attachment = interaction.options.getAttachment('file');

	// No file: there is nothing to validate, so hand the user to the upload
	// dialog. showModal must be the interaction's first and only response and
	// cannot follow a defer, so this is the first thing that may happen here.
	if (!attachment) {
		await interaction.showModal(buildUploadLogModal(interaction.inGuild()));
		return;
	}

	// Validate BEFORE deferring so these errors can be ephemeral replies without
	// leaving a public "thinking" message behind. Accept ANY plain-text .log/.txt,
	// plus the special binary types: the parsers inspect CONTENT to decide what
	// (if anything) is parseable, so a filename prefix allowlist would wrongly
	// reject e.g. "client.log" or "log.txt". Same accepted set and size ceiling as
	// the FAQ upload modal.
	const rejection = checkUpload(attachment.name, attachment.size);
	if (rejection) {
		await interaction.reply({
			content: rejection,
			ephemeral: true,
		});
		return;
	}

	// A file attached to the command is taken as a public upload for the channel it
	// was run in, so the reply is deferred publicly. The types that always relay
	// are diverted below and answer through this same deferred reply.
	await interaction.deferReply();

	try {
		// DMs: parse as normal, then offer a relay chooser instead of auto-relaying.
		// handleLog routes special files (tspack/dmp/crash/injector) to the
		// dedicated flow and sends generic parseable files through the chooser.
		if (interaction.channel?.isDMBased?.()) {
			await dmRelay.handleLog(client, interaction, attachment, interaction.user, {
				anyTextFile: true,
			});
			return;
		}

		// tspack / dmp / appcrash / dalamud.injector always relay, and always to the
		// server's designated private relay channel (modules/relayFile.js resolves
		// it). That flow replies to this interaction itself — return so we don't
		// reply twice.
		if (isSpecialRelayAttachment(attachment.name)) {
			await relayFile(client, interaction, attachment, interaction.user, interaction.channel, false);
			return;
		}

		// Generic log: hand off to the parse pipeline, then deliver the results
		// ourselves. Relaying the parsed embeds back here is this command's job —
		// parseLog only returns them.
		// anyTextFile is an explicit-upload opt-in: the message-trigger flow keeps
		// its strict filename gate so arbitrary text attachments aren't parsed.
		const embeds = await parseLog(client, attachment, {
			anyTextFile: true,
			guildId: interaction.guildId,
		});
		if (!embeds || embeds.length === 0) {
			// Valid log, nothing to analyse: drop the public "thinking" message and
			// answer ephemerally so the interaction is never left unresolved.
			await noParseableData(interaction, attachment.name);
			return;
		}

		await replyToSource(interaction, {
			embeds,
			allowedMentions: {
				repliedUser: false,
			},
		});
	}
	catch (e) {
		// Hide the public "thinking" message and surface the error ephemerally.
		await failAfterDefer(interaction, e);
	}
};
