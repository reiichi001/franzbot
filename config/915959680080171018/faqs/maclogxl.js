exports.answer = async client => ({
	title: `Please send us your output.log file (mac edition)`,
	description: `Please send us your **output.log** log file from `
		+ `\`<bottle>/drive_c/users/$USER/Application Data/XIVLauncher/\``
		+ ` in this channel, so we can look into the problem!`
		+ `\n\nIt's best to just upload/attach the file if you can!`
		+ `\n\n**DISCLAIMER**:This log will contain your ffxiv username[s]. `
		+ `If you're not comfortable posting that here, you can `
		+ `open the file in a text editor to redact that information first.\n`
		+ `__Please upload the file directly. Even if you have Nitro, please make sure it's under 5.0 MB.__`,
	color: client.config.EMBED_NORMAL_COLOR,
	image: {
		"url": client.config.FINDERGOTOSCREENSHOT,
	},
	footer: {
		"text": client.config.FRANZBOT_VERSION,
	},
});

exports.info = {
	name: "maclogxl",
	category: "logs",
	aliases: [
		"logxl", // on enable on XIV on Mac
		"maclog",
		"maclauncherlog",
		"macxivlauncherlog",
		"maclogs",
		"macxllog",
		"logmac",
		"logsmac",
		"logxlmac",
		"macoslog",
		"macoslauncherlog",
		"macosxivlauncherlog",
		"macoslogs",
		"macosxllog",
		"logmacos",
		"logsmacos",
		"logxlmacos",
	],
};

