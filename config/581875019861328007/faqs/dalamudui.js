export const answer = async client => ({
	title: `How do I reset dalamud/plugin window locations?`,
	description: `Please see our FAQ with steps `
		+ `[HERE](https://goatcorp.github.io/faq/dalamud_troubleshooting#q-how-do-i-reset-dalamudplugin-window-locations)`,
	color: client.configdb.get("EMBED_NORMAL_COLOR"),
	footer: {
		"text": client.configdb.get("FRANZBOT_VERSION"),
	},
});

export const info = {
	name: "dalamudui",
	category: "help",
	aliases: [
		"badui",
		"missingui",
	],
};
