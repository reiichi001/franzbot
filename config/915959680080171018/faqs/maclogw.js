exports.answer = async client => ({
	title: `Please send us your wine.log file`,
	description: `Please send us your **wine.log** log file from `
		+ `\`~/Library/Application Support/XIV on Mac\``
		+ ` in this channel, so we can look into the problem!`
		+ `\n\nIt's best to just upload/attach the file if you can!`
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
	name: "maclogw",
	category: "logs",
	aliases: [
		"logw", // only uncomment this for the xivonmac server
		"maclogw",
		"maclogwine",
		"logwmac",
		"winelogmac",
		"macoslogw",
		"macoslogwine",
		"logwmacos",
		"winelogmacos",
	],
};
