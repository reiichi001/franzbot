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
 * Parse the given base64 payload using the appropriate parser,
 * then reply to the source (a message or an interaction) with the embeds.
 * Returns the embeds so the DM relay chooser can repost them on a button click.
 */
async function parseAndRespond(type, client, source, filename, jsonData) {
	// Choose the correct parser based on type
	let parser;
	switch (type) {
		case 'TROUBLESHOOTING':
			parser = parseDalamudTroubleshooting;
			break;
		case 'TROUBLESHXLTING':
			parser = parseXlTroubleshooting;
			break;
		case 'LASTEXCEPTION':
			parser = parseLastException;
			break;
		default:
			return [];
	}

	// Execute the parser to get embeds
	const embeds = await parser.execute(client, filename, jsonData);

	// Reply with the embed(s) to the original source. In DMs this is the
	// "parse as normal" step; nothing relays until a chooser button is clicked.
	await replyToSource(source, {
		embeds,
		allowedMentions: {
			repliedUser: false,
		},
	});
	return embeds;
}

/**
 * Main entry point for processing a log attachment.
 * `source` is either a Discord Message or an Interaction.
 * Returns the collected embeds (across all matched prefixes) so the DM relay
 * chooser can repost them on a button click. Message-driven callers ignore it.
 */
exports.parseLog = async (client, source, attachment) => {
	// Only process files that look like Dalamud or XIVLauncher logs
	if (!attachment.name.match(/(dalamud|output|launcher|message).*\.(log|txt)$/gui)) {
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
			const regex = new RegExp(`${prefix.replace(/:/gu, '\\:')}(.*)`, 'gu');
			const matches = [...logData.match(regex)];
			if (matches?.length) {
				// Take the last match, slice off the prefix length
				const fullMatch = matches[matches.length - 1];
				const base64Payload = fullMatch.slice(prefix.length);
				const type = prefix.slice(0, -1); // Remove trailing colon for type key
				// Resolve the payload here in parseLog, so parseAndRespond only
				// handles data after the attachment has been read. This keeps the
				// attachment handling reusable from a messageCreate or an interaction.
				const decoded = await decodeBase64(base64Payload);
				const jsonData = JSON.parse(decoded);
				const embeds = await parseAndRespond(type, client, source, attachment.name, jsonData);
				all.push(...embeds);
			}
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
