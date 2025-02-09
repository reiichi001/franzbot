exports.answer = async client => ({
	title: `Please send us your wine.log file`,
	description: `Please send us your **wine.log** log file from `
		+ `\`~/Library/Application Support/XIV on Mac/logs\``
		+ ` in this channel, so we can look into the problem!`
		+ `\n\nIt's best to just upload/attach the file if you can!`
		+ `\n\nUse Finder's 'Go to Folder...' option in the Go menu or SHIFT+CMD+G and paste the above path in!`,
	color: client.configdb.get("EMBED_NORMAL_COLOR"),
	image: {
		"url": client.config.FINDERGOTOSCREENSHOT,
	},
	footer: {
		"text": client.configdb.get("FRANZBOT_VERSION"),
	},
});

exports.info = {
	name: "maclogw",
	category: "logs",
	aliases: [
		// "wine.log", // only uncomment this for the xivonmac server
		"wine",
		"winelog",
		"logwmac",
		"winelogmac",
		"macoslogw",
		"macoslogwine",
		"logwmacos",
		"winelogmacos",
	],
};
