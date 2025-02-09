exports.answer = async client => ({
	title: `How do I find the XIV on Mac install directory?`,
	description: `The XIV on Mac install directory is a folder that contains important WINE configurations, the WINE`
		+ `\n\nPrefix itself,as well as the Dalamud runtime, installed plugins, and game and system data for the XIV on Mac App.`
		+ `\n\nThe XIV on Mac prefix is located at  \`~/Library/Application Support/XIV on Mac/wineprefix\``
		+ `\n\nThe XIV on Mac install directory  is located at \`~/Library/Application Support/XIV on Mac\``
		+ `\n\nWith the XIV On Mac app focused you can hit cmd+I or go to file -> Open Install Folder for easy access\``
		+ `\n\nFor more information, see `
		+ `[HERE](https://www.xivmac.com/faq#q-prefix-folder?)`
		+ 'you can also (with XIV on Mac focused) go to file -> open wine prefix!',
	color: client.configdb.get("EMBED_NORMAL_COLOR"),
	image: {
		"url": 'https://i.imgur.com/mpJItNN.png',
	},
	footer: {
		"text": client.configdb.get("FRANZBOT_VERSION"),
	},
});

exports.info = {
	name: "prefix",
	category: "info",
	aliases: [
		"bottle",
		"xivonmacprefix",
		"xivonmacfolder",
		"install",
		"installdirectory",
	],
};
