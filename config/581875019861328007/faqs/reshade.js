/* eslint-disable max-len */
exports.answer = async client => ({
	title: `Reshade/Gshade/Stormshade/etc not working?`,
	description: `Please check the faq post `
		+ `[HERE](https://goatcorp.github.io/faq/dalamud_troubleshooting#q-reshade-and-its-variants-dont-work-or-dalamud-ui-fails)`,
	color: client.config.EMBED_NORMAL_COLOR,
	footer: {
		"text": client.config.FRANZBOT_VERSION,
	},
});

exports.info = {
	name: "reshade",
	category: "help",
	aliases: [],
};
