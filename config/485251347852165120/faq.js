// Franztest //


exports.run = async (client, message, args) => {
	console.log(`Test FAQ command found in TestTriggers: ${message.channel.name}`);

	return [
		{
			title: `Faq not found for '${args[0]}'`,
			description: `Perhaps you should try the help command.`,
			color: client.config.EMBED_ERROR_COLOR,
			footer: {
				"text": client.configdb.get("FRANZBOT_VERSION"),
			},
		},
	];
};
