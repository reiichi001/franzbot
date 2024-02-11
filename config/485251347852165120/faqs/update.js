/* eslint-disable max-len */
export const answer = async client => ({
	title: `Please wait for Dalamud and Plugin updates after a patch`,
	description: `XIVLauncher should work just fine after a patch.\n\nDalamud and plugins will need to be updated.\n\nMore Info `
		+ `[HERE](https://goatcorp.github.io/faq/xl_troubleshooting#q-do-not-expect-dalamud-andor-plugins-to-work-on-updatespatch-day-releases)`,
	color: client.configdb.get("EMBED_NORMAL_COLOR"),
	footer: {
		"text": client.configdb.get("FRANZBOT_VERSION"),
	},
});

export const info = {
	name: "update",
	category: "info",
	aliases: [
		"patch",
		"patches",
		"newpatch",
		"newupdate",
	],
};
