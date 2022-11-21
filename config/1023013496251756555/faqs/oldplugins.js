exports.answer = async client => ({
	title: `This plugin needs to be updated for the current client`,
	description: `You can find a list of popular, but not updated plugins and their status `
		+ `[HERE](https://goatcorp.github.io/faq/dalamud_troubleshooting#q-outdated-plugins-list)`,
	color: client.config.EMBED_NORMAL_COLOR,
	footer: {
		"text": client.config.FRANZBOT_VERSION,
	},
});

exports.info = {
	name: "oldplugins",
	category: "debug",
	aliases: [
		"oldplugin",
		"chatextender",
		"voidlist",
	],
};
