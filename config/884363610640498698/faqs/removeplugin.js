exports.answer = async client => ({
	title: `Generic steps to remove plugins manually`,
	description: `General "how to delete a plugin" steps:\n`
		+ `1. Close the game and XIVLauncher\n`
		+ `2. Go to \`%AppData%\\XIVLauncher\\installedPlugins\`\n`
		+ `3. Remove the folder[s] for the plugin[s]\n`
		+ `4. Go to \`%AppData%\\XIVLauncher\\devPlugins\`\n`
		+ `5. Remove all manually installed plugins. (Check if they have a third party repo or reinstall later)\n`
		+ `6. Start the game now\n`
		+ `7. Let us know if the issue persists`,
	color: client.configdb.get("EMBED_NORMAL_COLOR"),
	image: {
		"url": client.config.WINDOWSEXPLORERSCREENSHOT,
	},
	footer: {
		"text": client.configdb.get("FRANZBOT_VERSION"),
	},
});

exports.info = {
	name: "removeplugin",
	category: "files",
	aliases: [
		"removeplugins",
		"badplugin",
		"deleteplugin",
		"reinstallplugin",
		"uninstallplugin",
		"badplugins",
		"deleteplugins",
		"reinstallplugins",
		"uninstallplugins",
	],
};
