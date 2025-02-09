exports.answer = async client => ({
	title: `Unsupported Plugin`,
	description: `Support for plugins from external sources is not provided here. `
		+ `Unsupported plugins will have a yellow 3 on their icon in the plugin installer. `
		+ `Please contact the creator(s) directly, make an issue on their git repo, or ask in their support discords. `
		+ `\n\nPlease do not link or discuss the aforementioned tool/plugin here. Thank you for your understanding! `,
	color: client.configdb.get("EMBED_NORMAL_COLOR"),
	thumbnail: {
		"url": "https://cdn.discordapp.com/attachments/687530726756712478/968717497610149908/unknown.png",
	},
	footer: {
		"text": client.configdb.get("FRANZBOT_VERSION"),
	},
});

exports.info = {
	name: "unsupported",
	category: "help",
	aliases: ["rule6"],
};
