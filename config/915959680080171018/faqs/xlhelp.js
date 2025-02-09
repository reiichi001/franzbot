exports.answer = async client => ({
	title: ` What is the command for <insert plugin here>? `,
	description: `Please type \`xlhelp\` in game, more information `
		+ `[HERE](https://goatcorp.github.io/faq/dalamud_troubleshooting#q-what-is-the-command-for-insert-plugin-here)`,
	color: client.configdb.get("EMBED_NORMAL_COLOR"),
	footer: {
		"text": client.configdb.get("FRANZBOT_VERSION"),
	},
});

exports.info = {
	name: "xlhelp",
	category: "info",
	aliases: [],
};
