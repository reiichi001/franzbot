/* eslint-disable max-len */
exports.answer = async client => ({
	title: `Assorted network troubleshooting fixes`,
	description: `Are you getting consistent login or patch download failures on both XL and the official launcher? `
		+ `Or issues updating XIVLauncher, Dalamud, Dalamud Assets, and/or plugins?\n\n`
		+ `It's likely a bad route from your connection. Please try restarting your network equipment, adjusting DNS, `
		+ `or using a VPN to help you bypass the issue. \n`
		+ `More info [Here](https://goatcorp.github.io/faq/xl_troubleshooting#q-the-official-launcher-isnt-working--xivlauncher-failed-to-check-for-updates--patch-files-could-not-be-verified)`,
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
