// /uploadlog, DM edition — the global twin of guild_slash/uploadlog.js.
//
// Registered application-wide but scoped to DM/private-channel contexts
// (setContexts, as global_slash/faq.js does): in the whitelisted guilds the
// guild-scoped /uploadlog shadows this one, and elsewhere the BotDM context
// keeps it invisible — so this command is only ever seen in the bot's DMs.
//
// Two ways in, mirroring the guild command:
//   * With a file, it is an explicit upload handled by the DM flow
//     (modules/dmRelay.js): parsed if parseable, Loggy-linked if a tspack,
//     refused if a .dmp — then offered the single relay button.
//   * With no file, it opens the DM upload dialog (modals/uploadLogDm.js),
//     where the file, the handling mode and the relay destination are chosen.
//
// This command owns its whole Discord conversation: the option read, the
// ephemeral rejections, the defer, and every reply. Unlike the guild command
// the defer is ephemeral — DM receipts are private by nature.

const {
	SlashCommandBuilder, InteractionContextType,
} = require('discord.js');
const {
	buildUploadLogDmModal,
} = require('../modals/uploadLogDm');
const {
	checkUpload, MAX_RELAY_UPLOAD_BYTES,
} = require('../modules/processAttachment');
const {
	failAfterDefer,
} = require('../modules/respond');
const dmRelay = require('../modules/dmRelay');

/**
 * Build the slash command data. The file option is optional on purpose: with a
 * file the command is a one-shot upload handled by the DM flow, without one it
 * opens the upload dialog. When attached it opens the OS file picker on the
 * client.
 */
exports.commandData = () => new SlashCommandBuilder()
	.setName('uploadlog')
	.setDescription('Upload and parse a Dalamud or XIVLauncher log file.')
	.addAttachmentOption(o => o.setName('file')
		.setDescription('The log file to parse. Omit to open the upload dialog.')
		.setRequired(false))
	.setContexts(InteractionContextType.BotDM, InteractionContextType.PrivateChannel)
	.toJSON();

exports.run = async (client, interaction) => {
	const attachment = interaction.options.getAttachment('file');

	// No file: there is nothing to validate, so hand the user to the upload
	// dialog. showModal must be the interaction's first and only response and
	// cannot follow a defer, so this is the first thing that may happen here.
	// The modal build is only cache reads, so the await stays inside the
	// interaction's 3-second window.
	if (!attachment) {
		await interaction.showModal(await buildUploadLogDmModal(client));
		return;
	}

	// Validate BEFORE deferring so these errors can be ephemeral replies without
	// leaving anything behind. Same accepted set as the DM upload modal and the
	// guild command. The size ceiling is Discord's largest server limit rather
	// than the advertised default: the relay destination is only chosen after
	// this intake (parse offer → relay button), so anything that could reach
	// SOME boosted server passes here — sendRelayPayload then enforces the
	// chosen server's actual limit with a clean "too large" notice.
	const rejection = checkUpload(attachment.name, attachment.size, MAX_RELAY_UPLOAD_BYTES);
	if (rejection) {
		await interaction.reply({
			content: rejection,
			ephemeral: true,
		});
		return;
	}

	// The DM flow answers through this ephemeral deferred reply (editReply) and
	// its relay offer is an ephemeral follow-up.
	await interaction.deferReply({
		ephemeral: true,
	});

	try {
		await dmRelay.handleLog(client, interaction, attachment, interaction.user, {
			anyTextFile: true,
		});
	}
	catch (e) {
		// Drop the "thinking" reply and surface the error ephemerally.
		await failAfterDefer(interaction, e);
	}
};
