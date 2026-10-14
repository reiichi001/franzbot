exports.answer = async client => ({
	title: `Unsupported Plugin`,
	description: `Support for plugins from external sources is not provided here.\n\n`
		+ `Plugins that we support will have an <:main_repo:1309368942925578372> icon and are available by default.\n`
		+ `Unsupported plugins will have an <:custom_repo:1309368924063924285> icon in the plugin installer and `
		+ `only appear due to additional configuration on your part.\n`
		+ `Please contact the creator(s) directly, make an issue on their git repo, or ask in their support discords. `
		+ `\n\nPlease do not link or discuss the aforementioned tool/plugin here. Thank you for your understanding! `,
	color: client.configdb.get("EMBED_NORMAL_COLOR"),
	thumbnail: {
		"url": "https://cdn.discordapp.com/emojis/1309368924063924285.webp",
	},
	footer: {
		"text": `\`/faq unsupported\` · ${client.configdb.get("FRANZBOT_VERSION")}`,
	},
});

exports.info = {
	name: "unsupported",
	category: "help",
	aliases: [
		"6",
		"rule6",
		"welcome6",
	],
};
