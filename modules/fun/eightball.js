const predict = require('eightball');

// Ask the magic 8-ball. If a question was supplied, echo it before the answer.
function roll(question) {
	const asked = (question ?? "").trim();
	const answer = `\u200B${predict()}`;

	return asked
		? `\u200B**${asked}**\n${answer}`
		: answer;
}

module.exports = {
	roll,
};
