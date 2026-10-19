const runes = require('stringz');
const chars = require('../flip.js');
const {
	resolveMentions,
} = require('./mentions.js');

// Add the reverse mapping once, so flipping flipped text restores the original.
Object.keys(chars).forEach(key => {
	const value = chars[key];
	if (!chars[value]) {
		chars[value] = key;
	}
});

async function flip(client, text, guild) {
	const joinedargs = await resolveMentions(client, text, guild);

	if (!joinedargs) {
		return "\u200B(╯°□°）╯︵ This command requires an argument.";
	}

	// stringz splits on grapheme clusters so emoji survive the reversal.
	const runifiedoutput = runes.toArray(joinedargs);
	let result = "";
	let c = runes.length(joinedargs);
	let ch = "";

	for (; c >= 0; --c) {
		ch = runifiedoutput[c];
		result += chars[ch] || ch || "";
	}

	return `\u200B(╯°□°）╯︵ ${result}`;
}

module.exports = {
	flip,
};
