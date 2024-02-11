export const answer = async client => ({
	title: `XIV on Mac Application Recommended Settings`,
	description: `XIV on Mac application recommended in-game settings guide.`
		+ ``
		+ `\n\nPlease visit our website to for our recommended settings guide, see `
		+ `[HERE](https://www.xivmac.com/recommended-settings)`,
	color: client.configdb.get("EMBED_NORMAL_COLOR"),
	footer: {
		"text": client.configdb.get("FRANZBOT_VERSION"),
	},
});

export const info = {
	name: "settings",
	category: "info",
	aliases: [
		"settings",
		"ingamesettings",
		"xivsettings",
	],
};
