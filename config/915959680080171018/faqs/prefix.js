exports.answer = async client => ({
	title: `How do I find the XIV on Mac prefix?`,
	description: `The XIV on Mac prefix is a folder that contains important WINE configurations and system data for XIV on Mac App.`
		+ `\n\nThe XIV on Mac application data folder or "Prefix" is located at \`~/Library/Application Support/XIV on Mac\``
		+ `\n\nFor more information, see `
		+ `[HERE](https://www.xivmac.com/faq#q-prefix-folder?)`
		+ `\n\nUse Finder's 'Go to Folder...' option in the Go menu or SHIFT+CMD+G and paste the path above in!`,
	color: client.config.EMBED_NORMAL_COLOR,
	image: {
		"url": client.config.FINDERGOTOSCREENSHOT,
	},
	footer: {
		"text": client.config.FRANZBOT_VERSION,
	},
});

exports.info = {
	name: "prefix",
	category: "help",
	aliases: [
		"bottle",
		"xivonmacprefix",
		"xivonmacfolder",
	],
};
