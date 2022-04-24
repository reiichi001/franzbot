/* eslint-disable max-len */
exports.answer = async client => ({
	title: `Updating FFXIV with TexTools mods still applied can lead to crashes`,
	description: `We recommend you check with the TexTools discord on this.\n\n`
		+ `Our suggested steps are to disable all mods and start over. \n\n`
		+ `More Info: [HERE](https://goatcorp.github.io/faq/xl_troubleshooting#q-i-updated-my-game-with-textools-mods-installed-how-do-i-fix-crashes)`,
	color: client.config.EMBED_NORMAL_COLOR,
	footer: {
		"text": client.config.FRANZBOT_VERSION,
	},
});

exports.info = {
	name: "textools",
	category: "info",
	aliases: ["textool"],
};
