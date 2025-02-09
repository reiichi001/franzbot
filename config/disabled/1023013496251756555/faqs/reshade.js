/* eslint-disable max-len */
exports.answer = async client => ({
	title: `Reshade/Gshade/etc not working or shaders being applied on plugin windows?`,
	description: `Please check the faq post `
		+ `[HERE](https://goatcorp.github.io/faq/dalamud_troubleshooting#q-reshade-and-its-variants-dont-work-or-dalamud-ui-fails)`,
	color: client.configdb.get("EMBED_NORMAL_COLOR"),
	footer: {
		"text": client.configdb.get("FRANZBOT_VERSION"),
	},
});

exports.info = {
	name: "reshade",
	category: "help",
	aliases: [
		"stormshade",
		"gshade",
		"shaders",
	],
};
