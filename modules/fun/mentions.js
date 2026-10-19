// Replace user mentions in a string with their usernames (or guild nicknames).
// This reads the mention out of the text (<@id> / <@!id>) instead of a
// mentions collection, so it works for both message content and slash-command
// string options. A single user fetch needs no privileged intent; failures
// fall back to the plain username, which also covers users who left the guild.
async function resolveMentions(client, text, guild) {
	if (!text) {
		return text;
	}

	// Collect unique ids first so a user mentioned twice is only fetched once.
	const ids = new Set();
	for (const match of text.matchAll(/<@!?(\d+)>/gu)) {
		ids.add(match[1]);
	}

	let resolved = text;
	for (const id of ids) {
		const user = await client.users.fetch(id).catch(() => null);
		if (!user) {
			continue;
		}

		// The nickname needs the guild member; outside a guild (or when the
		// fetch fails) the username is the best we have.
		const member = await guild?.members.fetch(id).catch(() => null);
		const nickname = member?.nickname || user.username;

		resolved = resolved
			.replaceAll(`<@${id}>`, user.username)
			.replaceAll(`<@!${id}>`, nickname);
	}

	return resolved;
}

module.exports = {
	resolveMentions,
};
