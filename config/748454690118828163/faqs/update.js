
exports.answer = async client => ({
	title: `Please wait for Dalamud and Plugin updates after a patch`,
	description: `XIVLauncher should work just fine after a patch, as SE does not modify the login progress very often.\n\n`
		+ `Please wait for Dalamud to updated and certified for the patch. It is impossible to provide a time estimate.\n\n`
		+ `Penumbra most likely will not need any patch-specific fixes. Your mods and settings will be exactly how you left them. `
		+ `You don't need to do anything special to prepare for a new patch.\n\n`
		+ `More Info `
		+ `[HERE](https://goatcorp.github.io/faq/xl_troubleshooting#q-will-pluginsxivlauncher-work-on-patch-day)`,
	color: client.configdb.get("EMBED_NORMAL_COLOR"),
	footer: {
		"text": client.configdb.get("FRANZBOT_VERSION"),
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
