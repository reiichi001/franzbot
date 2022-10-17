/* eslint-disable max-len */
exports.answer = async client => ({
	title: `Please wait for Dalamud and Plugin updates after a patch`,
	description: `XIVLauncher should work just fine after a patch, as SE does not modify the login progress very often.\n\n`
		+ `Please wait for Dalamud to updated and certified for the patch. It is impossible to provide a time estimate.\n\n`
		+ `Plugins might need to be updated for the new patch. Your settings will be exactly how you left them, `
		+ `barring breaking changes. You don't need to do anything special to prepare for a new patch.\n\n`
		+ `More Info `
		+ `[HERE](https://goatcorp.github.io/faq/xl_troubleshooting#q-will-pluginsxivlauncher-work-on-patch-day)`,
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
