// Relay button for the DM chooser. Clicking one of the dmrelay:<token>:<server>
// buttons posts the uploaded file + the parsed embed to that server's relay
// channel, then consumes the offer so the same token can't post twice.

const dmRelay = require('../modules/dmRelay');

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
	const record = dmRelay.resolve(token);
	const server = dmRelay.getRelayableServers(client)
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
	dmRelay.deletePending(token);
};
