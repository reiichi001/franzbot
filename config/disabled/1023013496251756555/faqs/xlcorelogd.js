

exports.answer = async client => ({
	title: `Please send us your dalamud.log file (XLCore Linux edition)`,
	description: `Please send us your **dalamud.log** log file from `
		+ `\`~/.xlcore/\``
		+ ` in this channel, so we can look into the problem!`
		+ `\n\nYou can also use \`xdg-open ~/.xlcore\` in your terminal of choice to open this in your file browser.`
		+ `\n\nIt's best to just upload/attach the file if you can!`
		+ `\n\n**DISCLAIMER**:This log will contain your computer username. `
		+ `If you're not comfortable posting that here, you can `
		+ `open the file in a text editor to redact that information first.\n`
		+ `__Please upload the file directly. Even if you have Nitro, please make sure it's under 5.0 MB.__`,
	color: client.configdb.get("EMBED_NORMAL_COLOR"),
	image: {
		"url": client.config.LINUXFILEBROWSERSCREENSHOT,
	},
	footer: {
		"text": client.configdb.get("FRANZBOT_VERSION"),
	},
});

exports.info = {
	name: "xlcorelogd",
	category: "logs",
	aliases: [
		"logddeck",
		"logdflatpak",
		"logdlinux",
		"logdsteamdeck",
		"logdxlcore",

		"logdldeck", // just for Aireil
		"logdlflatpak", // just for Aireil
		"logdllinux", // just for Aireil
		"logdlsteamdeck", // just for Aireil
		"logdlxlcore", // just for Aireil

		"logdalamuddeck",
		"logdalamudflatpak",
		"logdalamudlinux",
		"logdalamudsteamdeck",
		"logdalamudxlcore",

		"dlogdeck",
		"dlogflatpak",
		"dloglinux",
		"dlogsteamdeck",
		"dlogxlcore",

		"dalamudlogdeck",
		"dalamudlogflatpak",
		"dalamudloglinux",
		"dalamudlogsteamdeck",
		"dalamudlogxlcore",

		"decklogd",
		"flatpaklogd",
		"linuxlogd",
		"steamdecklogd",
		// "xlcorelogb",

		"deckdlog",
		"flatpakdlog",
		"linuxdlog",
		"steamdeckdlog",
		"xlcoredlog",

		"decklogdalamud",
		"flatpaklogdalamud",
		"steamdecklogdalamud",
		"linuxlogdalamud",
		"xlcorelogdalamud",

		"deckdalamudlog",
		"flatpakdalamudlog",
		"linuxdalamudlog",
		"steamdeckdalamudlog",
		"xlcoredalamudlog",
	],
};
