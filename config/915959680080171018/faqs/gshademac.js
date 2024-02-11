export const answer = async client => ({
	title: `Gshade Guide`,
	description: `Guide for setting up Gshade with XIV on Mac.`
		+ ``
		+ `\n\nPlease use our Gshade setup guide on our website, see `
		+ `[HERE](https://www.xivmac.com/gshade)`,
	color: client.configdb.get("EMBED_NORMAL_COLOR"),
	footer: {
		"text": client.configdb.get("FRANZBOT_VERSION"),
	},
});

export const info = {
	name: "gshademac",
	category: "info",
	aliases: [
		"gshademac",
		"gshade",
		"gshadeguide",
	],
};
