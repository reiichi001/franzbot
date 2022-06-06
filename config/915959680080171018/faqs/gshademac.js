exports.answer = async client => ({
	title: `Gshade Crossover Mac`,
	description: `Guide for setting up Gshade inside Mac Crossover.`
		+ ``
		+ `\n\nPlease visit our Gshade Crossover Mac setup guide on GitHub, see `
		+ `[HERE](https://github.com/seathasky/gshade_cx_mac)`,
	color: client.config.EMBED_NORMAL_COLOR,
	footer: {
		"text": client.config.FRANZBOT_VERSION,
	},
});

exports.info = {
	name: "gshademac",
	category: "help",
	aliases: [
		"gshademac",
		"gshadecx",
		"gshadeguide",
	],
};
