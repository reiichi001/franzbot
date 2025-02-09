exports.answer = async client => ({

	title: "Project Meteor Server Setup Guides",
	description: `There are multiple guides on how to set up the Project Meteor servers and database.`,
	color: client.configdb.get("EMBED_NORMAL_COLOR"),
	footer: {
		"text": client.configdb.get("FRANZBOT_VERSION"),
	},
	fields: [
		{
			"name": "Main Wiki",
			"value": "[Set up the servers with WAMP (recommended)](http://ffxivclassic.fragmenterworks.com/wiki/index.php/Setting_up_the_project#Setting_up_with_WAMP)\n"
				+ "[Set up the servers manually](http://ffxivclassic.fragmenterworks.com/wiki/index.php/Setting_up_the_project#Installing_Manually)",
		},
		{
			"name": "Backup Wiki (has screenshots)",
			"value": "[WAMP Setup with HeidiSQL](https://wiki.ffxivrp.org/pages/ServerSetup)",
		},
	],
});

exports.info = {
	name: "config",
	category: "guides",
	aliases: [],
};
