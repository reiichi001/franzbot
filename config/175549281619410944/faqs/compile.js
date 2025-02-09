exports.answer = async client => ({

	title: "Project Meteor Server Compilation Guides",
	description: `There are multiple guides on how to compile the Project Meteor source code.`,
	color: client.configdb.get("EMBED_NORMAL_COLOR"),
	footer: {
		"text": client.configdb.get("FRANZBOT_VERSION"),
	},
	fields: [
		{
			"name": "Main Wiki",
			"value": "[Compiling from source](http://ffxivclassic.fragmenterworks.com/wiki/index.php/Setting_up_the_project#Compiling_from_source)",
		},
		{
			"name": "Backup Wiki (has screenshots)",
			"value": "[Visual Studio (full) for editing the source](https://wiki.ffxivrp.org/pages/Compiling)\n"
				+ "[CAKE with Vs Build tools (just compile it)](https://wiki.ffxivrp.org/pages/Compiling-Simple)",
		},
	],
});

exports.info = {
	name: "compile",
	category: "guides",
	aliases: [],
};
