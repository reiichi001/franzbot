// Franztest //
/* eslint-disable no-fallthrough */
/* eslint-disable max-len */
exports.run = async (client, message, args) => {
	if (args.length < 1) {
		args = ["help"];
	}
	console.log(`Test FAQ command found in TestTriggers: ${message.channel.name}`);
	const responses = [];
	switch (args[0]) {
		case "help":
			responses.push({
				title: "Franzbot test channel FAQ",
				description: `Supported FAQ commands listed below. Type \`${client.config.prefix}faq <topic>\` to display the content.`,
				color: client.config.EMBED_NORMAL_COLOR,
				footer: {
					"text": client.config.FRANZBOT_VERSION,
				},
				fields: [
					{
						"name": "Known Issues posts",
						"value": "dotnet dotnet48 integrity mactype opcode redist rivatuner rtss runtimes titleedit vcredist",
					},
					{
						"name": "FAQs and Help posts",
						"value": "account av antivirus bsod dalamudtesting dalamudsettings env maintenance patch plugins reshade steam testplugins uninstall update xlhelp",
					},
				],
			});
			break;
			// template
		/*
		case "KEYWORD":
			responses.push({
					title: `TITLE text`,
					description: `DESC`,
					color: client.config.EMBED_NORMAL_COLOR,
					footer: {
						"text": client.config.FRANZBOT_VERSION,
					},
			});
			break;
		*/
		case "ask":
			responses.push({
				title: `Please don't ask to ask a question`,
				description: `Please don't ask to ask a question. Please just ask the question directly.\n\n`
					+ ``
					+ `If in doubt or if you're unsure where best to direct your question, we'll help you out! `
					+ `The channel names and categories are also your friend! Please check that you're in the appropriate `
					+ `section before posting a question so that we can ensure that the right people see it and that `
					+ `we can better track repeat questions/issues/requests.`,
				color: client.config.EMBED_NORMAL_COLOR,
				footer: {
					"text": client.config.FRANZBOT_VERSION,
				},
			});
			break;
		case "install":
			responses.push({
				title: `How to install XIVLauncher, Dalamud, or Plugins?`,
				description: `For the Most up to date practices, please consult <https://goatcorp.github.io/> or <#866796481754562571>`,
				color: client.config.EMBED_NORMAL_COLOR,
				footer: {
					"text": client.config.FRANZBOT_VERSION,
				},
				fields: [
					{
						name: "XIVLauncher",
						value: "You can get the latest installer from GitHub [here](https://github.com/goatcorp/FFXIVQuickLauncher/releases/latest)",
					},
					{
						name: "Dalamud",
						value: "You do not need to manually install Dalamud. Please make sure that the `in-game addon` feature is enabled in XIVLauncher.\n\n"
							+ "You should then see a message in your chatbox that Dalamud has loaded. If not, please proceed to <#584827243617058816> for troubleshooting.",
					},
					{
						name: "Plugins",
						value: "Open the system menu in-game by pressing escape, and then select `Dalamud Plugins` from there.\n\n"
							+ "You can also type `/xlplugins` as a chat command too.",
					},
					{
						name: "Third Party Plugins",
						value: "We are unable to provide support for third party plugins or other third party tools here. Please consult the developers of those plugins/tools instead.",
					},
				],
			});
			break;
		case "recommend":
			responses.push({
				title: `It is impossible for us to givep lugin recommendations`,
				description: `It is impossible for us to give plugin recommendations.\n\n`
					+ ``
					+ `While we'd like to be able to help you improve your FFXIV gaming experience in every way possible, `
					+ `it's impossible for us to give you specific plugin recommendations without knowing what you're `
					+ `looking for.\n\n`
					+ ``
					+ `- Are you looking for combat-related plugins?\n`
					+ `- Or perhaps you're looking for some chat/RP tools?\n`
					+ `- UI/overlay style plugins?\n`
					+ `- General tweaks to the game?\n`
					+ ``
					+ `If you can give us some additional context, we can give you some better answers!`
					+ ``,
				color: client.config.EMBED_NORMAL_COLOR,
				footer: {
					"text": client.config.FRANZBOT_VERSION,
				},
			});
			break;
		case "wow":
			responses.push({
				title: `Hello [possible] [former] WoW player!`,
				description: `This is mostly a joke command because users keep typing it.\n\n`
					+ `Hello assumed WoW player! Welcome to the unofficial third party tools for FFXIV community. `
					+ `You're likely to find that a lot of things here work very differently than WoW, especially in regards to addons.\n\n`
					+ ``
					+ `To start, FFXIV does not officially allow for addons or third party tools of any kind. There are no official tools `
					+ `or APIs for modding the FFXIV client, UI, or other files. Certain addons or tools that you are used to having may not `
					+ `exist. Or may not be able to be created for FFXIV. Or they may take extraordinary effort to make.\n\n`
					+ ``
					+ `Everything we do here is technically not allowed by Square Enix and it's highly recommended you avoid publicly streaming `
					+ `with visible addons and you should absolutely not mention using them in-game unless you're looking to get reported and banned. `
					+ `You may be asking yourself "How do I do I get a FFXIV UI that perfectly matches what I had in WoW?" Our answer? You probably `
					+ `can't/won't. Thankfully, FFXIV's user interface is quite customizable in the vanilla game! And we've got some extra plugins that `
					+ `can help you feel at home.\n\n`
					+ ``
					+ `As the community development landscape in FFXIV is quite different than WoW's, we do ask you check the FAQs and search the discord `
					+ `before asking if a particular plugin or feature exists. With the growing numbers of recent WoW players coming to FFXIV, it can be `
					+ `overwhelming to receive what has been perceived as a flood of requests for making FFXIV more like WoW.`
					+ ``,
				color: client.config.EMBED_NORMAL_COLOR,
				footer: {
					"text": client.config.FRANZBOT_VERSION,
				},
			});
			break;
		// implemented
		// aliases
		case "thing": args[0] = "stuff";

			// GENERAL STUFF


		// KNOWN ISSUES
		case "stuff":
			responses.push({
				title: `Please wait for Dalamud and Plugin updates after a patch`,
				description: `[Again, please see the faq](https://discordapp.com/channels/581875019861328007/586590269063954432/742835941319901235)`,
				color: client.config.EMBED_NORMAL_COLOR,
				footer: {
					"text": client.config.FRANZBOT_VERSION,
				},
			});
			break;


		default:
			responses.push({
				title: `Faq not found for '${args[0]}'`,
				description: `Perhaps you should try the help command.`,
				color: client.config.EMBED_ERROR_COLOR,
				footer: {
					"text": client.config.FRANZBOT_VERSION,
				},
			});
			break;
	}
	return responses;
};
