// The one place that talks to Discord on behalf of a "source" that may be
// either a Message (message triggers) or an Interaction (slash commands,
// modals, buttons).
//
// This is framework glue rather than framework-agnostic logic, which makes it
// the deliberate exception to the modules/ rule — the rule exists to keep
// discord.js out of the parsing and policy code, and a transport shim cannot
// avoid it. It earns its place by being shared across every handler kind in the
// repo, so the reply/editReply/followUp decisions are made in exactly one file.

const {
	MessageFlags,
} = require('discord.js');

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
 * The attribution prefix every relay-channel post leads with: a working
 * `<@user_id>` ping, plus the username and numeric id in plain text, so staff
 * reading the relay channel know who uploaded the file and can page them later.
 * The ping only stays non-notifying where the caller sets
 * `allowedMentions: { parse: [] }` — posts made from embeds never notify
 * regardless.
 */
function mentionTag(author) {
	if (!author?.id) {
		return 'Unknown';
	}
	return `<@${author.id}> (**${author.username ?? 'Unknown'}** (${author.id}))`;
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
 * Drop the deferred "thinking" reply, so whatever we say next leaves nothing
 * public behind. It may already be gone (expired token, deleted channel) and
 * that must not mask the original error.
 */
function dropReply(interaction) {
	return interaction.deleteReply()
		.catch(err => console.error('Failed to delete reply:', err));
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
	await dropReply(interaction);
	await interaction.followUp({
		content: `${heading}\n\`\`\`${error.message}\`\`\``,
		flags: MessageFlags.Ephemeral,
	});
}

/**
 * Answer a deferred interaction privately, leaving nothing public behind: drop
 * the "thinking" reply, then explain in an ephemeral follow-up.
 *
 * For a dead end or a refusal rather than a failure, so there is no error text
 * and nothing is logged. The caller may have deferred publicly and cannot change
 * that afterwards — removing the reply and answering privately is what makes
 * "nothing was relayed" leave no trace.
 */
async function noticeAfterDefer(interaction, content) {
	await dropReply(interaction);
	await interaction.followUp({
		content,
		flags: MessageFlags.Ephemeral,
	});
}

/**
 * A valid log arrived but held no troubleshooting blob. Same cleanup as a
 * failure: hide the public reply, answer ephemerally.
 */
async function noParseableData(interaction, name) {
	await dropReply(interaction);
	await interaction.followUp({
		content: `No troubleshooting data in \`${name}\`. Franzbot looks for embedded log blocks `
			+ `(TROUBLESHOOTING / TROUBLESHXLTING / LASTEXCEPTION) inside the file. If it doesn't `
			+ `contain one, there's nothing to parse.`,
		flags: MessageFlags.Ephemeral,
	});
}

module.exports = {
	replyToSource,
	mentionTag,
	postParsedEmbeds,
	failAfterDefer,
	noticeAfterDefer,
	noParseableData,
};
