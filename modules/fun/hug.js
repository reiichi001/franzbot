// Extract the mentioned user ids from a command's text. Hugging accepts any
// number of mentions, so this reads the raw text rather than option objects.
function hug(text) {
	const ids = [...(text ?? "").matchAll(/<@!?(\d+)>/gu)].map(match => match[1]);

	if (ids.length === 0) {
		return "\u200BI don't know who to hug. >_>";
	}

	return `\u200B(っ´▽｀)っ${ids.map(id => `<@${id}>`).join(" ")}`;
}

module.exports = {
	hug,
};
