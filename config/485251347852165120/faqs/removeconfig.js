export const answer = async client => ({
	title: `Generic steps to remove a plugin's config`,
	description: `General "how to delete a plugin's config" steps:\n`
		+ `1. Close the game and XIVLauncher\n`
		+ `2. Go to \`%AppData%\\XIVLauncher\\pluginConfigs\`\n`
		+ `3. Remove the offending config files\n`
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
		"badconfig",
		"deleteconfig",
		"deletepluginconfig",
		"pluginconfig",
	],
};
