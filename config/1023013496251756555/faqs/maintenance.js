exports.answer = async client => ({
	title: `Please wait for Dalamud and Plugin updates after a patch`,
	description: ``,
	color: client.config.EMBED_NORMAL_COLOR,
	footer: {
		"text": client.config.FRANZBOT_VERSION,
	},
});

exports.info = {
	name: "maintenance",
	category: "info",
	aliases: ["maint"],
};
