/* eslint-disable max-len */
exports.answer = async client => ({
	title: `List of Dalamud plugins`,
	description: `You can find a list of all plugins available on Dalamud's main and testing repos [HERE](https://tommadness.github.io/Plugin-Browser/)`,
	color: client.configdb.get("EMBED_NORMAL_COLOR"),
	footer: {
		"text": client.configdb.get("FRANZBOT_VERSION"),
	},
});

exports.info = {
	name: "pluginlist",
	category: "info",
	aliases: [
		"plugin list",
		"plugin browser",
	],
};
