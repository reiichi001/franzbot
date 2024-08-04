exports.answer = async client => ({
	title: `How to enable Plugin Testing`,
	description: `General "how to enable plugin test builds" steps:\n`
		+ `1. Type \`/xlsettings\` in game.\n`
		+ `2. Go to the \`Experimental\` tab\n`
		+ `3. Click the checkbox for \`Get plugin testing builds\`\n`
		+ `4. Read the instructions on how to receive test builds for specific plugins.\n`
		+ `5. Save / Save and Close\n`
		+ `\n`
		+ `**Please note that testing plugins can/will have bugs and may change dramatically before final release. `
		+ `Especially on newer plugins, they could crash your game.\n\n`
		+ `For troubleshooting, please keep questions/comments/issues in their respective channels/categories.`,
	color: client.config.EMBED_NORMAL_COLOR,
	footer: {
		"text": client.config.FRANZBOT_VERSION,
	},
});

exports.info = {
	name: "plugintesting",
	category: "info",
	aliases: [
		"pt",
		"plugintest",
		"pluginstest",
		// "plugintesting",
		"pluginstesting",
		"testplugin",
		"testplugins",
		"testingplugin",
		"testingplugins",
	],
};
