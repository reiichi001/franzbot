export const answer = async client => ({
	title: `How do I find an old XIV on Mac CrossOver Bottle?`,
	description: `A CrossOver Bottle (aka Wine prefix) is a special folder that contains all programs and configuration `
		+ `used to run FFXIV in CrossOver.`
		+ `\n\nCrossOver Bottles can be found in \`~/Library/Application Support/CrossOver/Bottles/\``
		// + `\n\nFor more information, see `
		// + `[HERE](https://www.xivmac.com/faq#q-prefix-folder?)`
		+ "",
	color: client.configdb.get("EMBED_NORMAL_COLOR"),
	image: {
		"url": client.configdb.get("FINDERGOTOSCREENSHOT"),
	},
	footer: {
		"text": client.configdb.get("FRANZBOT_VERSION"),
	},
});

export const info = {
	name: "prefixcx",
	category: "info",
	aliases: [
		"cxprefix",
		"cxbottle",
		"bottlecx",
		"cxfolder",
	],
};
