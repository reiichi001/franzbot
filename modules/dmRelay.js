// DM relay chooser: when a log is parsed from a DM, ask the user (via buttons)
// which configured server should get the file + parsed embed. Nothing relays
// until a button is clicked, EXCEPT file types that keep their dedicated flow
// (tspack / dmp / crash / injector, see isSpecialRelayAttachment).

const {
	readdirSync,
} = require('fs');
const {
	ActionRowBuilder, ButtonBuilder, ButtonStyle,
} = require('discord.js');
const DiscordSnowflake = require('discord-snowflake');
const crypto = require('crypto');
const {
	isSpecialRelayAttachment,
} = require('./processAttachment');
const {
	parseLog,
} = require('./parseLog');
const {
	relayFile,
} = require('./relayFile');

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
 * Build the ActionRow builders for the server chooser, chunked 5 buttons/row
 * (Discord allows at most 5 buttons per row). Each button carries
 * `dmrelay:<token>:<serverKey>` and dispatches to the single dmRelay button.
 */
function buildRows(servers, token) {
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

/**
 * Parse `source` (message or interaction) as normal, then offer a relay chooser.
 * interaction -> followUp (after the deferred parsed reply); message ->
 * channel.send. Returns the token, or undefined if no server is relayable.
 */
function offerRelay(client, source, attachment, author, embeds) {
	const servers = getRelayableServers(client);
	if (!servers.length) {
		return undefined;
	}

	const token = crypto.randomBytes(8).toString('hex');
	pending.set(token, {
		attachment,
		author,
		embeds,
		createdAt: Date.now(),
	});

	const content = 'A support server? Relay this parsed log to one of these?';
	const components = buildRows(servers, token);

	if (typeof source.followUp === 'function') {
		source.followUp({
			content,
			components,
			ephemeral: true,
		});
	}
	else {
		source.channel.send({
			content,
			components,
		});
	}
	return token;
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

// Periodic sweep drops stale offers so the Map never grows unbounded.
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
}, OFFER_TTL_MS);

/**
 * Single entry point for BOTH the DM message-create trigger and the /logxl,
 * /logd slash runner. Special file types (tspack/dmp/crash/injector) keep their
 * dedicated auto-relay; generic parseable logs are parsed first, then offered a
 * relay chooser. Returns the offer token, or undefined.
 */
async function handleLog(client, source, attachment, author) {
	if (isSpecialRelayAttachment(attachment.name)) {
		// Keep dedicated flow: S3 upload (tspack), no-relay warning (dmp),
		// crash/injector -> Goat. No chooser.
		return relayFile(client, source, attachment, author, source.channel, false);
	}

	// Parse as normal; parseLog posts the parsed embed back to the source.
	const embeds = await parseLog(client, source, attachment);
	if (!embeds || embeds.length === 0) {
		return undefined; // Not troubleshoot-bearing: just the parse reply, no chooser.
	}
	return offerRelay(client, source, attachment, author, embeds);
}

module.exports = {
	getRelayableServers,
	offerRelay,
	resolve,
	deletePending,
	handleLog,
};
