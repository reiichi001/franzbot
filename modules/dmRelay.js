// DM relay chooser: when a log is parsed from a DM, ask the user (via buttons)
// which configured server should get the file + parsed embed. Nothing relays
// until a button is clicked, EXCEPT file types that keep their dedicated flow
// (tspack / dmp / crash / injector, see isSpecialRelayAttachment).
//
// Why this is still a module: it is invoked by more than one kind of handler —
// the DM message trigger and /uploadlog — not by a single one. The offer's
// button rows and the pending-offer state live elsewhere (buttons/dmRelay.js
// and modules/dmRelayStore.js) so neither has to depend on the other.

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
const dmRelayStore = require('./dmRelayStore');
const {
	buildRelayRows,
} = require('../buttons/dmRelay');
const {
	postParsedEmbeds, noParseableData,
} = require('./respond');

/**
 * Parse `source` (message or interaction) as normal, then offer a relay chooser.
 * interaction -> followUp (after the deferred parsed reply); message ->
 * channel.send. Returns the token, or undefined if no server is relayable.
 */
function offerRelay(client, source, attachment, author, embeds) {
	const servers = dmRelayStore.getRelayableServers(client);
	if (!servers.length) {
		return undefined;
	}

	const token = crypto.randomBytes(8).toString('hex');
	dmRelayStore.createPending(token, {
		attachment,
		author,
		embeds,
		createdAt: Date.now(),
	});

	const content = 'A support server? Relay this parsed log to one of these?';
	const components = buildRelayRows(servers, token);

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
 * Single entry point for BOTH the DM message-create trigger and /uploadlog's DM
 * branch. Special file types (tspack/dmp/crash/injector) keep their dedicated
 * auto-relay; generic parseable logs are parsed first, then offered a relay
 * chooser. Returns the offer token, or undefined.
 *
 * Delivery of the parsed embeds is this module's job because both callers are
 * message-or-interaction sources that post in place; parseLog only returns them.
 */
async function handleLog(client, source, attachment, author, opts = {}) {
	if (isSpecialRelayAttachment(attachment.name)) {
		// Keep dedicated flow: S3 upload (tspack), no-relay warning (dmp),
		// crash/injector -> Goat. No chooser.
		return relayFile(client, source, attachment, author, source.channel, false);
	}

	const embeds = await parseLog(client, attachment, {
		...opts,
		guildId: source.guildId,
	});
	if (!embeds || embeds.length === 0) {
		// Interactions (/uploadlog run from DMs) are deferred and must be resolved
		// even when nothing is parseable; message sources silently drop instead.
		if (typeof source.editReply === 'function') {
			await noParseableData(source, attachment.name);
		}
		return undefined; // Not troubleshoot-bearing: nothing to relay.
	}

	// replyToSource covers both: an already-deferred interaction gets editReply,
	// a Message gets reply.
	await postParsedEmbeds(source, embeds);

	return offerRelay(client, source, attachment, author, embeds);
}

module.exports = {
	offerRelay,
	handleLog,
};
