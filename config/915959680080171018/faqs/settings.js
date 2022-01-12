exports.answer = async client => ({
	title: `XIV on Mac Application Recommended Settings`,
	description: `XIV on Mac application recommended in-game settings guide.`
		+ ``
		+ `\n\nPlease visit our website to for our recommended settings guide, see `
		+ `[HERE](https://www.xivmac.com/recommended-settings)`,
	color: client.config.EMBED_NORMAL_COLOR,
	footer: {
		"text": client.config.FRANZBOT_VERSION,
	},
});

exports.info = {
	name: "settings",
	category: "help",
	aliases: [
		"settings",
		"ingamesettings",
		"xivsettings",
	],
};
