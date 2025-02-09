exports.answer = async client => ({
	title: `Please send us your SquirrelSetup.log file`,
	description: `Please send us your **SquirrelSetup.log** log file from `
		+ `\`%localappdata%\\SquirrelTemp\\\` in this channel, so we can look into the problem!\n\n`
		+ `It's best to just upload/attach the file if you can!\n\n`
		+ `**NOTE**: If you have file extensions hidden, this will look like a \`Text Document\` `
		+ `named \`SquirrelSetup\` on your computer.\n\n`
		+ `**DISCLAIMER**:This log will contain your computer username. `
		+ `If you're not comfortable posting that here, you can `
		+ `open the file in a text editor to redact that information first.\n`
		+ `__Please upload the file directly. Even if you have Nitro, please make sure it's under 5.0 MB.__`,
	color: client.configdb.get("EMBED_NORMAL_COLOR"),
	image: {
		"url": client.config.WINDOWSEXPLORERSCREENSHOT,
	},
	footer: {
		"text": client.configdb.get("FRANZBOT_VERSION"),
	},
});

exports.info = {
	name: "logsq",
	category: "logs",
	aliases: [
		"squirrellog",
		"logsquirrel",
		"sqlog",
	],
};
