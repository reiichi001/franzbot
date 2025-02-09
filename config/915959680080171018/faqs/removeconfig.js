exports.answer = async client => ({
	title: `Generic steps to remove a plugin's config`,
	description: `General "how to delete a plugin's config" steps:\n`
		+ `1. Close the game and XIV on Mac\n`
		+ `2. Go to ~/Library/Application Support/XIV on Mac/pluginConfigs\`\n`
		+ `3. Remove the offending config files\n`
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
	name: "removeconfig",
	category: "files",
	aliases: [
		"badconfig",
		"deleteconfig",
		"deletepluginconfig",
		"pluginconfig",
	],
};
