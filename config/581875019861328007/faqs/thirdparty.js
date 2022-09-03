exports.answer = async client => ({
	title: `Please disable plugins from custom repositories`,
	description: `Support for plugins from external sources is not provided here. `
		+ `In order for us to help you, please disable or remove any plugins that have come from a `
		+ `custom plugin respository that you added in Dalamud Settings.\n\n`
		+ `Unsupported plugins will have a yellow 3 on their icon in the plugin installer. `
		+ `If your game is crashing before you can uninstall them, `
		+ `you can also remove plugins manually - see \`f!faq delete plugin\`.`,
	color: client.config.EMBED_NORMAL_COLOR,
	thumbnail: {
		"url": "https://cdn.discordapp.com/attachments/687530726756712478/968717497610149908/unknown.png",
	},
	footer: {
		"text": client.config.FRANZBOT_VERSION,
	},
});

exports.info = {
	name: "thirdparty",
	category: "help",
	aliases: [
		"3",
		"3p",
		"3pp",
		"3party",
		"3rdparty",
	],
};
