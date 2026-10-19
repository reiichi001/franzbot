// Franzbot's own user id. The fistbump is always from this account.
const FRANZ_ID = "485139646213521418";

// Bump fists with the user who invoked the command.
function bump(userId) {
	return `\u200B<@${FRANZ_ID}>🤜🤛<@${userId}>`;
}

module.exports = {
	bump,
};
