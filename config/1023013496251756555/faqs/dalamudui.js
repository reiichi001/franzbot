exports.answer = async client => ({
	title: `How do I reset dalamud/plugin window locations?`,
	description: `Please see our FAQ with steps `
		+ `[HERE](https://goatcorp.github.io/faq/dalamud_troubleshooting#q-how-do-i-reset-dalamudplugin-window-locations)`,
	color: client.config.EMBED_NORMAL_COLOR,
	footer: {
		"text": client.config.FRANZBOT_VERSION,
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
