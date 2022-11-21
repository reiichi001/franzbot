exports.answer = async client => ({
	title: ` What is the command for <insert plugin here>? `,
	description: `Please type \`xlhelp\` in game, more information `
		+ `[HERE](https://goatcorp.github.io/faq/dalamud_troubleshooting#q-what-is-the-command-for-insert-plugin-here)`,
	color: client.config.EMBED_NORMAL_COLOR,
	footer: {
		"text": client.config.FRANZBOT_VERSION,
	},
});

exports.info = {
	name: "xlhelp",
	category: "info",
	aliases: [],
};
