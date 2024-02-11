export const answer = async client => ({

	title: "Franzbot FAQ",
	description: `Supported FAQ commands listed below. Type \`${client.configdb.get("prefix")}faq <topic>\` to display the content.`,
	color: client.configdb.get("EMBED_NORMAL_COLOR"),
	footer: {
		"text": client.configdb.get("FRANZBOT_VERSION"),
	},
	fields: [
		{
			"name": "Information",
			"value": "wiki status md5",
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
});

export const info = {
	name: "help",
	category: "info",
	aliases: [],
};
