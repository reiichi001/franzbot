exports.answer = async client => ({
	title: `WTFast Configuration for XIVLauncher`,
	description: `You can find details on how to configure WTFast to work with XIVLauncher `
		+ `[HERE](https://goatcorp.github.io/faq/xl_troubleshooting#q-wtfast-config)`,
	color: client.config.EMBED_NORMAL_COLOR,
	footer: {
		"text": client.config.FRANZBOT_VERSION,
	},
});

exports.info = {
	name: "wtfast",
	category: "help",
	aliases: [],
};
