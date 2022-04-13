exports.answer = async client => ({
	title: `Please make sure XIVLauncher is up to date`,
	description: `Please make sure you're using the latest version of XIVLauncher.\n\n`
		+ `You can get the latest installer from <#866796481754562571>.`,
	color: client.config.EMBED_NORMAL_COLOR,
	footer: {
		"text": client.config.FRANZBOT_VERSION,
	},
});

exports.info = {
	name: "xlupdate",
	category: "help",
	aliases: [
		"updatexl",
		"xivlauncherupdate",
	],
};
