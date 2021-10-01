/* eslint-disable max-len */
exports.answer = async client => ({
	title: `Please wait for Dalamud and Plugin updates after a patch`,
	description: `XIVLauncher should work just fine after a patch.\n\nDalamud and plugins will need to be updated.\n\nMore Info `
		+ `[HERE](https://goatcorp.github.io/faq/xl_troubleshooting#q-do-not-expect-dalamud-andor-plugins-to-work-on-updatespatch-day-releases)`,
	color: client.config.EMBED_NORMAL_COLOR,
	footer: {
		"text": client.config.FRANZBOT_VERSION,
	},
});

exports.info = {
	name: "update",
	category: "info",
	aliases: [
		"patch",
		"patches",
		"newpatch",
		"newupdate",
	],
};
