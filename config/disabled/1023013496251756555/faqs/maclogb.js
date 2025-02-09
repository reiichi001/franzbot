exports.answer = async client => ({
	title: `Please send us your dalamud.boot.log file (mac edition)`,
	description: `Please send us your **dalamud.boot.log** log file from `
		+ `\`~/Library/Application Support/XIV on Mac/ \``
		+ ` in this channel, so we can look into the problem!`
		+ `\n\nIt's best to just upload/attach the file if you can!\n\n`
		+ `__Please upload the file directly. Even if you have Nitro, please make sure it's under 5.0 MB.__`
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
	name: "maclogb",
	category: "logs",
	aliases: [
		// "logb", // only for XIV on Mac
		"dalamud.boot.log",
		"dalamudbootlog",
		"macdalamudbootlog",
		"macblog",
		"logbmac",
		"dalamudbootlogmac",
		"logdalamudbootmac",
		"blogmac",
		"maclogdalamudboot",
		"macdalamudbootlog",
		"macblog",
		"logbmac",
		"dalamudbootlogmac",
		"logdalamudbootmac",
		"blogmac",
	],
};
