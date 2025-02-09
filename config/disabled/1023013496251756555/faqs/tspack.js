exports.answer = async client => ({
	title: `Please send us your .tspack for troubleshooting`,
	description: `Please send us your troubleshooting pack from `
		+ `\`%AppData%\\XIVLauncher\\\` in this channel, so we can look into the problem!`
		+ `\n\nIt's best to just upload/attach the file if you can!`
		+ `\n\nSteps to generate a troubleshooting pack:\n`
		+ `1. Open XIVLauncher (hold shift if autologin is enabled)\n`
		+ `2. Go to the XIVLauncher settings\n`
		+ `3. Go to the "About" tab\n`
		+ `4. Click the XIVLauncher logo`
		+ `\n\n**NOTE**: If you have file extensions hidden, this file will just look like \`trouble-(some number)\` on your screen.`
		+ `\n__Please upload the file directly. Even if you have Nitro, please make sure it's under 5.0 MB.__`,
	color: client.configdb.get("EMBED_NORMAL_COLOR"),
	image: {
		"url": client.config.WINDOWSEXPLORERSCREENSHOT,
	},
	footer: {
		"text": client.configdb.get("FRANZBOT_VERSION"),
	},
});

exports.info = {
	name: "tspack",
	category: "logs",
	aliases: ["troubleshootingpack"],
};
