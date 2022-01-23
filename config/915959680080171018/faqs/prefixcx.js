exports.answer = async client => ({
	title: `How do I find an old XIV on Mac CrossOver Bottle?`,
	description: `A CrossOver Bottle (aka Wine prefix) is a special folder that contains all programs and configuration `
		+ `used to run FFXIV in CrossOver.`
		+ `\n\nCrossOver Bottles can be found in \`~/Library/Application Support/CrossOver/Bottles/\``
		// + `\n\nFor more information, see `
		// + `[HERE](https://www.xivmac.com/faq#q-prefix-folder?)`
		+ "",
	color: client.config.EMBED_NORMAL_COLOR,
	image: {
		"url": client.config.FINDERGOTOSCREENSHOT,
	},
	footer: {
		"text": client.config.FRANZBOT_VERSION,
	},
});

exports.info = {
	name: "prefixcx",
	category: "help",
	aliases: [
		"cxprefix",
		"cxbottle",
		"bottlecx",
		"cxfolder",
	],
};
