// Relay button for the DM chooser. Clicking one of the dmrelay:<token>:<server>
// buttons posts the uploaded file + the parsed embed to that server's relay
// channel, then consumes the offer so the same token can't post twice.
//
// This folder owns the customId format on both sides: buildRelayRows() writes
// it, run() parses it. Same reasoning that put buildUploadLogActionRow in
// buttons/uploadLog.js.

const {
	ActionRowBuilder, ButtonBuilder, ButtonStyle,
} = require('discord.js');
const dmRelayStore = require('../modules/dmRelayStore');

/**
 * Build the ActionRow builders for the server chooser, chunked 5 buttons/row
 * (Discord allows at most 5 buttons per row). Each button carries
 * `dmrelay:<token>:<serverKey>`.
 */
function buildRelayRows(servers, token) {
	const rows = [];
	for (let i = 0; i < servers.length; i += 5) {
		const row = new ActionRowBuilder();
		for (const server of servers.slice(i, i + 5)) {
			row.addComponents(
				new ButtonBuilder()
					.setCustomId(`dmrelay:${token}:${server.key}`)
					.setLabel(server.label)
					.setStyle(ButtonStyle.Secondary)
			);
		}
		rows.push(row);
	}
	return rows;
}

exports.buttonData = () => ({
	name: 'dmRelay',
	description: 'Relay a DM-parsed log to a chosen server.',
	options: [],
	defaultPermission: true,
});

/**
 * serverKey is validated against the live relayable set so a stale or tampered
 * token silently acks (deferUpdate) without posting anywhere.
 */
exports.run = async (client, interaction) => {
	await interaction.deferUpdate();

	const [
		, token,
		serverKey,
	] = interaction.customId.split(':');
	const record = dmRelayStore.resolve(token);
	const server = dmRelayStore.getRelayableServers(client)
		.find(s => s.key === serverKey);
	if (!record || !server) {
		return;
	}

	const relayChannelId = client.perserversettings
		?.get(`${serverKey}-serversettings`)
		?.get('relayChannel');
	// Channels may become unavailable; fail closed rather than erroring a click.
	if (!relayChannelId) {
		return;
	}

	const relayChannel = await client.channels.fetch(relayChannelId);
	await relayChannel.send({
		content: `${record.author?.username ?? 'Unknown'} (${record.author?.id ?? '?'}) relayed a log from DMs`,
		embeds: record.embeds,
		files: [record.attachment],
		allowedMentions: {
			repliedUser: false,
		},
	});
	dmRelayStore.deletePending(token);
};

exports.buildRelayRows = buildRelayRows;
