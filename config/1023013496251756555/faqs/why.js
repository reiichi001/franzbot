exports.answer = async client => ({
	title: `The XY Problem`,
	description: `The XY problem is asking about your attempted solution rather than your actual problem. `
		+ `This leads to enormous amounts of wasted time and energy, `
		+ `both on the part of people asking for help, and on the part of those providing help. `
		+ `\nThe problem occurs when people get stuck on what they believe is the solution `
		+ `and are unable step back and explain the issue in full. `
		+ `Please describe the overall task you are attempting to accomplish, `
		+ `and we may be able to point you in a much better direction to solve your problem! `
		+ `\n\nMore information about The XY Problem can be found [HERE](https://xyproblem.info/). `,
	color: client.config.EMBED_NORMAL_COLOR,
	footer: {
		"text": client.config.FRANZBOT_VERSION,
	},
});

exports.info = {
	name: "why",
	category: "help",
	aliases: ["xy", "xyproblem"],
};
