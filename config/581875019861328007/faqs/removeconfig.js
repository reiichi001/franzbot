export const answer = async client => ({
	title: `Where can I find/delete a plugin's config?`,
	description: ``
		+ `1. Close the game and XIVLauncher\n`
		+ `2. Go to \`%AppData%\\XIVLauncher\\pluginConfigs\`\n`
		+ `3. Remove the offending config file[s]\n`
		+ `4. Start the game now\n`
		+ `5. Let us know if the issue persists`,
	color: client.configdb.get("EMBED_NORMAL_COLOR"),
	image: {
		"url": client.configdb.get("WINDOWSEXPLORERSCREENSHOT"),
	},
	footer: {
		"text": client.configdb.get("FRANZBOT_VERSION"),
	},
});

export const info = {
	name: "removeconfig",
	category: "files",
	aliases: [
		"config",
		"badconfig",
		"deleteconfig",
		"deletepluginconfig",
		"pluginconfig",
	],
};
