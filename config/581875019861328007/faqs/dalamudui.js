exports.answer = async client => ({
	title: `How do I reset Dalamud/plugin window locations?`,
	description: `1. Completely close and exit FFXIV.\n`
		+ `2. Browse to \`%AppData%\\XIVLauncher\\\` in Windows, \`~/.xlcore/\` in Linux.\n`
		+ `3. Open \`dalamudUI.ini\` in a text editor of your choice.\n`
		+ `4. Locate the line pertaining to the plugin in question. For example, \`[Window][ChillFrames Settings]\` for Chill Frames.\n`
		+ `5. You will see a line below it containing the text \`Pos=#,#\`. If it's invalid, you may see negative numbers and/or ones larger than your monitor's resolution dimensions (X,Y).\n`
		+ `6. Edit the invalid number(s) by replacing them with 60 (the default). See the image below for a reference.\n\n`
		+ `There may be multiple lines for different windows for a single plugin, so edit any other invalid instances you see for that plugin.\n`
		+ `Alternatively, if you wish to completely reset all of your plugin window positions you can delete the .ini file outright and it will regenerate on next game launch.\n\n`
		+ `You can find more information [HERE](https://goatcorp.github.io/faq/dalamud_troubleshooting#q-how-do-i-reset-dalamudplugin-window-locations).`,
	color: client.configdb.get("EMBED_NORMAL_COLOR"),
	image: {
		"url": "https://cdn.discordapp.com/attachments/927971845389578310/1560001916510011562/Screenshot_20261014_134724.png",
	},
	footer: {
		"text": `\`/faq dalamudui\` · ${client.configdb.get("FRANZBOT_VERSION")}`,
	},
});

exports.info = {
	name: "dalamudui",
	category: "help",
	aliases: [
		"badui",
		"missingui",
	],
};
