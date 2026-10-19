const {
	resolveMentions,
} = require('./mentions.js');

function randomInt(low, high) {
	return Math.floor(Math.random() * (high - low) + low);
}

async function ship(client, text, guild) {
	const joinedargs = await resolveMentions(client, text, guild);
	const rating = randomInt(0, 100);

	let output = "";

	if (joinedargs) {
		output += `Checking the compatibility of ${joinedargs}. It's **${rating}**%\n\n`;
		for (let i = 0; i < rating; i++) {
			output += ":star:";
		}
	}
	else {
		output += "I don't understand. Please just mention two people.";
	}

	return `\u200B${output}`;
}

module.exports = {
	ship,
};
