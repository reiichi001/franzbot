exports.answer = async client => ({
	title: `Please send us your app.log file`,
	description: `Please send us your **app.log** log file from `
		+ `\`~/Library/Application Support/XIV on Mac\``
		+ ` in this channel, so we can look into the problem!`
		+ `\n\nIt's best to just upload/attach the file if you can!`
		+ `\n\nUse Finder's 'Go to Folder...' option in the Go menu or SHIFT+CMD+G and paste the above path in!`,
	color: client.config.EMBED_NORMAL_COLOR,
	image: {
		"url": client.config.FINDERGOTOSCREENSHOT,
	},
	footer: {
		"text": client.config.FRANZBOT_VERSION,
	},
});

exports.info = {
	name: "macloga",
	category: "logs",
	aliases: [
		// "loga", // only uncomment this for the xivonmac server
		"macloga",
		"maclogapp",
		"logamac",
		"applogmac",
		"macosloga",
		"macoslogapp",
		"logamacos",
		"applogmacos",
	],
};
