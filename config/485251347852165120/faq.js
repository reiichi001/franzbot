// Franztest //
/* eslint-disable no-fallthrough */
/* eslint-disable max-len */
exports.run = async (client, message, args) => {
	if (args.length < 1) {
		args = ["help"];
	}
	console.log(`FAQ command found in TestTriggers: ${message.channel.name}`);
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
							"name": "Known Issues posts",
							"value": "dotnet dotnet48 integrity mactype opcode redist rivatuner rtss runtimes titleedit vcredist",
						},
						{
							"name": "FAQs and Help posts",
							"value": "account av antivirus bsod dalamudtesting dalamudsettings env maintenance patch plugins reshade steam testplugins uninstall update xlhelp",
						},
					],
				},
			});
			break;
			// template
		/*
		case "KEYWORD":
			responses.push({
				"embed": {
					"title": `TITLE text`,
					"description": `DESC`,
					"color": client.config.EMBED_NORMAL_COLOR,
					"footer": {
						"text": client.config.FRANZBOT_VERSION,
					},
				},
			});
			break;
		*/
		// implemented
		// aliases
		case "thing": args[0] = "stuff";

			// GENERAL STUFF


		// KNOWN ISSUES
		case "stuff":
			responses.push({
				"embed": {
					"title": `Please wait for Dalamud and Plugin updates after a patch`,
					"description": `[Again, please see the faq](https://discordapp.com/channels/581875019861328007/586590269063954432/742835941319901235)`,
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
