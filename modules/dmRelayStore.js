// The DM relay offer store, the list of servers that can receive a relay, and
// the delivery of a pending record to a chosen server.
//
// Split out of dmRelay.js so the split is acyclic: buttons/dmRelay.js needs
// resolve/deletePending/getRelayableServers (and, now, the delivery primitives
// its modal calls), and modules/dmRelay.js needs the button row the button
// folder builds. Keeping the shared state in a file that depends on neither
// lets all three (modules/dmRelay.js, buttons/dmRelay.js, modals/*) require it
// without a require cycle.
//
// No discord.js payloads are built here — everything reaches Discord through
// `client`, and the delivery functions return plain result objects the callers
// render. The one import is the PermissionFlagsBits enum, for the access check.

const {
	readdirSync,
} = require('fs');
const {
	PermissionFlagsBits,
} = require('discord.js');
const {
	mentionTag,
} = require('./respond');
const {
	maxUploadBytesForTier,
} = require('./processAttachment');
const DiscordSnowflake = require('discord-snowflake');

// token -> { attachment, author, embeds, createdAt, loggyUrl, offerMessageId }
// awaiting a relay choice. `loggyUrl` is set for tspacks, whose S3/Loggy step
// already ran when the offer was made — relaying must NOT re-upload. `offerMessageId`
// is the DM-channel message carrying the relay button (message sources only), so
// the server-selector modal can disable it once a relay lands.
// In-memory only; DM CDN attachment URLs live >= 24h, so a 15-min TTL sweep
// keeps this bounded well inside the safe window.
const pending = new Map();

// ~15 min TTL for a pending relay offer before it is dropped.
const OFFER_TTL_MS = 15 * 60 * 1000;

/**
 * Servers Franzbot can actually relay for, as { key, label } pairs.
 * `disabled` and `directmessage` are never offered.
 *
 * A config folder (or a snowflake left in one) can outlive reality — the bot
 * may have left that guild, or the configured relay channel may have been
 * deleted or hidden from it. So besides the configured relayChannel snowflake
 * this checks, from the live caches: the bot is still in the guild, the relay
 * channel still exists there, and the bot can see, post, and attach in it.
 * Everything is a cache read, so callers may await this freely even right
 * before showModal.
 */
async function getRelayableServers(client) {
	const results = [];
	for (const f of readdirSync("./config", {
		withFileTypes: true,
	})) {
		if (!f.isDirectory()) {
			continue;
		}
		const name = f.name;
		if (name === "disabled" || name === "directmessage") {
			continue;
		}
		const relayChannelId = client.perserversettings
			?.get(`${name}-serversettings`)
			?.get('relayChannel');
		if (!relayChannelId || !DiscordSnowflake.isSnowflake(relayChannelId)) {
			continue;
		}
		const guild = client.guilds?.cache?.get(name);
		if (!guild) {
			continue;
		}
		const relayChannel = guild.channels?.cache?.get(relayChannelId);
		if (!relayChannel) {
			continue;
		}
		// The bot member carries its permissions; a guild the READY payload has
		// not fully populated yet would lack it and is skipped until it does.
		const botMember = guild.members?.me;
		if (!botMember || !relayChannel.permissionsFor(botMember)?.has([
			PermissionFlagsBits.ViewChannel,
			PermissionFlagsBits.SendMessages,
			PermissionFlagsBits.AttachFiles,
		])) {
			continue;
		}
		results.push({
			key: name,
			label: client.perserversettings
				?.get(`${name}-serversettings`)
				?.get('guildname') || guild.name || name,
			// The guild's boost tier, for size-ceiling decisions: how large a
			// file this server's relay channel can legally accept.
			tier: guild.premiumTier,
		});
	}
	return results;
}

// Discord caps button labels at 80 characters; long log names get an ellipsis
// so the row always serialises.
const BUTTON_LABEL_MAX = 80;

/**
 * Assemble a button label around a file name, trimming the name (with an
 * ellipsis) to fit inside Discord's cap. Shared by the offer button and the
 * disabled "Relayed" one, so both name the same file the same way. Lives here
 * because both buttons/dmRelay.js and modals/dmRelay.js need it and those two
 * already require each other's modal builder — a third import would close a
 * cycle.
 */
