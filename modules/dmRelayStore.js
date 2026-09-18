// The DM relay offer store, and the list of servers that can receive a relay.
//
// Split out of dmRelay.js so the split is acyclic: buttons/dmRelay.js needs
// resolve/deletePending/getRelayableServers, and modules/dmRelay.js needs the
// button rows the button folder builds. Keeping the shared state in a file that
// depends on neither lets both require it without a require cycle.
//
// No discord.js here — it reads client state and returns plain objects.

const {
	readdirSync,
} = require('fs');
const DiscordSnowflake = require('discord-snowflake');

// token -> { attachment, author, embeds, createdAt } awaiting a relay choice.
// In-memory only; DM CDN attachment URLs live >= 24h, so a 15-min TTL sweep
// keeps this bounded well inside the safe window.
const pending = new Map();

// ~15 min TTL for a pending relay offer before it is dropped.
const OFFER_TTL_MS = 15 * 60 * 1000;

/**
 * Servers whose per-server config has a valid relayChannel snowflake, as
 * { key, label } pairs. `disabled` and `directmessage` are never offered.
 */
function getRelayableServers(client) {
	return readdirSync("./config", {
		withFileTypes: true,
	})
		.filter(f => f.isDirectory())
		.map(d => d.name)
		.filter(name => {
			if (name === "disabled" || name === "directmessage") {
				return false;
			}
			const relayChannelId = client.perserversettings
				?.get(`${name}-serversettings`)
				?.get('relayChannel');
			return relayChannelId && DiscordSnowflake.isSnowflake(relayChannelId);
		})
		.map(name => ({
			key: name,
			label: client.perserversettings
				?.get(`${name}-serversettings`)
				?.get('guildname') || name,
		}));
}

/**
 * Store an offer awaiting a relay choice.
 */
function createPending(token, record) {
	pending.set(token, record);
}

/**
 * Peek the pending record for a token (does not consume it).
 */
function resolve(token) {
	return pending.get(token);
}

/**
 * Consume a pending record once a relay lands (or on TTL expiry).
 */
function deletePending(token) {
	pending.delete(token);
}

// Periodic sweep drops stale offers so the Map never grows unbounded. This is
// the only module-level timer in the repo; it is deliberately unref'd so it
// cannot hold the process open on its own.
setInterval(() => {
	const cutoff = Date.now() - OFFER_TTL_MS;
	for (const [
		token,
		record,
	] of pending) {
		if (record.createdAt < cutoff) {
			pending.delete(token);
		}
	}
}, OFFER_TTL_MS).unref();

module.exports = {
	OFFER_TTL_MS,
	getRelayableServers,
	createPending,
	resolve,
	deletePending,
};
