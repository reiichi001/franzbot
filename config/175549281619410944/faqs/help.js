exports.answer = async client => ({

	title: "Franzbot FAQ",
	description: `Supported FAQ commands listed below. Type \`${client.config.prefix}faq <topic>\` to display the content.`,
	color: client.config.EMBED_NORMAL_COLOR,
	footer: {
		"text": client.config.FRANZBOT_VERSION,
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

exports.info = {
	name: "help",
	category: "info",
	aliases: [],
};
