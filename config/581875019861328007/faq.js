// Goatplace //
/* eslint-disable no-fallthrough */
/* eslint-disable max-len */
exports.run = async (client, message, args) => {
	if (args.length < 1) {
		args = ["help"];
	}
	else if (args.length >= 2) {
		args = [args.join("")]; // watch this magic shite
	}
	console.log(`FAQ command found in TestTriggers: ${message.channel.name}`);
	const responses = [];

	switch (args[0]) {
		// aliases
		case "accountcreds": args[0] = "account"; break;
		case "accountcredentials": args[0] = "account"; break;
		case "creds": args[0] = "account"; break;
		case "credentials": args[0] = "account"; break;
		case "savedcreds": args[0] = "account"; break;
		case "savedcredentials": args[0] = "account"; break;
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
		// case "jobicon": args[0] = "oldplugins"; break;
		// case "jobicons": args[0] = "oldplugins"; break;
		case "chatextender": args[0] = "oldplugins"; break;
		case "dalamudstaging": args[0] = "dalamudtesting"; break;
		case "testdalamud": args[0] = "dalamudtesting"; break;
		case "dt": args[0] = "dalamudtesting"; break;
		case "badplugin": args[0] = "removeplugin"; break;
		case "deleteplugin": args[0] = "removeplugin"; break;
		case "deletedalamud": args[0] = "removedalamud"; break;
		case "baddalamud": args[0] = "removedalamud"; break;
		case "reinstalldalamud": args[0] = "removedalamud"; break;
		case "badconfig": args[0] = "removeconfig"; break;
		case "deleteconfig": args[0] = "removeconfig"; break;
		case "pluginconfig": args[0] = "removeconfig"; break;
		case "gameinstall": args[0] = "gamepath"; break;
		case "steampath": args[0] = "gamepath"; break;
		case "steaminstall": args[0] = "gamepath"; break;
		case "path": args[0] = "gamepath"; break;
		case "ffxivpath": args[0] = "gamepath"; break;
		case "ffxivinstall": args[0] = "gamepath"; break;
		case "exploits": args[0] = "exploit"; break;
		case "log": args[0] = "logxl"; break;
		case "launcherlog": args[0] = "logxl"; break;
		case "xivlauncherlog": args[0] = "logxl"; break;
		case "logs": args[0] = "logxl"; break;
		case "xllog": args[0] = "logxl"; break;
		case "logdalamud": args[0] = "logd"; break;
		case "dalamudlog": args[0] = "logd"; break;
		case "dlog": args[0] = "logd"; break;
		case "logdl": args[0] = "logd"; break; // just for Aireil
		case "xldev": args[0] = "dev"; break;
		case "xivlauncherdev": args[0] = "dev"; break;
		case "dalamuddev": args[0] = "dev"; break;
		case "plugindev": args[0] = "dev"; break;
		case "development": args[0] = "dev"; break;
		case "xldevelopment": args[0] = "dev"; break;
		case "xivlauncherdevelopment": args[0] = "dev"; break;
		case "dalamuddevelopment": args[0] = "dev"; break;
		case "plugindevelopment": args[0] = "dev"; break;
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
							"value": "account av antivirus badconfig badplugin bsod credes credentials dalamudtesting dalamudsettings "
								+ "deleteconfig deletedalamud deleteplugin dns env exploit ffxivpath ffxivinstall log logd logdalamud "
								+ "gamepath gameinstall logxl maintenance migrate patch plugins reinstalldalamud removeconfig removedalamud "
								+ "reshade removeplugin steam steampath steaminstall testplugins uninstall update xlhelp",
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
					"description": `The integrity check feature supports up to patch 5.45 Hotfix.`,
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
					"title": `OpCodes need to be manually updated each patch.`,
					"description": `OpCode information is updated separately from Dalamud. Chances are you just need to relaunch if `
					+ `they've been updated since your last launch. \n\n More Info ` 
					+ ` [HERE](https://github.com/goatcorp/faq/blob/main/xl_troubleshooting.md#how-do-i-fix-plugins-that-rely-on-dalamud-provided-opcodes)`,
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
					"description": `Please check if you have other programs modifying FFXIV. More details [HERE](https://github.com/goatcorp/faq/blob/main/xl_troubleshooting.md#q-how-come-the-in-game-addon-dalamud-doesnt-work-andor-plugins-dont-display)`,
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
					"description": `You can find a list of popular, but not updated plugins and their status [Here](https://discord.com/channels/581875019861328007/586590269063954432/773367448359403550)`,
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
					"description": `Instructions can be found [HERE](https://github.com/goatcorp/faq/blob/main/xl_troubleshooting.md#q-how-do-i-uninstall-xiv-launcher)`,
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
					"description": `Please only enable Dalamud test builds when absolutely needed. It's not secret hidden features. Expect crashes and failed launches and for it to ruin your raid night. More Info `
						+ `[HERE](https://discord.com/channels/581875019861328007/586590269063954432/780471778152546314)`,
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
					"description": `If you're getting consistent login or patch fail downloads on both XL and the Official Launcher,`
						+ ` it's likely a bad route from your connection. A VPN may help you bypass the issue.`
						+ `[More info](https://discord.com/channels/581875019861328007/586590269063954432/778784841201221632)`,
					"color": client.config.EMBED_NORMAL_COLOR,
					"footer": {
						"text": client.config.FRANZBOT_VERSION,
					},
				},
			});
			break;
		case "wtfast":
			responses.push({
				"embed": {
					"title": `WTFast Configuration for XIVLauncher`,
					"description": `You can find details on how to configure WTFast to work with xivlauncher `
						+ `[here](https://discord.com/channels/581875019861328007/586590269063954432/795090328306188308)`,
					"color": client.config.EMBED_NORMAL_COLOR,
					"footer": {
						"text": client.config.FRANZBOT_VERSION,
					},
				},
			});
			break;
		case "rtssdelay":
			responses.push({
				"embed": {
					"title": `Injection delay for RivaTuner/RTSS`,
					"description": `Please follow steps listed in the FAQ `
						+ `[here](https://discord.com/channels/581875019861328007/586590269063954432/799735514517209149)`,
					"color": client.config.EMBED_NORMAL_COLOR,
					"footer": {
						"text": client.config.FRANZBOT_VERSION,
					},
				},
			});
			break;
		case "migrate":
			responses.push({
				"embed": {
					"title": `Migrating FFXIV or XIVLauncher?`,
					"description": `The main FFXIV installation folder is entirely portable. You can freely move/copy it `
						+ `between different locations as long as your computer has all redistributables needed to run it.\n\n`
						+ `XIVLauncher on the other hand is *technically* portable, but we recommend only copying plugin configuration `
						+ `accross different computers as the launcher/dalamud settings should stay machine-specific and you should `
						+ `**NEVER** copy your installed plugins. (Users who know enough should know better)\n\n`
						+ `The Linux FAQ post for this can be found `
						+ `[here](https://discord.com/channels/581875019861328007/586590269063954432/810235090261114910)`
						+ `The Windows FAQ post for this can be found `
						+ `[here](https://discord.com/channels/581875019861328007/586590269063954432/810237271462772776)`,
					"color": client.config.EMBED_NORMAL_COLOR,
					"footer": {
						"text": client.config.FRANZBOT_VERSION,
					},
				},
			});
			break;
		case "gamepath":
			responses.push({
				"embed": {
					"title": `Please check your gamepath in xivlauncher`,
					"description": `XIVLauncher requires a working installation of the FFXIV game client, or it will install one for you. `
						+ `On first install, XIVLauncher will try to autoselect your FFXIV install for you, based on the default `
						+ `launcher's installation location and common Steam locations.\n\nFor more information, see `
						+ `[here](https://discord.com/channels/581875019861328007/586590269063954432/803745635231596544)`,
					"color": client.config.EMBED_NORMAL_COLOR,
					"footer": {
						"text": client.config.FRANZBOT_VERSION,
					},
				},
			});
			break;
		case "exploit":
			responses.push({
				"embed": {
					"title": `Please do not discuss exploits here`,
					"description": `Per the [Server Rules](https://discord.com/channels/581875019861328007/585958820061249537/586214664954707968), `
						+ `This server **is *not* intended for exploit development of discussion** or finding bugs in the game that could be abused, be they `
						+ `visual or gameplay-relevant. Especially if the bug is something that is visible to other players. `
						+ `Please refrain from discussing these topics here, no matter how inconsequential the bug may be.`,
					"color": client.config.EMBED_NORMAL_COLOR,
					"footer": {
						"text": client.config.FRANZBOT_VERSION,
					},
				},
			});
			break;
		case "dssenh":
			responses.push({
				"embed": {
					"title": `SSL/TLS issues on wine?`,
					"description": `If you're running into SSL/TLS issues while using Wine/Lutris, this may `
						+ `be part of recent changes to your distro's SSL configuration. Especially on newer `
						+ `distributions. \n\nSee the FAQ for more details `
						+ `[HERE](https://discord.com/channels/581875019861328007/586590269063954432/820419977001697320)`,
					"color": client.config.EMBED_NORMAL_COLOR,
					"footer": {
						"text": client.config.FRANZBOT_VERSION,
					},
				},
			});
			break;
		case "dev":
			responses.push({
				"embed": {
					"title": `Developer Resources`,
					"description": `The primary developer resources should all be on their relevant GitHub pages `
						+ `but for some quick links to a few common resources, see our FAQ post `
						+ `[HERE](https://discord.com/channels/581875019861328007/586590269063954432/824039234100658197)`,
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
					"title": `Please send us your dalamud.log file`,
					"description": `Please send us your **dalamud.log** log file from `
						+ `\`%appdata%\\XIVLauncher\\\` in this channel, so we can look into the problem!`
						+ `\n\nIt's best to just upload/attach the file if you can!`
						+ `\n\n**DISCLAIMER**:This log will contain your computer username. `
						+ `If you're not comfortable posting that here, you can `
						+ `open the file in a text editor to redact that information first or `
						+ `you can send it to Franzbot to relay to a private admin channel for processing.\n`
						+ `__Please upload the file directly. Even if you have Nitro, please make sure it's under 5.0 MB.__`,
					"color": client.config.EMBED_NORMAL_COLOR,
					"image": {
						"url": "https://cdn.discordapp.com/attachments/687530726756712478/810897701864210472/explorer_2021-02-08_19-20-41.png",
					},
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
					"description": `Please send us your **output.log** log file from `
						+ `\`%appdata%\\XIVLauncher\\\` in this channel, so we can look into the problem!`
						+ `\n\nIt's best to just upload/attach the file if you can!`
						+ `\n\n**DISCLAIMER**:This log will contain your ffxiv username[s]. `
						+ `If you're not comfortable posting that here, you can `
						+ `open the file in a text editor to redact that information first or `
						+ `you can send it to Franzbot to relay to a private admin channel for processing.\n`
						+ `__Please upload the file directly. Even if you have Nitro, please make sure it's under 5.0 MB.__`,
					"color": client.config.EMBED_NORMAL_COLOR,
					"image": {
						"url": "https://cdn.discordapp.com/attachments/687530726756712478/810897701864210472/explorer_2021-02-08_19-20-41.png",
					},
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
						+ `1. Close the game and xivlauncher\n`
						+ `2. Go to \`%AppData%\\XIVLauncher\\installedPlugins\`\n`
						+ `3. Remove the folder[s] for the plugin[s]\n`
						+ `4. Start the game now\n`
						+ `5. Let us know if the issue persists`
						+ `\n\nEXPERIMENTAL: You can also now delete a plugin from xivlauncher before`
						+ ` logging in. While this should work, it hasn't been tested extensively yet.`,
					"color": client.config.EMBED_NORMAL_COLOR,
					"image": {
						"url": "https://cdn.discordapp.com/attachments/687530726756712478/810897701864210472/explorer_2021-02-08_19-20-41.png",
					},
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
						+ `1. Close the game and xivlauncher\n`
						+ `2. Go to \`%AppData%\\XIVLauncher\`\n`
						+ `3. Remove the Addon\\Hooks folder\n`
						+ `4. Start the game now\n`
						+ `5. Let us know if the issue persists`,
					"color": client.config.EMBED_NORMAL_COLOR,
					"image": {
						"url": "https://cdn.discordapp.com/attachments/687530726756712478/810897701864210472/explorer_2021-02-08_19-20-41.png",
					},
					"footer": {
						"text": client.config.FRANZBOT_VERSION,
					},
				},
			});
			break;
		case "removeconfig":
			responses.push({
				"embed": {
					"title": `Generic steps to remove a plugin's config`,
					"description": `General "how to delete a plugin's config" steps:\n`
						+ `1. Close the game and xivlauncher\n`
						+ `2. Go to \`%AppData%\\XIVLauncher\\pluginConfigs\`\n`
						+ `3. Remove the offending config files\n`
						+ `4. Start the game now\n`
						+ `5. Let us know if the issue persists`,
					"color": client.config.EMBED_NORMAL_COLOR,
					"image": {
						"url": "https://cdn.discordapp.com/attachments/687530726756712478/810897701864210472/explorer_2021-02-08_19-20-41.png",
					},
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
					"description": `Please check your spelling or use \`f!faq help\`.\n\n`
						+ `Franzbot does not contain FAQs for plugins. Please poke the plugin maintainer in `
						+ `<#684745859497590843>, <#719513457988337724>, or `
						+ `make an issue on their github repo if you have a question about a specific plugin. `,
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
