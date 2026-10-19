// Hug the mentioned users when there are any; otherwise hug whatever text was
// provided. Resolving a bare name would need the member list, which the bot no
// longer has, so plain text is passed through as-is.
function hug(text) {
	const ids = [...(text ?? "").matchAll(/<@!?(\d+)>/gu)].map(match => match[1]);

	if (ids.length > 0) {
		return `\u200B(っ´▽｀)っ${ids.map(id => `<@${id}>`).join(" ")}`;
	}

	const target = (text ?? "").trim();
	if (target) {
		return `\u200B(っ´▽｀)っ${target}`;
	}

	return "\u200BI don't know who to hug. >_>";
}

module.exports = {
	hug,
};
