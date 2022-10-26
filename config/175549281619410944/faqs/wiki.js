exports.answer = async client => ({

	title: "Project Meteor Wiki",
	description: `<http://ffxivclassic.fragmenterworks.com/wiki/index.php/Main_Page>`,
	color: client.config.EMBED_NORMAL_COLOR,
	footer: {
		"text": client.config.FRANZBOT_VERSION,
	},
	fields: [
		{
			"name": "Backup Wiki",
			"value": "<https://wiki.ffxivrp.org>",
		},
	],
});

exports.info = {
	name: "wiki",
	category: "info",
	aliases: [],
};
