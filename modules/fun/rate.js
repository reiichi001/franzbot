const {
	resolveMentions,
} = require('./mentions.js');

function randomInt(low, high) {
	return Math.floor(Math.random() * (high - low) + low);
}

async function rate(client, text, guild) {
	const joinedargs = await resolveMentions(client, text, guild);
	const rating = randomInt(0, 10);

	let output = "";

	if (joinedargs) {
		output += `${joinedargs}? **${rating}**/10\n\n`;
		for (let i = 0; i < rating; i++) {
			output += ":star:";
		}
	}
	else {
		output += "You need to provide something for me to rate.";
	}

	return `\u200B${output}`;
}

module.exports = {
	rate,
};
