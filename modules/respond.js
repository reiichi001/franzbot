// The one place that talks to Discord on behalf of a "source" that may be
// either a Message (message triggers) or an Interaction (slash commands,
// modals, buttons).
//
// This is framework glue rather than framework-agnostic logic, which makes it
// the deliberate exception to the modules/ rule — the rule exists to keep
// discord.js out of the parsing and policy code, and a transport shim cannot
// avoid it. It earns its place by being shared across every handler kind in the
// repo, so the reply/editReply/followUp decisions are made in exactly one file.

/**
 * Reply to a source that is either a Discord Message or an Interaction.
 * Both paths return the resulting message object, so callers can read `.url`.
 * Interaction sources must already be deferred (editReply is used, not reply).
 */
function replyToSource(source, payload) {
	if (typeof source.editReply === 'function') {
		return source.editReply(payload);
	}
	return source.reply(payload);
}

/**
 * Post parsed embeds back to the source. Used by the message-driven paths
 * (the per-guild processAttachment triggers and the DM relay) which deliver the
 * parse results in place; the explicit-upload paths build their own reply.
 */
function postParsedEmbeds(source, embeds) {
	return replyToSource(source, {
		embeds,
		allowedMentions: {
			repliedUser: false,
		},
	});
}

/**
 * Fail an interaction that has already been deferred, without leaving anything
 * public behind: drop the "thinking" reply, then report privately.
 *
 * Only valid after deferReply — a caller that can still reject cheaply should
 * reply ephemerally before deferring instead.
 */
async function failAfterDefer(interaction, error, heading = 'There was a problem with your request.') {
	console.error(error);
	// The interaction may already be gone (expired token, deleted channel);
	// neither cleanup step should mask the original error.
	await interaction.deleteReply()
		.catch(err => console.error('Failed to delete reply:', err));
	await interaction.followUp({
		content: `${heading}\n\`\`\`${error.message}\`\`\``,
		ephemeral: true,
	});
}

/**
 * A valid log arrived but held no troubleshooting blob. Same cleanup as a
 * failure: hide the public reply, answer ephemerally.
 */
async function noParseableData(interaction, name) {
	await interaction.deleteReply()
		.catch(err => console.error('Failed to delete reply:', err));
	await interaction.followUp({
		content: `No troubleshooting data in \`${name}\`. Franzbot looks for embedded log blocks `
			+ `(TROUBLESHOOTING / TROUBLESHXLTING / LASTEXCEPTION) inside the file — if this log doesn't `
			+ `contain one, there's nothing to auto-analyse.`,
		ephemeral: true,
	});
}

module.exports = {
	replyToSource,
	postParsedEmbeds,
	failAfterDefer,
	noParseableData,
};
