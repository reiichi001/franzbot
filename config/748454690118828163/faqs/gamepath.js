exports.answer = async client => ({
	title: `Please check your gamepath in XIVLauncher`,
	description: `XIVLauncher requires a working installation of the FFXIV game client, or it will install one for you. `
		+ `On first install, XIVLauncher will try to autoselect your FFXIV install for you, based on the default `
		+ `launcher's installation location and common Steam locations.\n\nFor more information, see `
		+ `[HERE](https://goatcorp.github.io/faq/xl_troubleshooting#q-where-can-i-find-my-ffxiv-installation)`,
	color: client.configdb.get("EMBED_NORMAL_COLOR"),
	footer: {
		"text": client.configdb.get("FRANZBOT_VERSION"),
	},
});

exports.info = {
	name: "gamepath",
	category: "help",
	aliases: [
		"gameinstall",
		"steampath",
		"steaminstall",
		"path",
		"ffxivpath",
		"ffxivinstall",
	],
};
