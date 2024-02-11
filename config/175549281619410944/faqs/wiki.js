export const answer = async client => ({

	title: "Project Meteor Wiki",
	description: `<http://ffxivclassic.fragmenterworks.com/wiki/index.php/Main_Page>`,
	color: client.configdb.get("EMBED_NORMAL_COLOR"),
	footer: {
		"text": client.configdb.get("FRANZBOT_VERSION"),
	},
	fields: [
		{
			"name": "Backup Wiki",
			"value": "<https://wiki.ffxivrp.org>",
		},
	],
});

export const info = {
	name: "wiki",
	category: "info",
	aliases: [],
};
