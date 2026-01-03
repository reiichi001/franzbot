exports.answer = async client => ({
	title: `Please be patient and don't ask for plugin updates`,
	description: `We do not know when a specific plugin will receive an update and do not have an ETA. `
		+ `Only the developer of the plugin could possibly answer that. Please just wait for the plugin to be updated.\n\n`
		+ `Additionally, it is also worth mentioning that, no, there are no alternatives to that specific plugin you're waiting for. `
		+ `There's a handful of plugins that do have some overlap with each other, but the majority of plugins do not.\n\n`
		+ `If a plugin does not get updated, other developers can [adopt it](https://dalamud.dev/faq/adoption) after a certain period of time.`,
	color: client.configdb.get("EMBED_NORMAL_COLOR"),
	footer: {
		"text": client.configdb.get("FRANZBOT_VERSION"),
	},
});

exports.info = {
	name: "pluginupdate",
	category: "info",
	aliases: [
		"plugineta",
	],
};
