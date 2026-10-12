// DM upload flow: when a file arrives in Franzbot's DMs (message trigger or
// /uploadlog with a file), it is handled in place and then a SINGLE button
// offers to relay it to a support server. The button opens the server-selector
// modal (modals/dmRelay.js); nothing relays without that choice. The handling
// depends on the file: a tspack gets its Loggy link; relay-only types (crash
// logs, injector logs, Windows event logs) skip the parse pass entirely since
// they can never yield results; everything else is parsed for its
// troubleshooting blocks. .dmp files are refused outright (they can contain
// private data).
//
// Why this is still a module: it is invoked by more than one kind of handler —
// the DM message trigger and /uploadlog — not by a single one. The offer's
// button, the pending-offer state, and the relay delivery live elsewhere
// (buttons/dmRelay.js and modules/dmRelayStore.js) so neither has to depend on
// the other.

const crypto = require('crypto');
const {
	parseLog,
} = require('./parseLog');
const {
	replyToSource, postParsedEmbeds, noParseableData,
} = require('./respond');
const {
	dmpRefusal, isRelayOnlyAttachment,
} = require('./processAttachment');
const {
	uploadTspackToS3,
} = require('./tspackLoggy');
const dmRelayStore = require('./dmRelayStore');
const {
	buildRelayButtonRow,
} = require('../buttons/dmRelay');

// /g on a regex used with .test() is stateful — no /g.
const DMP_REGEX = /\.(dmp)$/i;
const TSPACK_REGEX = /\.(tspack)$/i;

/**
 * Parse `source` (message or interaction) as normal, then offer the relay
 * button. interaction -> followUp (after the deferred parsed reply); message ->
 * channel.send, whose message id is kept in the pending record so the selector
 * modal can disable the button once a relay lands. Returns the token, or
 * undefined if no server is relayable (the parse is still delivered).
 */
async function offerRelay(client, source, attachment, author, embeds, loggyUrl = null) {
	const servers = await dmRelayStore.getRelayableServers(client);
	if (!servers.length) {
		return undefined;
	}

	const token = crypto.randomBytes(8).toString('hex');
	const record = {
		attachment,
		author,
		embeds,
		loggyUrl,
		offerMessageId: null,
		createdAt: Date.now(),
	};
	dmRelayStore.createPending(token, record);

	const components = buildRelayButtonRow(token, attachment.name);

	if (typeof source.followUp === 'function') {
		source.followUp({
			components,
			ephemeral: true,
		});
	}
	else {
		const offer = await source.channel.send({
			components,
		});
		record.offerMessageId = offer.id;
	}
	return token;
}

/**
 * Single entry point for BOTH the DM message-create trigger and /uploadlog's DM
 * branch (when a file came attached). Every file is handled in place first —
 * parsed if parseable, Loggy-linked if a tspack, relay-only types passed over —
 * and then offered the single relay button. Nothing auto-relays from DMs
 * anymore; the .dmp refusal is the only flow that never sees the button.
 *
 * Delivery of the parsed embeds is this module's job because both callers are
 * message-or-interaction sources that post in place; parseLog only returns them.
 */
async function handleLog(client, source, attachment, author, opts = {}) {
	// DMP files can contain private data, so they are never parsed or relayed —
	// same refusal the dedicated flow always gave, just without any relay offer.
	if (DMP_REGEX.test(attachment.name)) {
		await replyToSource(source, {
			content: dmpRefusal(),
		});
		return undefined;
	}

	// tspacks are a zip, so parsing has nothing to chew on — "handling" one is
	// producing its Loggy link: the S3 copy runs now, the user gets the link,
	// and the relay button offers to send the pack (plus that link) onward.
	if (TSPACK_REGEX.test(attachment.name)) {
		let loggyUrl;
		try {
			({
				loggyUrl,
			} = await uploadTspackToS3(client, attachment, author, source.guild?.id ?? 'directmessage'));
		}
		catch (e) {
			// Without the S3 copy there is no Loggy link and nothing to relay to
			// staff, so say so rather than leaving silence.
			console.error(e);
			await replyToSource(source, {
				content: `Franzbot could not process \`${attachment.name}\` right now — please try again in a moment.`,
			});
			return undefined;
		}

		await replyToSource(source, {
			embeds: [
				{
					description: `Read provided logs on [Loggy](${loggyUrl})`,
				},
			],
			allowedMentions: {
				repliedUser: false,
			},
		});
		return offerRelay(client, source, attachment, author, null, loggyUrl);
	}

	// Relay-only types (crash logs, injector logs, Windows event logs) can never
	// produce parse results, so the fetch-and-parse pass is skipped entirely and
	// the relay offer IS the handling. Message sources stay silent up to the
	// button, as they always have; an interaction's deferred reply is answered
	// with a short note so it doesn't sit on "thinking...".
	if (isRelayOnlyAttachment(attachment.name)) {
		if (typeof source.editReply === 'function') {
			await source.editReply({
				content: `\`${attachment.name}\` isn't a parseable log type, so there is nothing to analyze here — `
					+ 'but it can be relayed to a support server for manual review.',
			});
		}
		return offerRelay(client, source, attachment, author, null);
	}

	// Everything else is a text log that may or may not hold a troubleshooting
	// block. opts carries anyTextFile for the explicit /uploadlog path; the
	// message trigger keeps its strict filename gate by passing nothing.
	const embeds = await parseLog(client, attachment, {
		...opts,
		guildId: source.guildId,
	});

	if (embeds && embeds.length > 0) {
		// replyToSource covers both: an already-deferred interaction gets editReply,
		// a Message gets reply.
		await postParsedEmbeds(source, embeds);
	}
	else {
		// Interactions (/uploadlog run from DMs) are deferred and must be resolved
		// even when nothing is parseable; message sources silently drop instead,
		// as they always have.
		if (typeof source.editReply === 'function') {
			await noParseableData(source, attachment.name);
		}

		// No parsed results and not a relay-only type (those left above): nothing
		// to relay, matching today's behaviour.
		return undefined;
	}

	return offerRelay(client, source, attachment, author, embeds ?? null);
}

module.exports = {
	offerRelay,
	handleLog,
};
