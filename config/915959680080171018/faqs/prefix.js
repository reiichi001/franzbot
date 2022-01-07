exports.answer = async client => ({
	title: `How do I find the XIV on Mac prefix?`,
	description: `The XIV on Mac prefix is a folder that contains important WINE configurations and system data for XIV on Mac App.`
		+ `The XIV on Mac application data folder or "Prefix" is located at ~/Library/Application Support/XIV on MAC `
		+ `\n\nFor more information, see `
		+ `[HERE](https://www.xivmac.com/faq#q-prefix-folder?)`,
	color: client.config.EMBED_NORMAL_COLOR,
	footer: {
		"text": client.config.FRANZBOT_VERSION,
	},
});

exports.info = {
	name: "prefix",
	category: "help",
	aliases: [
		"prefix",
		"xivonmacprefix",
		"xivonmacfolder",
	],
};
