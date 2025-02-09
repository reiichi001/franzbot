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
		+ `Especially on newer plugins, they could crash your game. `
		+ `For troubleshooting, please keep questions/comments/issues in the <#719513457988337724> channel.** `
		+ `More info [HERE](https://goatcorp.github.io/faq/dalamud_troubleshooting#q-how-do-i-enable-plugin-test-builds)`,
	color: client.configdb.get("EMBED_NORMAL_COLOR"),
	footer: {
		"text": client.configdb.get("FRANZBOT_VERSION"),
	},
});

exports.info = {
	name: "plugintesting",
	category: "info",
	aliases: [
		"pt",
		"xlsettings",
		"testplugin",
		"testplugins",
		"testingplugin",
		"testingplugins",
	],
};
