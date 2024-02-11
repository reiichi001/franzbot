/* eslint-disable max-len */
export const answer = async client => ({
	title: `SE's routing is shit. Use a VPN`,
	description: `If you're getting consistent login or patch download failures on both XL and the official launcher, `
		+ `it's likely a bad route from your connection. A VPN may help you bypass the issue. \n`
		+ `More info [Here](https://goatcorp.github.io/faq/xl_troubleshooting#q-the-official-launcher-isnt-working--xivlauncher-failed-to-check-for-updates--patch-files-could-not-be-verified)`,
	color: client.configdb.get("EMBED_NORMAL_COLOR"),
	footer: {
		"text": client.configdb.get("FRANZBOT_VERSION"),
	},
});

export const info = {
	name: "vpn",
	category: "info",
	aliases: ["dns"],
};
