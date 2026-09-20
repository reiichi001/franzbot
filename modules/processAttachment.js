// Shared bounds for log attachments. Consumed by relayFile.js (message-driven),
// parseLog.js and every explicit-upload path (/uploadlog, the FAQ upload modal)
// so all of them enforce identical validation.
//
// The framework-glue half of this file (replyToSource) now lives in
// modules/respond.js — this file is deliberately discord.js-agnostic and takes
// only a filename and a byte count.

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
 * Whether a file the USER explicitly chose (slash-command option or the FAQ
 * upload modal) falls within the accepted set: any .log/.txt, plus
 * .tspack/.evtx. Deliberately looser than isSupportedAttachment — there the
 * filename prefix stands in for intent because the user attached the file to a
 * normal message, so "client.log" or "log.txt" would be wrongly rejected. Here
 * the user has already declared the file is a log, and the parsers inspect
 * CONTENT. .dmp is deliberately absent — it is refused outright (dmpRefusal),
 * so it is never offered as a valid upload anywhere.
 */
function isUploadableAttachment(name) {
	return (/.*\.(log|txt|tspack|evtx)$/iu).test(name);
}

/**
 * Human-readable rejection message for an out-of-bounds file name.
 */
function rejectionMessage(name) {
	return `${name} is not a supported log file. Supported: any .log/.txt plain text file, .tspack, or .evtx.`;
}

/**
 * The DMP refusal, shared by every path that used to carry its own copy: these
 * files can contain private data, so they are refused rather than parsed or
 * relayed.
 */
function dmpRefusal() {
	return 'Franzbot no longer handles relaying DMP files as these can contain private data. '
		+ 'Please reach out to a Dalamud Support Team member or Dalamud Maintainer member directly if you need one analyzed.';
}

/**
 * Discord's baseline per-file upload limit: what every user gets in an
 * unboosted server, on a non-Nitro account.
 *
 * Deliberately FLAT. Franzbot re-uploads the file on the uploader's behalf, so
 * this is the bound on how much Franzbot can be made to carry — and a boost
 * level or a Nitro subscription is something a user can buy for themselves.
 * Deriving the limit from the guild's premium tier or the uploader's
 * premiumType would hand that decision to whoever is uploading.
 */
const MAX_UPLOAD_BYTES = 10 * 1024 * 1024;

/**
 * The single acceptance check for a file the user explicitly chose to upload
 * (/uploadlog's `file` option, or the FAQ upload modal). Every path that
 * accepts a user-declared log goes through here, so the accepted extensions and
 * the size ceiling cannot drift apart between handlers.
 * @param {string} name - The attachment's filename
 * @param {number} size - The attachment's size in bytes
 * @returns {string|null} The message to show the uploader, or null if accepted
 */
function checkUpload(name, size) {
	// DMP is checked before the accepted set so an explicit upload of one gets
	// the informative refusal, not the generic "not a supported log file".
	if ((/.*\.(dmp)$/iu).test(name)) {
		return dmpRefusal();
	}

	if (!isUploadableAttachment(name)) {
		return rejectionMessage(name);
	}

	if (size > MAX_UPLOAD_BYTES) {
		const sizeMb = (size / (1024 * 1024)).toFixed(1);
		return `\`${name}\` is ${sizeMb} MB, which is too large to handle.\n`
			+ 'Perhaps you\'d like to generate a fresh log that\'s smaller? To do that, just delete your '
			+ 'log file and try to relaunch with XIVLauncher, then upload the new log.';
	}

	return null;
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

/**
 * Whether a file's name marks it as one the parsers can NEVER produce anything
 * for — a zip (tspack), a crash log, an injector log, or a Windows event log.
 * These are checked BEFORE any parse attempt so the parsers never waste a
 * fetch on them: their only handling is the relay offer. tspack is included
 * even though its "parse" is the S3/Loggy step — its handler short-circuits
 * before this matcher's callers would parse.
 * .dmp is deliberately absent: it is refused outright (dmpRefusal) rather than
 * offered a relay.
 */
function isRelayOnlyAttachment(name) {
	if ((/.*\.(tspack)$/iu).test(name)) {
		return true;
	}
	if ((/^aria2.*\.(log)$/iu).test(name)) {
		return true;
	}
	if ((/^dalamud_appcrash_.*\.(log)$/iu).test(name)) {
		return true;
	}
	if ((/^dalamud\.boot.*\.(log)$/iu).test(name)) {
		return true;
	}
	if ((/^dalamud\.crashhandler.*\.(log)$/iu).test(name)) {
		return true;
	}
	if ((/^dalamud\.injector.*\.(log)$/iu).test(name)) {
		return true;
	}
	if ((/^integrityreport.*\.(txt)$/iu).test(name)) {
		return true;
	}
	if ((/^patcher.*\.(log)$/iu).test(name)) {
		return true;
	}

	// Windows Event Viewer exports: the FAQ's copy-paste "event.log", or the
	// raw binary .evtx.
	if ((/^event.*\.(log|txt)$/iu).test(name)) {
		return true;
	}
	return (/.*\.(evtx)$/iu).test(name);
}

module.exports = {
	MAX_UPLOAD_BYTES,
	isSupportedAttachment,
	isUploadableAttachment,
	rejectionMessage,
	dmpRefusal,
	checkUpload,
	isSpecialRelayAttachment,
	isRelayOnlyAttachment,
};
