

exports.answer = async client => ({
	title: `Please send us your dalamud.boot.log file (XLCore Linux edition)`,
	description: `Please send us your **dalamud.boot.log** log file from `
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
	name: "xlcorelogb",
	category: "logs",
	aliases: [
		"logbdeck",
		"logbflatpak",
		"logblinux",
		"logbsteamdeck",
		"logbxlcore",

		"logdalamudbootdeck",
		"logdalamudbootflatpak",
		"logdalamudbootlinux",
		"logdalamudbootsteamdeck",
		"logdalamudbootxlcore",

		"blogdeck",
		"blogflatpak",
		"bloglinux",
		"blogsteamdeck",
		"blogxlcore",

		"dalamudbootlogdeck",
		"dalamudbootlogflatpak",
		"dalamudbootloglinux",
		"dalamudbootlogsteamdeck",
		"dalamudbootlogxlcore",

		"decklogb",
		"flatpaklogb",
		"linuxlogb",
		"steamdecklogb",
		// "xlcorelogb",

		"deckblog",
		"flatpakblog",
		"linuxblog",
		"steamdeckblog",
		"xlcoreblog",

		"decklogdalamudboot",
		"flatpaklogdalamudboot",
		"steamdecklogdalamudboot",
		"linuxlogdalamudboot",
		"xlcorelogdalamudboot",

		"deckdalamudbootlog",
		"flatpakdalamudbootlog",
		"linuxdalamudbootlog",
		"steamdeckdalamudbootlog",
		"xlcoredalamudbootlog",
	],
};
