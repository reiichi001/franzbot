exports.answer = async client => ({
	title: `Generic steps to remove plugins manually`,
	description: `General "how to delete a plugin" steps:\n`
		+ `1. Close the game and XIV on Mac\n`
		+ `2. Go to \~/Library/Application Support/XIV on Mac/installedPlugins\n`
		+ `3. Remove the folder[s] for the plugin[s]\n`
		+ `4. Go to ~/Library/Application Support/XIV on Mac/\n`
		+ `3. Remove the \`runtime\` folder\n`
		+ `4. Start the game now\n`
		+ `5. Let us know if the issue persists`,
	color: client.configdb.get("EMBED_NORMAL_COLOR"),
	image: {
		"url": client.config.FINDERGOTOSCREENSHOT,
	},
	footer: {
		"text": client.configdb.get("FRANZBOT_VERSION"),
	},
});
exports.info = {
	name: "removeruntime",
	category: "files",
	aliases: [
		"runtimeremove",
		"deleteruntime",
		"deleteruntimes",
		"removeruntimes",
	],
};
