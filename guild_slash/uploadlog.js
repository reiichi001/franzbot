// /uploadlog — upload a log and, if it carries troubleshooting data, have it
// parsed publicly in the channel it was run in.
//
// This command owns its whole Discord conversation: the option read, the
// ephemeral rejections, the defer, and every reply. Nothing about it lives in
// modules/ — see modules/respond.js for the pieces shared with the other
// handlers.

const {
	SlashCommandBuilder,
} = require('discord.js');

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
 * Build the slash command data — a required file attachment opens the
 * OS file picker on the client.
 */
exports.commandData = () => new SlashCommandBuilder()
	.setName('uploadlog')
	.setDescription('Upload and parse a Dalamud or XIVLauncher log file.')
	.addAttachmentOption(o => o.setName('file').setDescription('The log file to parse')
		.setRequired(true))
	.toJSON();

exports.run = async (client, interaction) => {
	// Validate BEFORE deferring so these errors can be ephemeral replies without
	// leaving a public "thinking" message behind.
	const attachment = interaction.options.getAttachment('file');
	if (!attachment) {
		await interaction.reply({
			content: 'No file was attached.',
			ephemeral: true,
		});
		return;
	}

	// Accept ANY plain-text .log/.txt, plus the special binary types. The parsers
	// inspect CONTENT to decide what (if anything) is parseable, so a filename
	// prefix allowlist would wrongly reject e.g. "client.log" or "log.txt".
	// Same accepted set and size ceiling as the FAQ upload modal.
	const rejection = checkUpload(attachment.name, attachment.size);
	if (rejection) {
		await interaction.reply({
			content: rejection,
			ephemeral: true,
		});
		return;
	}

	// Valid file: defer PUBLICLY so parse results are visible to everyone.
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

		// Special files (tspack/dmp/injector/appcrash) keep their dedicated relay
		// flow that replies to this interaction itself — return so we don't reply twice.
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
