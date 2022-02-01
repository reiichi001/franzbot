exports.answer = async client => ({
	title: `Please send us your aria.log file (mac edition)`,
	description: `Please send us your **aria.log** log file from `
		+ `\`~/Library/Application Support/XIV on Mac/game/drive_c/users/emet-selch/Application Data/XIVLauncher\``
		+ ` in this channel, so we can look into the problem!`
		+ `\n\nIt's best to just upload/attach the file if you can!`,
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
		"maclogaria",
		"logamac",
		"arialogmac",
		"macosloga",
		"macoslogaria",
		"logamacos",
		"arialogmacos",
	],
};
