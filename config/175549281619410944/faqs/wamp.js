exports.answer = async client => ({

	title: "Project Meteor FFXIV Recommended Tools",
	description: "Here are some tools you may find useful.",
	color: client.config.EMBED_NORMAL_COLOR,
	footer: {
		"text": client.config.FRANZBOT_VERSION,
	},
	fields: [
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
});

exports.info = {
	name: "wamp",
	category: "tools",
	aliases: [
		"heidi",
		"mysql",
		"mariadb",
		"tool",
	],
};
