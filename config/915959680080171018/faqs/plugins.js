/* eslint-disable max-len */
exports.answer = async client => ({
	title: `I get an error message when trying to install/update/disable a plugin`,
	description: `Have you tried reading the post in <#866796481754562571>?\n\n`
		+ `Otherwise, see [HERE](https://goatcorp.github.io/faq/dalamud_troubleshooting#q-i-get-an-error-message-when-trying-to-installupdatedisable-a-plugin)`,
	color: client.config.EMBED_NORMAL_COLOR,
	footer: {
		"text": client.config.FRANZBOT_VERSION,
	},
});

exports.info = {
	name: "plugins",
	category: "debug",
	aliases: [
		"xlplugins",
		"installplugins",
	],
};
