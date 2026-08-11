// Shared runner for /logxl and /logd. Validates the attachment, then defers
// to the same relay + parse pipeline used by message attachments.

const {
	ChannelType,
} = require('discord.js');
const {
	isSupportedAttachment, rejectionMessage,
} = require('./processAttachment');
const {
	relayFile,
} = require('./relayFile');
const {
	parseLog,
} = require('./parseLog');
const dmRelay = require('./dmRelay');

exports.run = async (client, interaction) => {
	await interaction.deferReply({
		ephemeral: true,
	});

	const attachment = interaction.options.getAttachment('file');
	if (!attachment) {
		await interaction.editReply({
			content: 'No file was attached.',
		});
		return;
	}
	if (!isSupportedAttachment(attachment.name)) {
		await interaction.editReply({
			content: rejectionMessage(attachment.name),
		});
		return;
	}

	const isDM = interaction.channel.type === ChannelType.DM
		|| interaction.channel.type === ChannelType.GroupDM;
	if (isDM) {
		// DMs: parse as normal, then offer a relay chooser instead of auto-relaying.
		// handleLog routes special files (tspack/dmp/crash/injector) to the
		// dedicated flow and sends generic parseable logs through the chooser.
		await dmRelay.handleLog(client, interaction, attachment, interaction.user);
		return;
	}

	// Guild: defer to the shared relay + parse pipeline. Both speak interaction or message.
	await relayFile(client, interaction, attachment, interaction.user, interaction.channel, false);
	await parseLog(client, interaction, attachment);
};
