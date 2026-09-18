// Shared runner for /logxl and /logd. Accepts any .log/.txt plain text file
// (plus the special tspack/dmp types), then lets the parsers inspect the
// CONTENT to decide what, if anything, is parseable. Valid parse results are
// PUBLIC; errors are ephemeral.

const {
	ChannelType,
} = require('discord.js');
const {
	rejectionMessage, isSpecialRelayAttachment,
} = require('./processAttachment');
const {
	relayFile,
} = require('./relayFile');
const {
	parseLog,
} = require('./parseLog');
const dmRelay = require('./dmRelay');

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
	if (!(/.*\.(log|txt|tspack|dmp)$/iu).test(attachment.name)) {
		await interaction.reply({
			content: rejectionMessage(attachment.name),
			ephemeral: true,
		});
		return;
	}

	// Valid file: defer PUBLICLY so parse results are visible to everyone.
	await interaction.deferReply();

	try {
		const isDM = interaction.channel.type === ChannelType.DM
			|| interaction.channel.type === ChannelType.GroupDM;
		if (isDM) {
			// DMs: parse as normal, then offer a relay chooser instead of auto-relaying.
			// handleLog routes special files (tspack/dmp/crash/injector) to the
			// dedicated flow and sends generic parseable files through the chooser.
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

		// Generic log: hand off to the parse pipeline. parseLog edits the reply when
		// it finds parseable content; otherwise WE resolve the deferred reply so the
		// interaction never gets stuck on "thinking" with no answer.
		// anyTextFile is a slash-command-only opt-in: the message-trigger flow keeps
		// its strict filename gate so arbitrary text attachments aren't parsed.
		const embeds = await parseLog(client, interaction, attachment, {
			anyTextFile: true,
		});
		if (!embeds || embeds.length === 0) {
			// Error: drop the public "thinking" message and reply ephemerally.
			await interaction.deleteReply();
			await interaction.followUp({
				content: `No troubleshooting data in \`${attachment.name}\`. `
					+ `Franzbot looks for troubleshooting blobs (TROUBLESHOOTING/TROUBLESHXLTING/LASTEXCEPTION) `
					+ `in your logs. None were found.`,
				ephemeral: true,
			});
		}
	}
	catch (e) {
		console.error(e);
		// Hide the public "thinking" message and surface the error ephemerally.
		await interaction.deleteReply().catch(err => console.error('Failed to delete reply:', err));
		await interaction.followUp({
			content: `There was a problem with your request.\n\`\`\`${e.message}\`\`\``,
			ephemeral: true,
		});
	}
};
