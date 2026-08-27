// Shared bounds + reply helpers for log attachments.
// Consumed by relayFile.js (message-driven), parseLog.js, and runLogCommand.js
// (slash command) so every entry point uses identical validation.

const LOG_TXT_PREFIX
	= /^(aria|dxdiag|event|dalamud|dalamudConfig|launcher|message|output|patcher|SquirrelSetup|velopack).*\.(log|txt)$/iu;

/**
 * Whether a file named `name` falls within the relay/parse bounds.
 * .tspack and .dmp always pass (they relay); .log/.txt must match a known
 * name prefix.
 */
function isSupportedAttachment(name) {
	if ((/.*\.(tspack)$/iu).test(name)) {
		return true;
	}
	if ((/.*\.(dmp)$/iu).test(name)) {
		return true;
	}
	return LOG_TXT_PREFIX.test(name);
}

/**
 * Human-readable rejection message for an out-of-bounds file name.
 */
function rejectionMessage(name) {
	return `${name} is not a supported log file. Supported: any .log/.txt plain text file, .tspack, or .dmp.`;
}

/**
 * Reply to a source that is either a Discord Message or an Interaction.
 * Both paths return the resulting message object, so callers can read `.url`.
 */
function replyToSource(source, payload) {
	if (typeof source.editReply === 'function') {
		return source.editReply(payload);
	}
	return source.reply(payload);
}

/**
 * Whether a file keeps its dedicated DM auto-relay flow instead of the
 * relay-chooser. These are the file types whose existing handling is preserved
 * ("Keep dedicated flow"): tspack (S3 upload), .dmp (no-relay warning),
 * crash logs, and dalamud.injector logs (→ Goat). They fall inside the
 * LOG_TXT_PREFIX bounds but must NOT offer the relay chooser.
 */
function isSpecialRelayAttachment(name) {
	if ((/.*\.(tspack)$/iu).test(name)) {
		return true;
	}
	if ((/.*\.(dmp)$/iu).test(name)) {
		return true;
	}
	if ((/^dalamud_appcrash_.*\.(log)$/iu).test(name)) {
		return true;
	}
	return (/dalamud\.injector.*\.(log)$/iu).test(name);
}

module.exports = {
	isSupportedAttachment,
	rejectionMessage,
	replyToSource,
	isSpecialRelayAttachment,
};
