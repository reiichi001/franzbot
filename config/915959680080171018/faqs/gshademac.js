exports.answer = async client => ({
	title: `Gshade Guide`,
	description: `Guide for setting up Gshade with XIV on Mac.`
		+ ``
		+ `\n\nPlease use our Gshade setup guide on our website, see `
		+ `[HERE](https://www.xivmac.com/gshade)`,
	color: client.config.EMBED_NORMAL_COLOR,
	footer: {
		"text": client.config.FRANZBOT_VERSION,
	},
});

exports.info = {
	name: "gshademac",
	category: "info",
	aliases: [
		"gshademac",
		"gshade",
		"gshadeguide",
	],
};
