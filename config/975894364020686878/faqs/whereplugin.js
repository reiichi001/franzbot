
exports.answer = async client => ({
	title: `Why can’t I find a plugin / is there any update?`,
	description: `Our FAQ lists plugins that are pending updates or have been retired.\n\n`
		+ `Please see the list [HERE](https://goatcorp.github.io/faq/dalamud_troubleshooting.html#q-why-cant-i-find-a-plugin).`,
	color: client.configdb.get("EMBED_NORMAL_COLOR"),
	footer: {
		"text": client.configdb.get("FRANZBOT_VERSION"),
	},
});

exports.info = {
	name: "whereplugin",
	category: "info",
	aliases: [
		"whereplogon",
		"anyupdate",
	],
};
