/* eslint-disable max-len */
exports.answer = async client => ({
	title: `SE's routing is shit. Use a VPN`,
	description: `If you're getting consistent login or patch download failures on both XL and the Official Launcher, `
		+ `it's likely a bad route from your connection. A VPN may help you bypass the issue.`
		+ `[More info](https://goatcorp.github.io/faq/xl_troubleshooting#q-the-official-launcher-isnt-working--xivlauncher-failed-to-check-for-updates--patch-files-could-not-be-verified)`,
	color: client.config.EMBED_NORMAL_COLOR,
	footer: {
		"text": client.config.FRANZBOT_VERSION,
	},
});

exports.info = {
	name: "vpn",
	category: "info",
	aliases: ["dns"],
};
