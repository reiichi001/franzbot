

export const answer = async client => ({
	title: `Please send us your dalamud.injector.log file (XLCore Linux edition)`,
	description: `Please send us your **dalamud.injector.log** log file from `
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
		"url": client.configdb.get("LINUXFILEBROWSERSCREENSHOT"),
	},
	footer: {
		"text": client.configdb.get("FRANZBOT_VERSION"),
	},
});

export const info = {
	name: "xlcorelogi",
	category: "logs",
	aliases: [
		"logideck",
		"logiflatpak",
		"logilinux",
		"logisteamdeck",
		"logixlcore",

		"logdalamudinjectordeck",
		"logdalamudinjectorflatpak",
		"logdalamudinjectorlinux",
		"logdalamudinjectorsteamdeck",
		"logdalamudinjectorxlcore",

		"ilogdeck",
		"ilogflatpak",
		"iloglinux",
		"ilogsteamdeck",
		"ilogxlcore",

		"dalamudinjectorlogdeck",
		"dalamudinjectorlogflatpak",
		"dalamudinjectorloglinux",
		"dalamudinjectorlogsteamdeck",
		"dalamudinjectorlogxlcore",

		"decklogi",
		"flatpaklogi",
		"linuxlogi",
		"steamdecklogi",
		// "xlcorelogi",

		"deckilog",
		"flatpakilog",
		"linuxilog",
		"steamdeckilog",
		"xlcoreilog",

		"decklogdalamudinjector",
		"flatpaklogdalamudinjector",
		"steamdecklogdalamudinjector",
		"linuxlogdalamudinjector",
		"xlcorelogdalamudinjector",

		"deckdalamudinjectorlog",
		"flatpakdalamudinjectorlog",
		"linuxdalamudinjectorlog",
		"steamdeckdalamudinjectorlog",
		"xlcoredalamudinjectorlog",
	],
};
