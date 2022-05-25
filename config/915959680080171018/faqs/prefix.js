exports.answer = async client => ({
	title: `How do I find the XIV on Mac install directory?`,
	description: `The XIV on Mac install directory is a folder that contains important WINE configurations and system data for the XIV on Mac App.`
		+ `\n\nThe XIV on Mac install directory  is located at \`~/Library/Application Support/XIV on Mac\``
		+ `\n\nFor more information, see `
		+ `[HERE](https://www.xivmac.com/faq#q-prefix-folder?)`
		+ 'you can also (with XIV on Mac focused) go to file -> open wine prefix!',
	color: client.config.EMBED_NORMAL_COLOR,
	image: {
		"url": 'https://i.imgur.com/K0FhvtX.png',
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
		"install",
		"installdirectory"
	],
};
