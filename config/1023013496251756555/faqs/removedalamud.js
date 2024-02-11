export const answer = async client => ({
	title: `Generic steps to remove/reinstall Dalamud`,
	description: `General "how to delete dalamud" steps:\n`
		+ `1. Close the game and XIVLauncher\n`
		+ `2. Go to \`%AppData%\\XIVLauncher\`\n`
		+ `3. Remove the Addon\\Hooks folder\n`
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
	name: "removedalamud",
	category: "files",
	aliases: [
		"baddalamud",
		"deletedalamud",
		"reinstalldalamud",
		"uninstalldalamud",
	],
};
