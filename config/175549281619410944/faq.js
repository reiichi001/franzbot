/* eslint-disable max-len */

// Project Meteor //
exports.run = async (client, args) => {
	if (args.length < 1) {
		args = ["help"];
	}

	const responses = [];
	switch (args[0]) {
		case "help":
			responses.push({
				"embed": {
					"title": "Franzbot FAQ",
					"description": `Supported FAQ commands listed below. Type \`${client.config.prefix}faq <topic>\` to display the content.`,
					"color": client.config.EMBED_NORMAL_COLOR,
					"footer": {
						"text": client.config.FRANZBOT_VERSION,
					},
					"fields": [
						{
							"name": "Information",
							"value": "wiki status paru md5",
						},
						{
							"name": "Guides",
							"value": "compile config client",
						},
						{
							"name": "Tools",
							"value": "vs wamp",
						},
					],
				},
			});
			break;
		case "wiki":
			responses.push({
				"embed": {
					"title": "Project Meteor Wiki",
					"description": `<http://ffxivclassic.fragmenterworks.com/wiki/index.php/Main_Page>`,
					"color": client.config.EMBED_NORMAL_COLOR,
					"footer": {
						"text": client.config.FRANZBOT_VERSION,
					},
					"fields": [
						{
							"name": "Backup Wiki",
							"value": "<https://wiki.ffxivrp.org>",
						},
					],
				},
			});
			break;
		case "compile":
			responses.push({
				"embed": {
					"title": "Project Meteor Server Compilation Guides",
					"description": `There are multiple guides on how to compile the Project Meteor source code.`,
					"color": client.config.EMBED_NORMAL_COLOR,
					"footer": {
						"text": client.config.FRANZBOT_VERSION,
					},
					"fields": [
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
				},
			});
			break;
		case "config":
			responses.push({
				"embed": {
					"title": "Project Meteor Server Setup Guides",
					"description": `There are multiple guides on how to set up the Project Meteor servers and database.`,
					"color": client.config.EMBED_NORMAL_COLOR,
					"footer": {
						"text": client.config.FRANZBOT_VERSION,
					},
					"fields": [
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
				},
			});
			break;
		case "client":
			responses.push({
				"embed": {
					"title": "Project Meteor FFXIV 1.23b Client Launcher Setup Guides",
					"description": "**NOTE**: This requires an installation of FFXIV 1.0. FFXIV 2.0 A Realm Reborn is a completely different game and uses a different client and is not compatible.\n\n"
						+ "There are multiple guides on how to set up the Seventh Umbral (7U) Launcher.",
					"color": client.config.EMBED_NORMAL_COLOR,
					"footer": {
						"text": client.config.FRANZBOT_VERSION,
					},
					"fields": [
						{
							"name": "Main Wiki",
							"value": "[Set up 7UL for localhost](http://ffxivclassic.fragmenterworks.com/wiki/index.php/Setting_up_the_project#Client_Setup)",
						},
						{
							"name": "Backup Wiki",
							"value": "[Set up 7UL for localhost](https://wiki.ffxivrp.org/pages/ClientAndLauncher",
						},
					],
				},
			});
			break;
		case "vs":
			responses.push({
				"embed": {
					"title": "Get Visual Studio (2019) or Build Tools",
					"description": "You can download the latest version of Visual Studio or just the build tools here: <https://visualstudio.microsoft.com/downloads/>",
					"color": client.config.EMBED_NORMAL_COLOR,
					"footer": {
						"text": client.config.FRANZBOT_VERSION,
					},
				},
			});
			break;
		case "wamp":
		case "heidi":
		case "mysql":
		case "mariadb":
			args[0] = "tool";
		// INTENTIONALLY FALLS THROUGH
		case "tool":
			responses.push({
				"embed": {
					"title": "Project Meteor FFXIV Recommended Tools",
					"description": "Here are some tools you may find useful.",
					"color": client.config.EMBED_NORMAL_COLOR,
					"footer": {
						"text": client.config.FRANZBOT_VERSION,
					},
					"fields": [
						{
							"name": "MySQL Graphical Clients",
							"value": "[HeidiSQL](https://www.heidisql.com/download.php)",
						},
						{
							"name": "Git Clients",
							"value": "[Git Bash (cli)](https://gitforwindows.org/)\n"
								+ "[GitKraken](https://www.gitkraken.com/)\n"
								+ "[SourceTree](https://www.sourcetreeapp.com)",
						},
						{
							"name": "Webservers with MySQL and PHP",
							"value": "[WAMP (recommend)](http://www.wampserver.com/en/#download-wrapper",
						},
					],
				},
			});
			break;
		case "paru":
			responses.push("Paru has a server compiled and running a recent develop branch. Login and instructions are available on <https://7ur.sqnya.se/index.php>");
			break;
		case "progress":
			args[0] = "status";
		// INTENTIONALLY FALLS THROUGH
		case "status":
			responses.push({
				"embed": {
					"title": "Project Meteor Implementation Status",
					"description": "This is difficult to quantify. Chances are, whatever feature you're hoping to have implemented isn't quite ready yet for any variety of reasons. These sorts of questions cannot be answered clearly or with a percentage number and are often between varying degrees of implemented to no current plans to implement.",
					"color": 10197915,
					"footer": {
						"text": client.config.FRANZBOT_VERSION,
					},
				},
			});
			responses.push({
				"embed": {
					"title": "Working features",
					"description": "+ Logging in: implemented\n"
						+ "+ Character creation and deletion: implemented\n"
						+ "+ Multiple players in zones: implemented\n"
						+ "+ Chatting: mostly implemented (linkshells tba)\n"
						+ "+ Parties: implemented",
					"color": 7779621,
				},
			});
			responses.push({
				"embed": {
					"title": "Partially working features",
					"description": "* Combat: base code in progress\n"
						+ "* Monster AI: base code in progress\n"
						+ "* Monster Pathfinding: base code in progress; navmeshes not generated\n"
						+ "* Equipping gear: graphics IDs are linked.\n"
						+ "* Leveling up: requires debug commands at this time",
					"color": 16312092,
				},
			});
			responses.push({
				"embed": {
					"title": "Not-working or unimplemented",
					"description": "- Gear Stats: not implemented\n"
						+ "- Monster Spawnpoints: supported, but not implemented\n"
						+ "- Quests: generally not implemented\n"
						+ "- Crafting and Gathering: widgets can be spawned, but not implemented",
					"color": 13632027,
				},
			});
			break;
		case "md5":
		case "sha":
			args[0] = "hash";
		// INTENTIONALLY FALLS THROUGH
		case "hash":
			responses.push({
				"embed": {
					"title": "Final Fantasy XIV 1.0 Installation Disc hashes",
					"description": "Here is some information about the official 1.0 install disc if you'd like to verify that yours is not damaged or tampered with.",
					"color": client.config.EMBED_NORMAL_COLOR,
					"footer": {
						"text": client.config.FRANZBOT_VERSION,
					},
					"fields": [
						{
							"name": "MD5",
							"value": "`acb251ad6d246ff1f1d68b6c6c78b234`",
						},
						{
							"name": "SHA1",
							"value": "`3df40d83b227484a302d3f51615d1d90f419daf6`",
						},
					],
				},
			});
			break;
		case "basic":
		case "welcome":
		case "duh":
		case "new":
			args[0] = "about";
		// INTENTIONALLY FALLS THROUGH
		case "about":
			responses.push({
				"embed": {
					"title": "Project Meteor Implementation Status",
					"description": "Project Meteor is **not** a replacements fora FFXIV A Realm Reborn retail subscription. This is a project for the abandoned FFXIV 1.0 client/server and is not feature complete nor is the project expected to become feature-complete any time soon. See f!faq for a brief overview of implemented features.",
					"color": client.config.EMBED_NORMAL_COLOR,
					"footer": {
						"text": client.config.FRANZBOT_VERSION,
					},
				},
			});
			break;
		default:
			responses.push({
				"embed": {
					"title": `Faq not found for '${args[0]}'`,
					"color": client.config.EMBED_ERROR_COLOR,
					"footer": {
						"text": client.config.FRANZBOT_VERSION,
					},
				},
			});
			break;
	}
	return responses;
};
