exports.answer = async client => ({
	title: `Generic steps to remove/reinstall Dalamud Assets`,
	description: `General "how to delete assets" steps:\n`
		+ `1. Close the game and XIVLauncher\n`
		+ `2. Go to \`%AppData%\\XIVLauncher\`\n`
		+ `3. Remove the \`dalamudAssets\` folder\n`
		+ `4. Start the game now\n`
		+ `5. Let us know if the issue persists`,
	color: client.configdb.get("EMBED_NORMAL_COLOR"),
	image: {
		"url": client.config.WINDOWSEXPLORERSCREENSHOT,
	},
	footer: {
		"text": client.configdb.get("FRANZBOT_VERSION"),
	},
});

exports.info = {
	name: "removeassets",
	category: "files",
	aliases: [
		"removeassets",
		"badasset",
		"deleteasset",
		"reinstallasset",
		"uninstallasset",
		"badassets",
		"deleteassets",
		"reinstallassets",
		"uninstallassets",
		"assets",
	],
};
