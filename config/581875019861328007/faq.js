// Goatplace //
/* eslint-disable no-fallthrough */
/* eslint-disable max-len */
exports.run = async (client, message, args) => {
	if (args.length < 1) {
		args = ["help"];
	}
	console.log(`FAQ command found in TestTriggers: ${message.channel.name}`);
	const responses = [];

	switch (args[0]) {
		// aliases
		case "patch": args[0] = "update"; break;
		case "patches": args[0] = "update"; break;
		case "new patch": args[0] = "update"; break;
		case "maint": args[0] = "maintenance"; break;
		case "xlplugins": args[0] = "plugins"; break;
		case "installplugins": args[0] = "plugins"; break;
		case "integritycheck": args[0] = "integrity"; break;
		case "runtime": args[0] = "redist"; break;
		case "runtimes": args[0] = "redist"; break;
		case "redistributable": args[0] = "redist"; break;
		case "redistributables": args[0] = "redist"; break;
		case "vcredist": args[0] = "redist"; break;
		case "dotnet": args[0] = "redist"; break;
		case "dotnet48": args[0] = "redist"; break;
		case "net48": args[0] = "redist"; break;
		case "net4.8": args[0] = "redist"; break;
		case ".net4.8": args[0] = "redist"; break;
		case "dalamudtesting": args[0] = "dalamudsettings"; break;
		case "dalamudstaging": args[0] = "dalamudsettings"; break;
		case "testplugins": args[0] = "dalamudsettings"; break;
		case "plugintesting": args[0] = "dalamudsettings"; break;
		case "xlsettings": args[0] = "dalamudsettings"; break;
		case "BSOD": args[0] = "bsod"; break;
		case "bluescreen": args[0] = "bsod"; break;
		case "antivirus": args[0] = "av"; break;
		case "anti-virus": args[0] = "av"; break;
		case "defender": args[0] = "av"; break;
		case "bitdefender": args[0] = "av"; break;
		case "removexl": args[0] = "uninstall"; break;
		case "rivatuner": args[0] = "rtss"; break;
		case "msiafterburner": args[0] = "rtss"; break;
		case "afterburner": args[0] = "rtss"; break;
		case "mactype": args[0] = "rtss"; break;
		case "hookfail": args[0] = "rtss"; break;
		case "dns": args[0] = "vpn"; break;
		case "oldplugin": args[0] = "oldplugins"; break;
		case "jobicon": args[0] = "oldplugins"; break;
		case "job icons": args[0] = "oldplugins"; break;
		case "chatextender": args[0] = "oldplugins"; break;
		case "testdalamud": args[0] = "dalamudtesting"; break;
		case "dt": args[0] = "dalamudtesting"; break;
		case "badplugin": args[0] = "removeplugin"; break;
		case "deleteplugin": args[0] = "removeplugin"; break;
		case "deletedalamud": args[0] = "removedalamud"; break;
		case "baddalamud": args[0] = "removedalamud"; break;
		case "reinstalldalamud": args[0] = "removedalamud"; break;
		case "log": args[0] = "logxl"; break;
		case "logs": args[0] = "logxl"; break;
		case "xllog": args[0] = "logxl"; break;
		case "logdalamud": args[0] = "logd"; break;
		case "dlog": args[0] = "logd"; break;
		default: break;
	}

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
							"value": "dotnet dotnet48 hookfail integrity mactype opcode redist rivatuner rtss runtimes vcredist",
						},
						{
							"name": "FAQs and Help posts",
							"value": "account av antivirus badplugin bsod dalamudtesting dalamudsettings deletedalamud deleteplugin dns "
								+ "env log logd logdalamud logxl maintenance patch plugins reinstalldalamud removedalamud reshade removeplugin "
								+ "steam testplugins uninstall update xlhelp",
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
		// KNOWN ISSUES
		case "integrity":
			responses.push({
				"embed": {
					"title": `Integrity check does not work`,
					"description": `More details [HERE](https://discordapp.com/channels/581875019861328007/586590269063954432/749247804051816498)`,
					"color": client.config.EMBED_NORMAL_COLOR,
					"footer": {
						"text": client.config.FRANZBOT_VERSION,
					},
				},
			});
			break;
		case "opcode":
			responses.push({
				"embed": {
					"title": `OpCodes need to be manually updated.`,
					"description": `You can find the post on DalamudAssets OpCodes [HERE](https://discordapp.com/channels/581875019861328007/586590269063954432/766340668406497341)`,
					"color": client.config.EMBED_NORMAL_COLOR,
					"footer": {
						"text": client.config.FRANZBOT_VERSION,
					},
				},
			});
			break;
		case "redist":
			responses.push({
				"embed": {
					"title": `XL Requires these redistributables`,
					"description": `Please make sure you've installed DirectX, .Net 4.8, and VS2015-2019 packages. More info [HERE](https://discordapp.com/channels/581875019861328007/586590269063954432/740149543466696734)`,
					"color": client.config.EMBED_NORMAL_COLOR,
					"footer": {
						"text": client.config.FRANZBOT_VERSION,
					},
				},
			});
			break;
		case "rtss":
			responses.push({
				"embed": {
					"title": `Plugin GUI does not load`,
					"description": `Please check if you have other programs modifying FFXIV. More details [HERE](https://discordapp.com/channels/581875019861328007/586590269063954432/689136371364790293)`,
					"color": client.config.EMBED_NORMAL_COLOR,
					"footer": {
						"text": client.config.FRANZBOT_VERSION,
					},
				},
			});
			break;
		case "oldplugins":
			responses.push({
				"embed": {
					"title": `This plugin needs to be updated for the current client`,
					"description": `ChatExtender and JobIcons are pending rewrites by the developer. Asking them constantly will only result in demotivation.`,
					"color": client.config.EMBED_NORMAL_COLOR,
					"footer": {
						"text": client.config.FRANZBOT_VERSION,
					},
				},
			});
			break;

		// FAQs and Help
		case "account":
			responses.push({
				"embed": {
					"title": `XL Saved Credentials`,
					"description": `Having an issue with saved credentials or your FFXIV Account? See [HERE](https://discordapp.com/channels/581875019861328007/586590269063954432/698305374855495731)`,
					"color": client.config.EMBED_NORMAL_COLOR,
					"footer": {
						"text": client.config.FRANZBOT_VERSION,
					},
				},
			});
			break;
		case "av":
			responses.push({
				"embed": {
					"title": `Please whitelist or make AV exceptions for XIV Launcher`,
					"description": `Details can be found [HERE](https://discordapp.com/channels/581875019861328007/586590269063954432/695694479923085474)`,
					"color": client.config.EMBED_NORMAL_COLOR,
					"footer": {
						"text": client.config.FRANZBOT_VERSION,
					},
				},
			});
			break;
		case "bsod":
			responses.push({
				"embed": {
					"title": `I think XIV Launcher is giving me a Blue Screen of Death`,
					"description": `It's probably not XL's fault. But if you really think it is, please answer the questions [HERE](https://discordapp.com/channels/581875019861328007/586590269063954432/705169229539967037)`,
					"color": client.config.EMBED_NORMAL_COLOR,
					"footer": {
						"text": client.config.FRANZBOT_VERSION,
					},
				},
			});
			break;
		case "dalamudsettings":
			responses.push({
				"embed": {
					"title": `How do I enable/disable Dalamud Testing or Plugin Testing?`,
					"description": `See [HERE](https://discordapp.com/channels/581875019861328007/586590269063954432/737080343445897337)`,
					"color": client.config.EMBED_NORMAL_COLOR,
					"footer": {
						"text": client.config.FRANZBOT_VERSION,
					},
				},
			});
			break;
		case "env":
			responses.push({
				"embed": {
					"title": `XL Environment Variables`,
					"description": `You can find the post on XL environment variables [HERE](https://discordapp.com/channels/581875019861328007/586590269063954432/770342806727950406)`,
					"color": client.config.EMBED_NORMAL_COLOR,
					"footer": {
						"text": client.config.FRANZBOT_VERSION,
					},
				},
			});
			break;
		case "xlhelp":
			responses.push({
				"embed": {
					"title": ` What is the command for <insert plugin here>? `,
					"description": `Please type \`xlhelp\` in game`,
					"color": client.config.EMBED_NORMAL_COLOR,
					"footer": {
						"text": client.config.FRANZBOT_VERSION,
					},
				},
			});
			break;
		case "maintenance":
			responses.push({
				"embed": {
					"title": `Please wait for Dalamud and Plugin updates after a patch`,
					"description": ``,
					"color": client.config.EMBED_NORMAL_COLOR,
					"footer": {
						"text": client.config.FRANZBOT_VERSION,
					},
				},
			});
			break;
		case "plugins":
			responses.push({
				"embed": {
					"title": `I get an error message when trying to install/update/disable a plugin`,
					"description": `See [HERE](https://discordapp.com/channels/581875019861328007/586590269063954432/751955960356143144)`,
					"color": client.config.EMBED_NORMAL_COLOR,
					"footer": {
						"text": client.config.FRANZBOT_VERSION,
					},
				},
			});
			break;
		case "reshade":
			responses.push({
				"embed": {
					"title": `Reshade/Gshade/Stormshade/etc not working?`,
					"description": `Please check the faq post [HERE](https://discord.com/channels/581875019861328007/586590269063954432/757395514936393795)`,
					"color": client.config.EMBED_NORMAL_COLOR,
					"footer": {
						"text": client.config.FRANZBOT_VERSION,
					},
				},
			});
			break;
		case "steam":
			responses.push({
				"embed": {
					"title": `What are the Steam options for?`,
					"description": `For detail on Steam Integration and Steam Service Account, see [HERE](https://discordapp.com/channels/581875019861328007/586590269063954432/753307018135208029)`,
					"color": client.config.EMBED_NORMAL_COLOR,
					"footer": {
						"text": client.config.FRANZBOT_VERSION,
					},
				},
			});
			break;
		case "uninstall":
			responses.push({
				"embed": {
					"title": `How do I uninstall XIV Launcher?`,
					"description": `Instructions can be found [HERE](https://discordapp.com/channels/581875019861328007/586590269063954432/695677579574640642)`,
					"color": client.config.EMBED_NORMAL_COLOR,
					"footer": {
						"text": client.config.FRANZBOT_VERSION,
					},
				},
			});
			break;
		case "update":
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
		case "dalamudtesting":
			responses.push({
				"embed": {
					"title": `Only use Dalamud Testing when required`,
					"description": `Please only enable Dalamud test builds when absolutely needed.`
						+ `[More info](https://discord.com/channels/581875019861328007/586590269063954432/780471778152546314)`,
					"color": client.config.EMBED_NORMAL_COLOR,
					"footer": {
						"text": client.config.FRANZBOT_VERSION,
					},
				},
			});
			break;
		case "vpn":
			responses.push({
				"embed": {
					"title": `SE's routing is shit. Use a VPN`,
					"description": `If the auth fails for XL and the Official Launcher, it's likely a bad route from your connecto to Japan. A VPN may help.`
						+ `[More info](https://discord.com/channels/581875019861328007/586590269063954432/778784841201221632)`,
					"color": client.config.EMBED_NORMAL_COLOR,
					"footer": {
						"text": client.config.FRANZBOT_VERSION,
					},
				},
			});
			break;
		case "logd":
			responses.push({
				"embed": {
					"title": `Please send us your dalamud.txt log`,
					"description": `Please send us the log file \`%appdata%\\XIVLauncher\\addon\\Hooks\\dalamud.txt\` in this channel, so we can look into the problem!`,
					"color": client.config.EMBED_NORMAL_COLOR,
					 "footer": {
						"text": client.config.FRANZBOT_VERSION,
					},
				},
			});
			break;
		case "logxl":
			responses.push({
				"embed": {
					"title": `Please send us your output.log file`,
					"description": `Please send us the log file \`%appdata%\\XIVLauncher\\output.log\` in this channel, so we can look into the problem!`,
					"color": client.config.EMBED_NORMAL_COLOR,
					"footer": {
						"text": client.config.FRANZBOT_VERSION,
					},
				},
			});
			break;
		case "removeplugin":
			responses.push({
				"embed": {
					"title": `Generic steps to remove plugins manually`,
					"description": `General "how to delete a plugin" steps:\n`
						+ `1. Close the game\n`
						+ `2. Go to \`%AppData%\\XIVLauncher\\installedPlugins\`\n`
						+ `3. Remove the folder[s] for the plugin[s]\n`
						+ `4. Start the game now\n`
						+ `5. Let us know if the issue persists`,
					"color": client.config.EMBED_NORMAL_COLOR,
					"footer": {
						"text": client.config.FRANZBOT_VERSION,
					},
				},
			});
			break;
		case "removedalamud":
			responses.push({
				"embed": {
					"title": `Generic steps to remove/reinstall Dalamud`,
					"description": `General "how to delete a plugin" steps:\n`
						+ `1. Close the game\n`
						+ `2. Go to \`%AppData%\\XIVLauncher\`\n`
						+ `3. Remove the Addon\Hooks folder\n`
						+ `4. Start the game now\n`
						+ `5. Let us know if the issue persists`,
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
