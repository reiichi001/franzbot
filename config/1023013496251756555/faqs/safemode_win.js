export const answer = async client => ({
	title: `How do I turn off Dalamud safe mode?`,
	description: "Dalamud safemode occurs when an internal piece of the plugin system fails. "
		+ "Usually, this indicates a hook failure or a previous Dalamud crash.\n\n"
		+ "**It should automatically clear when you try to relaunch.** If it doesn't, head to "
		+ "`%appdata%\\xivlauncher` and remove the `.dalamud_safemode` file in that folder.\n\n"
		+ "NOTE: You may need to enable seeing hidden files.",
	color: client.configdb.get("EMBED_NORMAL_COLOR"),
	image: {
		"url": client.configdb.get("WINDOWSEXPLORERSCREENSHOT"),
	},
	footer: {
		"text": client.configdb.get("FRANZBOT_VERSION"),
	},
});

export const info = {
	name: "safemode",
	category: "help",
	aliases: [],
};
