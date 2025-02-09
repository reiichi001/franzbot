// Goatplace //
/* eslint-disable no-fallthrough */
/* eslint-disable max-len */
exports.run = async (client, message, args) => {
	console.log(`Unknown FAQ command found in GoatTriggers: ${message.channel.name}`);

	return [
		{
			title: `Faq not found for '${args[0]}'`,
			description: `Please check your spelling or use \`f!faq help\`.\n\n`
				+ `Franzbot does not contain FAQs for plugins. Please poke the plugin maintainer in `
				+ `<#684745859497590843>, <#719513457988337724>, or `
				+ `make an issue on their github repo if you have a question about a specific plugin. `,
			color: client.config.EMBED_ERROR_COLOR,
			footer: {
				"text": client.configdb.get("FRANZBOT_VERSION"),
			},
		},
	];
};
