/* eslint-disable max-len */
exports.answer = async client => ({
	title: `SE's routing is shit. Use a VPN`,
	description: `If you're getting consistent login or patch fail downloads on both XL and the Official Launcher, `
		+ `it's likely a bad route from your connection. A VPN may help you bypass the issue.`
		+ `[More info](https://goatcorp.github.io/faq/xl_troubleshooting#q-the-launcher-shows-a-red-world-icon-and-an-error-message-when-trying-to-log-in-and-the-official-launcher-doesnt-open)`,
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
