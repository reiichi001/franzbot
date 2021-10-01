exports.answer = async client => ({
	title: `Generic steps to remove plugins manually`,
	description: `General "how to delete a plugin" steps:\n`
		+ `1. Close the game and xivlauncher\n`
		+ `2. Go to \`%AppData%\\XIVLauncher\\installedPlugins\`\n`
		+ `3. Remove the folder[s] for the plugin[s]\n`
		+ `4. Start the game now\n`
		+ `5. Let us know if the issue persists`
		+ `\n\nEXPERIMENTAL: You can also now delete a plugin from xivlauncher before`
		+ ` logging in. While this should work, it hasn't been tested extensively yet.`,
	color: client.config.EMBED_NORMAL_COLOR,
	image: {
		"url": client.config.WINDOWSEXPLORERSCREENSHOT,
	},
	footer: {
		"text": client.config.FRANZBOT_VERSION,
	},
});

exports.info = {
	name: "removeplugin",
	category: "files",
	aliases: [
		"badplugin",
		"deleteplugin",
		"deleteplugins",
		"removeplugins",
	],
};
