/* eslint-disable max-len */
exports.answer = async client => ({
	title: `What happened to a plugin I used to use / is there any update?`,
	description: `Our FAQ lists plugins that are pending updates or have been otherwise retired.\n\n`
		+ `Please see [HERE](https://goatcorp.github.io/faq/dalamud_troubleshooting.html#q-why-cant-i-find-a-plugin)`,
	color: client.config.EMBED_NORMAL_COLOR,
	footer: {
		"text": client.config.FRANZBOT_VERSION,
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
