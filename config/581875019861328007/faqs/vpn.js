/* eslint-disable max-len */
exports.answer = async client => ({
	title: `Network Connectivity Issues?`,
	description: `Are you getting consistent login or patch download failures on both XL and the official launcher? `
		+ `Or issues updating XIVLauncher, Dalamud, Dalamud Assets, and/or plugins?\n\n`
		+ `It's likely a bad route from your connection. We have no control over your routes, but please try the following:\n
		+ 'Restart your network equipment \n'
		+ 'Change your DNS settings \n`
		+ `**Using a VPN to help you bypass the issue.** \n\n`
		+ `More specific info can be found [Here](https://goatcorp.github.io/faq/xl_troubleshooting#q-the-official-launcher-isnt-working--xivlauncher-failed-to-check-for-updates--patch-files-could-not-be-verified), `
		+ 'including free VPN recommendations.',
	color: client.configdb.get("EMBED_NORMAL_COLOR"),
	footer: {
		"text": client.configdb.get("FRANZBOT_VERSION"),
	},
});

exports.info = {
	name: "vpn",
	category: "info",
	aliases: [
		"dns",
		"networking",
	],
};
