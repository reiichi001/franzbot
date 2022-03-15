exports.answer = async client => ({
	title: `XIV on Mac Application Requirements`,
	description: `The XIV on Mac Application currently requires macOS Montery 12.0 or higher as well as a compatible AMD Radeon GPU or M1 equipped machine. Please check out https://www.xivmac.com/compatibility-database for more information.`
		+ ``
		+ `\n\nPlease visit our website to see additional hardware reqs & fps estimates, see `
		+ `[HERE](https://www.xivmac.com/faq#q-xiv-on-mac-app-reqs)`,
	color: client.config.EMBED_NORMAL_COLOR,
	footer: {
		"text": client.config.FRANZBOT_VERSION,
	},
});

exports.info = {
	name: "reqs",
	category: "help",
	aliases: [
		"reqs",
		"req",
		"requirements",
	],
};
