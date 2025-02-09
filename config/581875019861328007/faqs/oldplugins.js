exports.answer = async client => ({
	title: `This plugin needs to be updated for the current client`,
	description: `You can find a list of popular, but not updated plugins and their status `
		+ `[HERE](https://tommadness.github.io/Plugin-Browser/)`,
	color: client.configdb.get("EMBED_NORMAL_COLOR"),
	footer: {
		"text": client.configdb.get("FRANZBOT_VERSION"),
	},
});

exports.info = {
	name: "oldplugins",
	category: "debug",
	aliases: [
		"oldplugin",
		"chatextender",
		"voidlist",
	],
};