function buttonLabel(prefix, name, suffix = '') {
	const budget = BUTTON_LABEL_MAX - prefix.length - suffix.length - 1; // 1 = ellipsis
	const short = name.length > budget ? `${name.slice(0, budget)}…` : name;
	return `${prefix}${short}${suffix}`;
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

/**
 * The shared failure copy for a relay that did not happen, so the
 * server-selector modal and every other caller say exactly the same thing.
 * A click that does nothing at all reads as a broken button, so each failure
 * mode is told apart:
 *   expired    - the offer TTL passed, or the customId is not one this bot sent
 *   no-server  - the chosen server is no longer in the relayable set
 *   no-channel - the chosen server's relayChannel is unset or unreachable
 *   too-large  - the file exceeds the chosen server's own upload limit
 */
function relayFailureNotice(reason, serverLabel) {
	switch (reason) {
		case 'no-server':
			return 'That server is no longer set up to receive relayed logs, so nothing was relayed. '
				+ 'Please let a server admin know to contact Franz.';
		case 'no-channel':
			return `${serverLabel} has no relay channel set up, so nothing was relayed. `
				+ 'Please let a server admin know to contact Franz.';
		case 'too-large':
			return 'That server can\'t accept files as large as this one, so nothing was relayed. '
				+ 'Please try to reproduce your issue with a fresh launch, for a smaller file.';
		default:
			return 'That relay offer has expired, so nothing was relayed. '
				+ 'Send the log again and Franzbot will offer the server list in a fresh message.';
	}
}

/**
 * Send a pending-style payload (file + parsed embeds + optional Loggy embed) to
 * `serverKey`'s configured relay channel. Does the same live revalidation the
 * old chooser buttons did: the server list is filtered on servers the bot can
 * actually reach and post in, so a miss means that server has since become
 * unreachable, and channels can become unavailable between the offer being
 * built and the click — fail closed rather than erroring, but say so.
 *
 * Nothing here answers any interaction; callers render the result themselves.
 */
async function sendRelayPayload(client, serverKey, payload) {
	const server = (await getRelayableServers(client))
		.find(s => s.key === serverKey);
	if (!server) {
		return {
			ok: false,
			reason: 'no-server',
		};
	}

	const relayChannelId = client.perserversettings
		?.get(`${serverKey}-serversettings`)
		?.get('relayChannel');
	const relayChannel = relayChannelId
		? await client.channels.fetch(relayChannelId)
			.catch(() => null)
		: null;
	if (!relayChannel) {
		return {
			ok: false,
			reason: 'no-channel',
			serverLabel: server.label,
		};
	}

	// The chosen server's own upload limit is the hard bound on the relay: the
	// bot re-uploads the file INTO its boost tier, so a file bigger than the
	// tier allows cannot land here no matter what intake allowed. Relayed DM
	// files are exactly what the uploader once delivered, but a Nitro account
	// can deliver far more than a lower-tier server accepts.
	const maxBytes = maxUploadBytesForTier(relayChannel.guild?.premiumTier);
	if ((payload.attachment?.size ?? 0) > maxBytes) {
		return {
			ok: false,
			reason: 'too-large',
			serverLabel: server.label,
		};
	}

	const embeds = [...payload.embeds ?? []];
	if (payload.loggyUrl) {
		// Tspacks are not parseable, but their S3 copy is: this is the same
		// "Read provided logs on Loggy" embed the dedicated flow always added.
		embeds.push({
			description: `Read provided logs on [Loggy](${payload.loggyUrl})`,
		});
	}

	await relayChannel.send({
		content: `${mentionTag(payload.author)} relayed a log from DMs`,
		embeds,
		files: [payload.attachment],
		// The `<@id>` in the content must render, but must not notify — an
		// empty parse list is the no-mention switch. `repliedUser` is moot
		// (this is not a reply) but explicit.
		allowedMentions: {
			parse: [],
			repliedUser: false,
		},
	});
	return {
		ok: true,
		server,
	};
}

/**
 * Deliver the pending record `token` stands for to `serverKey`. The record is
 * only consumed on success, so a failed attempt can be retried; a stale token
 * resolves as the expired failure instead. On success the record rides along
 * in the result (it has just been deleted) so callers can tidy up things that
 * referenced it, like the offer message's button.
 */
async function relayPendingToServer(client, token, serverKey) {
	const record = resolve(token);
	if (!record) {
		return {
			ok: false,
			reason: 'expired',
		};
	}
	const result = await sendRelayPayload(client, serverKey, record);
	if (result.ok) {
		deletePending(token);
		return {
			...result,
			record,
		};
	}
	return result;
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
	buttonLabel,
	createPending,
	resolve,
	deletePending,
	relayFailureNotice,
	sendRelayPayload,
	relayPendingToServer,
};
