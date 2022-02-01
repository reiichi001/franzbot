exports.answer = async client => ({
	title: `Please send us your patcher.log file (mac edition)`,
	description: `Please send us your **patcher.log** log file from `
		+ `\`~/Library/Application Support/XIV on Mac/game/drive_c/users/emet-selch/Application Data/XIVLauncher\``
		+ ` in this channel, so we can look into the problem!`
		+ `\n\nIt's best to just upload/attach the file if you can!\n\n`
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
	name: "maclogp",
	category: "logs",
	aliases: [
		// "logp", // only for XIV on Mac
		"maclogp",
		"maclogpatcher",
		"logpatchermac",
		"patcherlogmac",
		"macoslogp",
		"macoslogpatcher",
		"logpatchermacos",
		"patcherlogmacos",
	],
};
