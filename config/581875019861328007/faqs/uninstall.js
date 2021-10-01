/* eslint-disable max-len */
exports.answer = async client => ({
	title: `How do I uninstall XIV Launcher?`,
	description: `Instructions can be found [HERE](https://goatcorp.github.io/faq/xl_troubleshooting#q-how-do-i-uninstall-xiv-launcher)`,
	color: client.config.EMBED_NORMAL_COLOR,
	footer: {
		"text": client.config.FRANZBOT_VERSION,
	},
});

exports.info = {
	name: "uninstall",
	category: "help",
	aliases: [
		"removexl",
		"reinstall",
		"cleaninstall",
	],
};
