/* eslint-disable max-len */
export const answer = async client => ({
	title: `How do I fix a version check error when trying to update FFXIV?`,
	description: `You'll need to make an edit to your FFXIVBOOT.cfg file.`
		+ `More Info: [HERE](https://goatcorp.github.io/faq/xl_troubleshooting#q-how-do-i-fix-a-version-check-error-when-trying-to-update-ffxiv
						)`,
	color: client.configdb.get("EMBED_NORMAL_COLOR"),
	footer: {
		"text": client.configdb.get("FRANZBOT_VERSION"),
	},
});

export const info = {
	name: "vercheck",
	category: "help",
	aliases: [
		"versioncheck",
		"versionfail",
		"bootcheck",
		"ffxivboot",
	],
};
