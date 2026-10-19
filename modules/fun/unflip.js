const {
	resolveMentions,
} = require('./mentions.js');

function randomInt(low, high) {
	return Math.floor(Math.random() * (high - low) + low);
}

async function unflip(client, text, guild) {
	const joinedargs = await resolveMentions(client, text, guild);
	const chance = randomInt(0, 10);

	let output = "\u200B";

	if (joinedargs && chance > 1) {
		output += joinedargs;
	}
	else if (chance <= 1) {
		output += "Go raise yourself.";
	}
	else {
		output += "This command requires an argument.";
	}

	return `${output}ノ( ゜-゜ノ)`;
}

module.exports = {
	unflip,
};
