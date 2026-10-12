// Resolve the relay channel for a guild, with the legacy config fallbacks.
//
// Kept separate from relayFile.js for two reasons: it is pure config
// resolution rather than transport, and it is the one place the deprecated
// CHANNELID_RELAY_* / GUILDID_* keys are read.
//
// NOTE: the FAQ upload modal's "relay privately" mode deliberately does NOT use
// this — see modals/uploadLog.js. A modal relay is offered as "this server's
// relay channel", so a server with no configured channel must be refused rather
// than quietly redirected to a legacy hardcoded one. Anything that resolves a
// destination for a user-visible promise should use the configured channel
// directly; only the message-driven relay path may fall back.

const {
	ChannelType,
} = require('discord.js');
const logger = require('./Logger.js');

/**
 * The per-server configured relay channel id, or null when unset.
 * This is the non-legacy half — the value the private relay mode relies on.
 */
function configuredRelayChannelId(client, guildId) {
	return client.perserversettings
		?.get(`${guildId}-serversettings`)
		?.get("relayChannel") || null;
}

/**
 * Resolve where a relay should go for the given source channel.
 *
 * Order: the per-server configured relayChannel, then the legacy hardcoded
 * channel for known guilds (and the test channel when DEBUGMODE is on). In DMs
 * the Goat relay channel is used directly, since there is no guild to look up.
 *
 * Backfills the resolved id into the per-server settings so the next relay
 * takes the configured path.
 *
 * @returns {Promise<import('discord.js').Channel|null>} The channel, or null
 *   when nothing is configured.
 */
async function resolveRelayChannel(client, sourceChannel) {
	const isDirectMessage = sourceChannel?.type === ChannelType.DM
		|| sourceChannel?.type === ChannelType.GroupDM;
	const guildId = sourceChannel?.guild?.id;

	const relayChannelId = isDirectMessage
		? client.configdb.get("CHANNELID_RELAY_GOAT") // hardcode for now
		: configuredRelayChannelId(client, guildId);

	if (relayChannelId) {
		return client.channels.fetch(relayChannelId).catch(() => null);
	}

	logger.warn(`Could not find a relay channel defined for ${guildId}. Setting from legacy fallback, else empty string.`);

	let legacyChannelId;
	if (guildId === client.configdb.get("GUILDID_GOAT")) {
		legacyChannelId = client.configdb.get("CHANNELID_RELAY_GOAT");
	}
	else if (guildId === client.configdb.get("GUILDID_HELIOSPHERE")) {
		legacyChannelId = client.configdb.get("CHANNELID_RELAY_HELIOSPHERE");
	}
	else if (guildId === client.configdb.get("GUILDID_XIVONMAC")) {
		legacyChannelId = client.configdb.get("CHANNELID_RELAY_XIVONMAC");
	}
	else if (guildId === client.configdb.get("GUILDID_TESTING") || client.configdb.get("DEBUGMODE")) {
		legacyChannelId = client.configdb.get("CHANNELID_RELAY_TEST");
	}

	if (!legacyChannelId) {
		return null;
	}

	const relayChannel = await client.channels.fetch(legacyChannelId).catch(() => null);
	// Record what we settled on so the legacy lookup only happens once.
	client.perserversettings
		?.get(`${guildId}-serversettings`)
		?.set("relayChannel", relayChannel?.id ?? "");
	return relayChannel;
}

module.exports = {
	configuredRelayChannelId,
	resolveRelayChannel,
};
