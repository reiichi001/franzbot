// Attachments pinned to a context-menu invocation until its modal is submitted.
//
// Discord modals cannot be pre-filled with a file, so the "Process log with
// Franzbot" message command never uploads anything: the files stay on the
// target message and this in-memory record is what carries them across the
// showModal / modal-submit boundary. The record's token is the suffix of the
// modal's customId, so the submit handler can look the files back up.
//
// Token -> { attachments, authorId, guildId, channelId, messageId, messageUrl, createdAt }.
// authorId is the target message's author — the person who uploaded the files —
// so relay posts and Loggy attribution name them rather than the moderator.
// messageId lets the submit handler fetch (and delete) the original message
// when the post carried relay-and-remove file types.
// In-memory only; Discord CDN attachment URLs live at least 24h, so a 15-minute
// TTL sweep keeps this bounded well inside the safe window.

const pending = new Map();

// ~15 min for a moderator to submit the handling modal before it is dropped.
const PENDING_TTL_MS = 15 * 60 * 1000;

function createPending(token, record) {
	pending.set(token, record);
}

function resolve(token) {
	return pending.get(token);
}

function deletePending(token) {
	pending.delete(token);
}

// Periodic sweep drops stale records so the Map never grows unbounded. Unref'd
// so it cannot hold the process open on its own (same pattern as dmRelayStore).
setInterval(() => {
	const cutoff = Date.now() - PENDING_TTL_MS;
	for (const [
		token,
		record,
	] of pending) {
		if (record.createdAt < cutoff) {
			pending.delete(token);
		}
	}
}, PENDING_TTL_MS).unref();

module.exports = {
	PENDING_TTL_MS,
	createPending,
	resolve,
	deletePending,
};
