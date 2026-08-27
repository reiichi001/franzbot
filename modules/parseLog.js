const parseLastException = require('../modules/parse/parsekind/LASTEXCEPTION.js');
const parseDalamudTroubleshooting = require('../modules/parse/parsekind/TROUBLESHOOTING.js');
const parseXlTroubleshooting = require('../modules/parse/parsekind/TROUBLESHXLTING.js');

const {
	replyToSource,
} = require('./processAttachment');

/**
 * Fetch the attachment content as text.
 */
async function fetchAttachmentData(attachment) {
	const response = await fetch(attachment.attachment);
	if (!response.ok) {
		throw new Error(`Failed to fetch attachment ${attachment.attachment}`);
	}
	return response.text();
}

/**
 * Decode a base64-encoded string to UTF‑8.
 */
async function decodeBase64(data) {
	const buffer = new Buffer.from(data, 'base64');
	return buffer.toString('utf8');
}

/**
 * Parse the given base64 payload using the appropriate parser.
 * Returns the embeds (no reply) so parseLog can combine every parse kind into
 * a single reply.
 * Each parser has its own signature — TROUBLESHOOTING also takes the source
 * (for the custom-repo nag's guild check), the others just filename + data.
 */
async function parseForType(type, client, source, filename, jsonData) {
	// Choose the correct parser based on type
	switch (type) {
		case 'TROUBLESHOOTING':
			return parseDalamudTroubleshooting.execute(client, source, filename, jsonData);
		case 'TROUBLESHXLTING':
			return parseXlTroubleshooting.execute(client, filename, jsonData);
		case 'LASTEXCEPTION':
			return parseLastException.execute(client, filename, jsonData);
		default:
			return [];
	}
}

/**
 * Main entry point for processing a log attachment.
 * `source` is either a Discord Message or an Interaction.
 * Returns the collected embeds (across all matched prefixes) so the DM relay
 * chooser can repost them on a button click. Message-driven callers ignore it.
 */
exports.parseLog = async (client, source, attachment, opts = {}) => {
	// Message-driven flows keep the strict filename guard so arbitrary text
	// files attached in a normal message aren't treated as troubleshooting logs.
	// Slash commands (/logxl, /logd) pass { anyTextFile: true } to accept ANY
	// plain .log/.txt and let the parsers inspect content instead.
	if (opts.anyTextFile) {
		if (!(/.*\.(log|txt)$/iu).test(attachment.name)) {
			return;
		}
	}
	else if (!attachment.name.match(/(dalamud|output|launcher|message).*\.(log|txt)$/gui)) {
		return;
	}

	try {
		const logData = await fetchAttachmentData(attachment);

		const prefixes = [
			'TROUBLESHOOTING:',
			'TROUBLESHXLTING:',
			'LASTEXCEPTION:',
		];

		// Collect every prefix's embeds; the relay chooser needs the full set.
		const all = [];
		for (const prefix of prefixes) {
			// Colon needs no escaping — the old `\:` was an invalid escape that
			// made new RegExp(...) THROW, so no log ever got parsed.
			const regex = new RegExp(`${prefix}(.*)`, 'gu');
			// .match returns null when the prefix isn't present — spreading null
			// throws and aborts the loop, so a log with only a LASTEXCEPTION block
			// would die on the TROUBLESHOOTING prefix and never be parsed.
			const matches = logData.match(regex);
			if (matches?.length) {
				// Take the last match, slice off the prefix length
				const fullMatch = matches[matches.length - 1];
				const base64Payload = fullMatch.slice(prefix.length);
				const type = prefix.slice(0, -1); // Remove trailing colon for type key
				// Resolve the payload here in parseLog, so parseForType only
				// handles data after the attachment has been read. This keeps the
				// attachment handling reusable from a messageCreate or an interaction.
				const decoded = await decodeBase64(base64Payload);
				const jsonData = JSON.parse(decoded);
				const embeds = await parseForType(type, client, source, attachment.name, jsonData);
				all.push(...embeds);
			}
		}

		// Reply ONCE with the full set. Replying per-prefix used editReply, which
		// REPLACES the previous reply — so a slash command only ever showed the
		// LAST parse kind (LASTEXCEPTION). One message with all embeds matches the
		// message path, which surfaces every valid parse.
		if (all.length > 0) {
			await replyToSource(source, {
				embeds: all,
				allowedMentions: {
					repliedUser: false,
				},
			});
		}
		return all;
	}
	catch (error) {
		if (error?.response?.body) {
			console.error(error.response.body);
		}
		else {
			console.error(error);
		}
	}
};
