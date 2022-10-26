/* eslint-disable max-len */

// Project Meteor //
exports.run = async (client, message, args) => {
	console.log(`FAQ command found in MeteorTriggers: ${message.channel.name}`);

	return [
		{
			title: `Faq not found for '${args[0]}'`,
			description: `Please check your spelling or use \`f!faq help\`.\n\n`,
			color: client.config.EMBED_ERROR_COLOR,
			footer: {
				"text": client.config.FRANZBOT_VERSION,
			},
		},
	];
};
