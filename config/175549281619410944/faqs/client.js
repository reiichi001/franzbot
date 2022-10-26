exports.answer = async client => ({

	title: "Project Meteor FFXIV 1.23b Client Launcher Setup Guides",
	description: "**NOTE**: This requires an installation of FFXIV 1.0. FFXIV 2.0 A Realm Reborn is a completely different game and uses a different client and is not compatible.\n\n"
		+ "There are multiple guides on how to set up the Seventh Umbral (7U) Launcher.",
	color: client.config.EMBED_NORMAL_COLOR,
	footer: {
		"text": client.config.FRANZBOT_VERSION,
	},
	fields: [
		{
			"name": "Main Wiki",
			"value": "[Set up 7UL for localhost](http://ffxivclassic.fragmenterworks.com/wiki/index.php/Setting_up_the_project#Client_Setup)",
		},
		{
			"name": "Backup Wiki",
			"value": "[Set up 7UL for localhost](https://wiki.ffxivrp.org/pages/ClientAndLauncher",
		},
	],
});

exports.info = {
	name: "client",
	category: "guides",
	aliases: [],
};
