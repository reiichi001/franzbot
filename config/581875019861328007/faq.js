// Goatplace //
/* eslint-disable no-fallthrough */
/* eslint-disable max-len */
exports.run = async (client, message, args) => {
	if (args.length < 1) {
		args = ["help"];
	}
	else if (args.length >= 2) {
		args = [args.join("").toLowerCase()]; // watch this magic shite
	}
	console.log(`FAQ command found in TestTriggers: ${message.channel.name}`);
	const responses = [];

	switch (args[0]) {
		// aliases
		case "log": args[0] = "logxl"; break;
		case "launcherlog": args[0] = "logxl"; break;
		case "xivlauncherlog": args[0] = "logxl"; break;
		case "logs": args[0] = "logxl"; break;
		case "xllog": args[0] = "logxl"; break;
		case "logdalamud": args[0] = "logd"; break;
		case "dalamudlog": args[0] = "logd"; break;
		case "dlog": args[0] = "logd"; break;
		case "logdl": args[0] = "logd"; break; // just for Aireil
		case "aria": args[0] = "loga"; break;
		case "logaria": args[0] = "loga"; break;
		case "arialog": args[0] = "loga"; break;
		case "logdownload": args[0] = "loga"; break;
		case "downloadlog": args[0] = "loga"; break;
		case "downloaderlog": args[0] = "loga"; break;
		case "squirrellog": args[0] = "logsq"; break;
		case "logsq": args[0] = "logsq"; break;
		case "logsquirrel": args[0] = "logsq"; break;
		case "linuxlog": args[0] = "linuxlogxl"; break;
		case "linuxlauncherlog": args[0] = "linuxlogxl"; break;
		case "linuxxivlauncherlog": args[0] = "linuxlogxl"; break;
		case "linuxlogs": args[0] = "linuxlogxl"; break;
		case "linuxxllog": args[0] = "linuxlogxl"; break;
		case "loglinux": args[0] = "linuxlogxl"; break;
		case "logslinux": args[0] = "linuxlogxl"; break;
		case "logxllinux": args[0] = "linuxlogxl"; break;
		case "linuxlogdalamud": args[0] = "linuxlogd"; break;
		case "linuxdalamudlog": args[0] = "linuxlogd"; break;
		case "linuxdlog": args[0] = "linuxlogd"; break;
		case "linuxlogdl": args[0] = "linuxlogd"; break; // just for Aireil
		case "logdlinux": args[0] = "linuxlogd"; break;
		case "dalamudloglinux": args[0] = "linuxlogd"; break;
		case "logdalamudlinux": args[0] = "linuxlogd"; break;
		case "dloglinux": args[0] = "linuxlogd"; break;
		case "linuxloga": args[0] = "loga"; break;
		case "linuxlogaria": args[0] = "loga"; break;
		case "logalinux": args[0] = "loga"; break;
		case "arialoglinux": args[0] = "loga"; break;
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
		case "redists ": args[0] = "redist"; break;
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
		case "reinstall": args[0] = "uninstall"; break;
		case "cleaninstall": args[0] = "uninstall"; break;
		case "rivatuner": args[0] = "rtss"; break;
		case "msiafterburner": args[0] = "rtss"; break;
		case "afterburner": args[0] = "rtss"; break;
		case "mactype": args[0] = "rtss"; break;
		case "hookfail": args[0] = "rtss"; break;
		case "dns": args[0] = "vpn"; break;
		case "oldplugin": args[0] = "oldplugins"; break;
		case "chatextender": args[0] = "oldplugins"; break;
		case "voidlist": args[0] = "oldplugins"; break;
		case "staging": args[0] = "dalamudtesting"; break;
		case "dalamudstaging": args[0] = "dalamudtesting"; break;
		case "testdalamud": args[0] = "dalamudtesting"; break;
		case "dt": args[0] = "dalamudtesting"; break;
		case "badplugin": args[0] = "removeplugin"; break;
		case "deleteplugin": args[0] = "removeplugin"; break;
		case "deleteplugins": args[0] = "removeplugin"; break;
		case "removeplugins": args[0] = "removeplugin"; break;
		case "deletedalamud": args[0] = "removedalamud"; break;
		case "baddalamud": args[0] = "removedalamud"; break;
		case "reinstalldalamud": args[0] = "removedalamud"; break;
		case "badconfig": args[0] = "removeconfig"; break;
		case "deleteconfig": args[0] = "removeconfig"; break;
		case "deletepluginconfig": args[0] = "removeconfig"; break;
		case "pluginconfig": args[0] = "removeconfig"; break;
		case "gameinstall": args[0] = "gamepath"; break;
		case "steampath": args[0] = "gamepath"; break;
		case "steaminstall": args[0] = "gamepath"; break;
		case "path": args[0] = "gamepath"; break;
		case "ffxivpath": args[0] = "gamepath"; break;
		case "ffxivinstall": args[0] = "gamepath"; break;
		case "exploits": args[0] = "exploit"; break;
		case "xldev": args[0] = "dev"; break;
		case "xivlauncherdev": args[0] = "dev"; break;
		case "dalamuddev": args[0] = "dev"; break;
		case "plugindev": args[0] = "dev"; break;
		case "development": args[0] = "dev"; break;
		case "xldevelopment": args[0] = "dev"; break;
		case "xivlauncherdevelopment": args[0] = "dev"; break;
		case "dalamuddevelopment": args[0] = "dev"; break;
		case "plugindevelopment": args[0] = "dev"; break;
		case "deleteffxiv": args[0] = "repair"; break;
		case "repairffxiv": args[0] = "repair"; break;
		case "deletegame": args[0] = "repair"; break;
		case "repairgame": args[0] = "repair"; break;
		case "versioncheck": args[0] = "vercheck"; break;
		case "versionfail": args[0] = "vercheck"; break;
		case "bootcheck": args[0] = "vercheck"; break;
		case "ffxivboot": args[0] = "vercheck"; break;
		case "badui": args[0] = "dalamudui"; break;
		case "missingui": args[0] = "dalamudui"; break;
		case "textool": args[0] = "textools"; break;
		case "eventlog": args[0] = "eventviewer"; break;
		case "migration": args[0] = "migrate"; break;
		case "oldlinux": args[0] = "migrate"; break;
		case "oldwindows": args[0] = "migrate"; break;
		case "linuxmove": args[0] = "migrate"; break;
		case "windowsmove": args[0] = "migrate"; break;
		case "linuxmigrate": args[0] = "migrate"; break;
		case "windowsmigrate": args[0] = "migrate"; break;
		case "linuxmigration": args[0] = "migrate"; break;
		case "windowsmigration": args[0] = "migrate"; break;
		case "linuxconfig": args[0] = "migrate"; break;
		case "windowsconfig": args[0] = "migrate"; break;
		case "linuxsettings": args[0] = "migrate"; break;
		case "windowssettings": args[0] = "migrate"; break;
		case "linuxfiles": args[0] = "migrate"; break;
		case "windowsfiles": args[0] = "migrate"; break;
		case "migratelinux": args[0] = "migrate"; break;
		case "migratewindows": args[0] = "migrate"; break;
		case "security": args[0] = "safety"; break;
		case "safe": args[0] = "safety"; break;
		case "safeness": args[0] = "safety"; break;
		case "secure": args[0] = "safety"; break;
		case "rl": args[0] = "ratelimits"; break;
		case "rate": args[0] = "ratelimits"; break;
		case "ratelimit": args[0] = "ratelimits"; break;
		default: break;
	}

	// make ESLint happy
	const windowsExplorerScreenshot = "https://cdn.discordapp.com/attachments/687530726756712478/810897701864210472/explorer_2021-02-08_19-20-41.png";

	switch (args[0]) {
		case "help":
			responses.push({
				title: "Franzbot FAQ",
				description: `Supported FAQ commands listed below. Type \`${client.config.prefix}faq <topic>\` to display the content.`,
				color: client.config.EMBED_NORMAL_COLOR,
				footer: {
					"text": client.config.FRANZBOT_VERSION,
				},
				fields: [
					{
						"name": "Known Issues posts",
						"value": "dotnet dotnet48 hookfail integrity mactype opcode redist rivatuner rtss runtimes vcredist",
					},
					{
						"name": "FAQs and Help posts",
						"value": "account aria av antivirus badconfig badplugin badui bsod creds credentials dalamudstaging "
								+ "dalamudtesting dalamudsettings "
								+ "deleteconfig deletedalamud deleteplugin dns env exploit ffxivpath ffxivinstall "
								+ "log loga logaria logd logdalamud logxl"
								+ "gamepath gameinstall maintenance migrate missingui patch plugins "
								+ "ratelimit reinstalldalamud removeconfig removedalamud "
								+ "removeplugin repair repairffxiv repairgame reshade staging steam steampath steaminstall "
								+ "testplugins textools uninstall vercheck versioncheck update xlhelp",
					},
				],
			});
			break;
			// template
		/*
		case "KEYWORD":
			responses.push({
					title: `TITLE`,
					description: `DESC`,
					color: client.config.EMBED_NORMAL_COLOR,
					footer: {
						"text": client.config.FRANZBOT_VERSION,
					},
			});
			break;
		*/
		// KNOWN ISSUES
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
		case "safety":
			responses.push({
				title: `Are XIVLauncher, Dalamud, and Dalamud Plugins safe to use?`,
				description: `For the most part, yes, this should be safe to use. We've taken steps to `
						+ `ensure that using XIVLauncher, Dalamud, and **officially supported** `
						+ `Dalamud Plugins should not result in invalid or unexpected behavior.`
						+ `\n\nLike other game modifictions, you shouldn't talk about using it in-game and should exercise `
						+ `caution over which plugins you use. XIVLauncher and Dalamud are not designed `
						+ `for game exploitation, automation, or botting.`
						+ `\n\nTo the best of our knowledge, SE does not check for or prevent the usage of `
						+ `third party tools, but they are against the terms of service.`
						+ `\n\nPlease note that we cannot vouch for the safety of third party plugins.`
						+ `\n\nIf you'd like more information, please see the <#585958820061249537> channel and our FAQ post `
						+ `[HERE](https://goatcorp.github.io/faq/xl_troubleshooting#q-are-xivlauncher-dalamud-and-dalamud-plugins-safe-to-use)`,
				color: client.config.EMBED_NORMAL_COLOR,
				footer: {
					"text": client.config.FRANZBOT_VERSION,
				},
			});
			break;
		case "dalamudui":
			responses.push({
				title: `How do I reset dalamud/plugin window locations?`,
				description: `Please see our FAQ with steps `
					+ `[HERE](https://goatcorp.github.io/faq/dalamud_troubleshooting#q-how-do-i-reset-dalamudplugin-window-locations)`,
				color: client.config.EMBED_NORMAL_COLOR,
				footer: {
					"text": client.config.FRANZBOT_VERSION,
				},
			});
			break;
		case "textools":
			responses.push({
				title: `Updating FFXIV with TexTools mods still applied can lead to crashes`,
				description: `We recommend you check with the TexTools discord on this.\n\n`
					+ `Our suggested steps are to disable all mods and start over. \n\n`
					+ `More Info: [HERE](https://goatcorp.github.io/faq/xl_troubleshooting#q-i-updated-my-game-with-textools-mods-installed-how-do-i-fix-crashes)`,
				color: client.config.EMBED_NORMAL_COLOR,
				footer: {
					"text": client.config.FRANZBOT_VERSION,
				},
			});
			break;
		case "vercheck":
			responses.push({
				title: `How do I fix a version check error when trying to update FFXIV?`,
				description: `You'll need to make an edit to your FFXIVBOOT.cfg file.`
					+ `More Info: [HERE](https://goatcorp.github.io/faq/xl_troubleshooting#q-how-do-i-fix-a-version-check-error-when-trying-to-update-ffxiv
						)`,
				color: client.config.EMBED_NORMAL_COLOR,
				footer: {
					"text": client.config.FRANZBOT_VERSION,
				},
			});
			break;
		case "repair":
			responses.push({
				title: `Can I repair my FFXIV installation?`,
				description: `Yes, in the sense that you can reinstall the game. `
						+ `But it can be reinstalled selectively to help cut down on download/install time if needed.\n\n`
						+ `More Info: [HERE](https://goatcorp.github.io/faq/xl_troubleshooting#q-can-i-repair-my-ffxiv-installation)`,
				color: client.config.EMBED_NORMAL_COLOR,
				footer: {
					"text": client.config.FRANZBOT_VERSION,
				},
			});
			break;
		case "integrity":
			responses.push({
				title: `XIVLauncher integrity check`,
				description: `The integrity check feature supports up to patch 5.45 Hotfix.\n\n`
					+ `To run the check, open XIVLauncher, click the settings cog ⚙️, and select the Game tab. It will have a button.\n\n`
					+ `__If your client has been modded via TexTools, the integrity check will fail.__`,
				image: {
					"url": "https://cdn.discordapp.com/attachments/687530726756712478/828741457862197278/HvFDn.png",
				},
				color: client.config.EMBED_NORMAL_COLOR,
				footer: {
					"text": client.config.FRANZBOT_VERSION,
				},
			});
			break;
		case "opcode":
			responses.push({
				title: `OpCodes need to be manually updated each patch.`,
				description: `OpCode information is updated separately from Dalamud. Chances are you just need to relaunch if `
					+ `they've been updated since your last launch. \n\n More Info `
					+ `[HERE](https://goatcorp.github.io/faq/xl_troubleshooting#q-how-do-i-fix-plugins-that-rely-on-dalamud-provided-opcodes)`,
				color: client.config.EMBED_NORMAL_COLOR,
				footer: {
					"text": client.config.FRANZBOT_VERSION,
				},
			});
			break;
		case "redist":
			responses.push({
				title: `XL Requires these redistributables`,
				description: `Please make sure you've installed DirectX, .Net 4.8, and VS2015-2019 packages. More info `
					+ `[HERE](https://goatcorp.github.io/faq/xl_troubleshooting#q-how-can-i-fix-crashes-on-startup)`,
				color: client.config.EMBED_NORMAL_COLOR,
				footer: {
					"text": client.config.FRANZBOT_VERSION,
				},
			});
			break;
		case "rtss":
			responses.push({
				title: `Plugin GUI does not load`,
				description: `Please check if you have other programs modifying FFXIV. More details `
					+ `[HERE](https://goatcorp.github.io/faq/xl_troubleshooting#q-how-come-the-in-game-addon-dalamud-doesnt-work-andor-plugins-dont-display)`,
				color: client.config.EMBED_NORMAL_COLOR,
				footer: {
					"text": client.config.FRANZBOT_VERSION,
				},
			});
			break;
		case "oldplugins":
			responses.push({
				title: `This plugin needs to be updated for the current client`,
				description: `You can find a list of popular, but not updated plugins and their status `
					+ `[HERE](https://goatcorp.github.io/faq/dalamud_troubleshooting#q-outdated-plugins-list)`,
				color: client.config.EMBED_NORMAL_COLOR,
				footer: {
					"text": client.config.FRANZBOT_VERSION,
				},
			});
			break;

		// FAQs and Help
		case "account":
			responses.push({
				title: `XL Saved Credentials`,
				description: `Having an issue with saved credentials or your FFXIV Account? See `
					+ `[HERE](https://goatcorp.github.io/faq/xl_troubleshooting#q-xiv-isnt-saving-my-new-password--how-do-i-clear-my-saved-password)`,
				color: client.config.EMBED_NORMAL_COLOR,
				footer: {
					"text": client.config.FRANZBOT_VERSION,
				},
			});
			break;
		case "av":
			responses.push({
				title: `Please whitelist or make AV exceptions for XIV Launcher`,
				description: `Details can be found `
					+ `[HERE](https://goatcorp.github.io/faq/xl_troubleshooting#q-how-do-i-whitelist-xivlauncher-and-dalamud-so-my-antivirus-leaves-them-alone)`,
				color: client.config.EMBED_NORMAL_COLOR,
				footer: {
					"text": client.config.FRANZBOT_VERSION,
				},
			});
			break;
		case "bsod":
			responses.push({
				title: `I think XIV Launcher is giving me a Blue Screen of Death`,
				description: `It's probably not XL's fault. But if you really think it is, please answer the questions `
					+ `[HERE](https://goatcorp.github.io/faq/xl_troubleshooting#q-i-think-xivlauncher-is-giving-me-a-blue-screen-of-death-what-information-would-help-narrow-this-down)`,
				color: client.config.EMBED_NORMAL_COLOR,
				footer: {
					"text": client.config.FRANZBOT_VERSION,
				},
			});
			break;
		case "dalamudsettings":
			responses.push({
				title: `How do I turn Plugin Testing on or off?`,
				description: `See [HERE](https://goatcorp.github.io/faq/dalamud_troubleshooting#How do I turn Plugin Testing on or off?)`,
				color: client.config.EMBED_NORMAL_COLOR,
				footer: {
					"text": client.config.FRANZBOT_VERSION,
				},
			});
			break;
		case "env":
			responses.push({
				title: `XL Environment Variables`,
				description: `You can find the post on XL environment variables `
					+ `[HERE](https://goatcorp.github.io/faq/xl_troubleshooting#q-xl-environment-variables)`,
				color: client.config.EMBED_NORMAL_COLOR,
				footer: {
					"text": client.config.FRANZBOT_VERSION,
				},
			});
			break;
		case "xlhelp":
			responses.push({
				title: ` What is the command for <insert plugin here>? `,
				description: `Please type \`xlhelp\` in game, more information `
					+ `[HERE](https://goatcorp.github.io/faq/dalamud_troubleshooting#q-what-is-the-command-for-insert-plugin-here)`,
				color: client.config.EMBED_NORMAL_COLOR,
				footer: {
					"text": client.config.FRANZBOT_VERSION,
				},
			});
			break;
		case "maintenance":
			responses.push({
				title: `Please wait for Dalamud and Plugin updates after a patch`,
				description: ``,
				color: client.config.EMBED_NORMAL_COLOR,
				footer: {
					"text": client.config.FRANZBOT_VERSION,
				},
			});
			break;
		case "plugins":
			responses.push({
				title: `I get an error message when trying to install/update/disable a plugin`,
				description: `See [HERE](https://goatcorp.github.io/faq/dalamud_troubleshooting#q-i-get-an-error-message-when-trying-to-installupdatedisable-a-plugin)`,
				color: client.config.EMBED_NORMAL_COLOR,
				footer: {
					"text": client.config.FRANZBOT_VERSION,
				},
			});
			break;
		case "reshade":
			responses.push({
				title: `Reshade/Gshade/Stormshade/etc not working?`,
				description: `Please check the faq post `
					+ `[HERE](https://goatcorp.github.io/faq/dalamud_troubleshooting#q-reshade-and-its-variants-dont-work-or-dalamud-ui-fails)`,
				color: client.config.EMBED_NORMAL_COLOR,
				footer: {
					"text": client.config.FRANZBOT_VERSION,
				},
			});
			break;
		case "steam":
			responses.push({
				title: `What are the Steam options for?`,
				description: `For detail on Steam Integration and Steam Service Account, see `
					+ `[HERE](https://goatcorp.github.io/faq/xl_troubleshooting#q-why-do-people-keep-asking-about-steam-so-much)`,
				color: client.config.EMBED_NORMAL_COLOR,
				footer: {
					"text": client.config.FRANZBOT_VERSION,
				},
			});
			break;
		case "uninstall":
			responses.push({
				title: `How do I uninstall XIV Launcher?`,
				description: `Instructions can be found [HERE](https://goatcorp.github.io/faq/xl_troubleshooting#q-how-do-i-uninstall-xiv-launcher)`,
				color: client.config.EMBED_NORMAL_COLOR,
				footer: {
					"text": client.config.FRANZBOT_VERSION,
				},
			});
			break;
		case "update":
			responses.push({
				title: `Please wait for Dalamud and Plugin updates after a patch`,
				description: `XIVLauncher should work just fine after a patch.\n\nDalamud and plugins will need to be updated.\n\nMore Info `
						+ `[HERE](https://goatcorp.github.io/faq/xl_troubleshooting#q-do-not-expect-dalamud-andor-plugins-to-work-on-updatespatch-day-releases)`,
				color: client.config.EMBED_NORMAL_COLOR,
				footer: {
					"text": client.config.FRANZBOT_VERSION,
				},
			});
			break;
		case "dalamudtesting":
			responses.push({
				title: `Only use Dalamud Testing when required`,
				description: `Please only enable Dalamud test builds when absolutely needed. It's not secret hidden features. Expect crashes and failed launches and for it to ruin your raid night. More Info `
						+ `[HERE](https://goatcorp.github.io/faq/dalamud_troubleshooting#q-how-do-i-turn-dalamud-staging-on-or-off)`,
				color: client.config.EMBED_NORMAL_COLOR,
				footer: {
					"text": client.config.FRANZBOT_VERSION,
				},
			});
			break;
		case "plugintesting":
			responses.push({
				title: `How to enable Plugin Testing`,
				description: `General "how to enable plugin test builds" steps:\n`
					+ `1. Type \`/xlsettings\` in game.\n`
					+ `2. Go to the \`Experimental\` tab\n`
					+ `3. Click the checkbox for \`Get plugin testing builds\`\n`
					+ `4. Save / Save and Close\n`
					+ `\n`
					+ `**Please note that testing plugins can/will have bugs and may change dramatically before final release. Especially on newer plugins, they could crash your game. `
					+ `For troubleshooting, please keep questions/comments/issues in the <#719513457988337724> channel.**`
					+ `[HERE](https://goatcorp.github.io/faq/dalamud_troubleshooting#q-how-do-i-enable-plugin-test-builds)`,
				color: client.config.EMBED_NORMAL_COLOR,
				footer: {
					"text": client.config.FRANZBOT_VERSION,
				},
			});
			break;
		case "vpn":
			responses.push({
				title: `SE's routing is shit. Use a VPN`,
				description: `If you're getting consistent login or patch fail downloads on both XL and the Official Launcher, `
						+ `it's likely a bad route from your connection. A VPN may help you bypass the issue.`
						+ `[More info](https://goatcorp.github.io/faq/xl_troubleshooting#q-the-launcher-shows-a-red-world-icon-and-an-error-message-when-trying-to-log-in-and-the-official-launcher-doesnt-open)`,
				color: client.config.EMBED_NORMAL_COLOR,
				footer: {
					"text": client.config.FRANZBOT_VERSION,
				},
			});
			break;
		case "wtfast":
			responses.push({
				title: `WTFast Configuration for XIVLauncher`,
				description: `You can find details on how to configure WTFast to work with xivlauncher `
						+ `[HERE](https://goatcorp.github.io/faq/xl_troubleshooting#q-wtfast-config)`,
				color: client.config.EMBED_NORMAL_COLOR,
				footer: {
					"text": client.config.FRANZBOT_VERSION,
				},
			});
			break;
		case "rtssdelay":
			responses.push({
				title: `Injection delay for RivaTuner/RTSS`,
				description: `Please follow steps listed in the FAQ `
						+ `[HERE](https://goatcorp.github.io/faq/xl_troubleshooting#q-how-to-set-an-injection-delay-in-rivatunerrtss)`,
				color: client.config.EMBED_NORMAL_COLOR,
				footer: {
					"text": client.config.FRANZBOT_VERSION,
				},
			});
			break;
		case "migrate":
			responses.push({
				title: `Migrating FFXIV or XIVLauncher?`,
				description: `The main FFXIV installation folder is entirely portable. You can freely move/copy it `
						+ `between different locations as long as your computer has all redistributables needed to run it.\n\n`
						+ `XIVLauncher on the other hand is *technically* portable, but we recommend only copying plugin configuration `
						+ `accross different computers as the launcher/dalamud settings should stay machine-specific and you should `
						+ `**NOT** copy your installed plugins. (Users who know enough should know better)\n\n`
						+ `The Linux FAQ post for this can be found `
						+ `[HERE](https://goatcorp.github.io/faq/xl_troubleshooting#q-how-do-i-migrate-ffxiv-andor-xivlauncher-files-from-an-old-wine-prefix-to-a-new-one-linux)`
						+ `\nThe Windows FAQ post for this can be found `
						+ `[HERE](https://goatcorp.github.io/faq/xl_troubleshooting#q-how-do-i-migrate-ffxiv-andor-xivlauncher-files-from-an-old-installation-to-a-new-one-windows)`,
				color: client.config.EMBED_NORMAL_COLOR,
				footer: {
					"text": client.config.FRANZBOT_VERSION,
				},
			});
			break;
		case "gamepath":
			responses.push({
				title: `Please check your gamepath in xivlauncher`,
				description: `XIVLauncher requires a working installation of the FFXIV game client, or it will install one for you. `
						+ `On first install, XIVLauncher will try to autoselect your FFXIV install for you, based on the default `
						+ `launcher's installation location and common Steam locations.\n\nFor more information, see `
						+ `[HERE](https://goatcorp.github.io/faq/xl_troubleshooting#q-where-can-i-find-my-ffxiv-installation)`,
				color: client.config.EMBED_NORMAL_COLOR,
				footer: {
					"text": client.config.FRANZBOT_VERSION,
				},
			});
			break;
		case "exploit":
			responses.push({
				title: `Please do not discuss exploits here`,
				description: `Per the [Server Rules](https://discord.com/channels/581875019861328007/585958820061249537/586214664954707968), `
						+ `This server **is *not* intended for exploit development of discussion** or finding bugs in the game that could be abused, be they `
						+ `visual or gameplay-relevant. Especially if the bug is something that is visible to other players. `
						+ `Please refrain from discussing these topics here, no matter how inconsequential the bug may be.`,
				color: client.config.EMBED_NORMAL_COLOR,
				footer: {
					"text": client.config.FRANZBOT_VERSION,
				},
			});
			break;
		case "dssenh":
			responses.push({
				title: `SSL/TLS issues on wine?`,
				description: `If you're running into SSL/TLS issues while using Wine/Lutris, this may `
						+ `be part of recent changes to your distro's SSL configuration. Especially on newer `
						+ `distributions. \n\nSee the FAQ for more details `
						+ `[HERE](https://goatcorp.github.io/faq/xl_troubleshooting#q-im-on-linux-and-i-keep-getting-xivlauncher-failed-to-update-errors)`,
				color: client.config.EMBED_NORMAL_COLOR,
				footer: {
					"text": client.config.FRANZBOT_VERSION,
				},
			});
			break;
		case "ratelimits":
			responses.push({
				title: `GitHub ratelimits will affect XIVLauncher`,
				description: `If XIVLauncher and/or Gshade are failing to check for updates and `
						+ `you know it's not your antivirus, you may be rate-limited by GitHub. \n\nSee the FAQ for more details `
						+ `[HERE](https://goatcorp.github.io/faq/xl_troubleshooting#github-rate-limits)`,
				color: client.config.EMBED_NORMAL_COLOR,
				footer: {
					"text": client.config.FRANZBOT_VERSION,
				},
			});
			break;
		case "dev":
			responses.push({
				title: `Developer Resources`,
				description: `The primary developer resources should all be on their relevant GitHub pages `
						+ `but for some quick links to a few common resources, see our FAQ post `
						+ `[HERE](https://goatcorp.github.io/faq/development)`,
				color: client.config.EMBED_NORMAL_COLOR,
				footer: {
					"text": client.config.FRANZBOT_VERSION,
				},
			});
			break;
		case "loga":
			responses.push({
				title: `Please send us your aria.log file`,
				description: `Please send us your **aria.log** log file from `
						+ `\`%appdata%\\XIVLauncher\\\` in this channel, so we can look into the problem!`
						+ `\n\nIt's best to just upload/attach the file if you can!`
						+ `\n\n**DISCLAIMER**:This log will contain file paths from your computer, which could include your username. `
						+ `If you're not comfortable posting that here, you can `
						+ `open the file in a text editor to redact that information first or `
						+ `you can send it to Franzbot to relay to a private admin channel for processing.\n`
						+ `__Please upload the file directly. Even if you have Nitro, please make sure it's under 5.0 MB.__`,
				color: client.config.EMBED_NORMAL_COLOR,
				image: {
					"url": windowsExplorerScreenshot,
				},
				footer: {
					"text": client.config.FRANZBOT_VERSION,
				},
			});
			break;
		case "logd":
			responses.push({
				title: `Please send us your dalamud.log file`,
				description: `Please send us your **dalamud.log** log file from `
						+ `\`%appdata%\\XIVLauncher\\\` in this channel, so we can look into the problem!`
						+ `\n\nIt's best to just upload/attach the file if you can!`
						+ `\n\n**DISCLAIMER**:This log will contain your computer username. `
						+ `If you're not comfortable posting that here, you can `
						+ `open the file in a text editor to redact that information first or `
						+ `you can send it to Franzbot to relay to a private admin channel for processing.\n`
						+ `__Please upload the file directly. Even if you have Nitro, please make sure it's under 5.0 MB.__`,
				color: client.config.EMBED_NORMAL_COLOR,
				image: {
					"url": windowsExplorerScreenshot,
				},
					 footer: {
					"text": client.config.FRANZBOT_VERSION,
				},
			});
			break;
		case "logsq":
			responses.push({
				title: `Please send us your SquirrelSetup.log file`,
				description: `Please send us your **SquirrelSetup.log** log file from `
						+ `\`%localappdata%\\SquirrelTemp\\\` in this channel, so we can look into the problem!`
						+ `\n\nIt's best to just upload/attach the file if you can!`
						+ `\n\n**DISCLAIMER**:This log will contain your computer username. `
						+ `If you're not comfortable posting that here, you can `
						+ `open the file in a text editor to redact that information first or `
						+ `you can send it to Franzbot to relay to a private admin channel for processing.\n`
						+ `__Please upload the file directly. Even if you have Nitro, please make sure it's under 5.0 MB.__`,
				color: client.config.EMBED_NORMAL_COLOR,
				image: {
					"url": windowsExplorerScreenshot,
				},
				footer: {
					"text": client.config.FRANZBOT_VERSION,
				},
			});
			break;
		case "logxl":
			responses.push({
				title: `Please send us your output.log file`,
				description: `Please send us your **output.log** log file from `
						+ `\`%appdata%\\XIVLauncher\\\` in this channel, so we can look into the problem!`
						+ `\n\nIt's best to just upload/attach the file if you can!`
						+ `\n\n**DISCLAIMER**:This log will contain your ffxiv username[s]. `
						+ `If you're not comfortable posting that here, you can `
						+ `open the file in a text editor to redact that information first or `
						+ `you can send it to Franzbot to relay to a private admin channel for processing.\n`
						+ `__Please upload the file directly. Even if you have Nitro, please make sure it's under 5.0 MB.__`,
				color: client.config.EMBED_NORMAL_COLOR,
				image: {
					"url": windowsExplorerScreenshot,
				},
				footer: {
					"text": client.config.FRANZBOT_VERSION,
				},
			});
			break;
		case "linuxloga":
			responses.push({
				title: `Please send us your aria.log file (Linux edition)`,
				description: `Please send us your **aria.log** log file from `
						+ `\`$WINEPREFIX/drive_c/users/$USER/Application Data/XIVLauncher/`
						+ ` in this channel, so we can look into the problem!`
						+ `\n\nIt's best to just upload/attach the file if you can!`
						+ `\n\n**DISCLAIMER**:This log may contain your computer username. `
						+ `If you're not comfortable posting that here, you can `
						+ `open the file in a text editor to redact that information first or `
						+ `you can send it to Franzbot to relay to a private admin channel for processing.\n`
						+ `__Please upload the file directly. Even if you have Nitro, please make sure it's under 5.0 MB.__`,
				color: client.config.EMBED_NORMAL_COLOR,
				image: {
					"url": windowsExplorerScreenshot,
				},
				footer: {
					"text": client.config.FRANZBOT_VERSION,
				},
			});
			break;
		case "linuxlogd":
			responses.push({
				title: `Please send us your dalamud.log file (Linux edition)`,
				description: `Please send us your **dalamud.log** log file from `
						+ `\`$WINEPREFIX/drive_c/users/$USER/Application Data/XIVLauncher/`
						+ ` in this channel, so we can look into the problem!`
						+ `\n\nIt's best to just upload/attach the file if you can!`
						+ `\n\n**DISCLAIMER**:This log will contain your computer username. `
						+ `If you're not comfortable posting that here, you can `
						+ `open the file in a text editor to redact that information first or `
						+ `you can send it to Franzbot to relay to a private admin channel for processing.\n`
						+ `__Please upload the file directly. Even if you have Nitro, please make sure it's under 5.0 MB.__`,
				color: client.config.EMBED_NORMAL_COLOR,
				image: {
					"url": windowsExplorerScreenshot,
				},
				footer: {
					"text": client.config.FRANZBOT_VERSION,
				},
			});
			break;
		case "linuxlogxl":
			responses.push({
				title: `Please send us your output.log file (Linux edition)`,
				description: `Please send us your **output.log** log file from `
						+ `\`$WINEPREFIX/drive_c/users/$USER/Application Data/XIVLauncher/`
						+ ` in this channel, so we can look into the problem!`
						+ `\n\nIt's best to just upload/attach the file if you can!`
						+ `\n\n**DISCLAIMER**:This log will contain your ffxiv username[s]. `
						+ `If you're not comfortable posting that here, you can `
						+ `open the file in a text editor to redact that information first or `
						+ `you can send it to Franzbot to relay to a private admin channel for processing.\n`
						+ `__Please upload the file directly. Even if you have Nitro, please make sure it's under 5.0 MB.__`,
				color: client.config.EMBED_NORMAL_COLOR,
				image: {
					"url": windowsExplorerScreenshot,
				},
				footer: {
					"text": client.config.FRANZBOT_VERSION,
				},
			});
			break;
		case "eventviewer":
			responses.push({
				title: `Please check the Windows Event Viewer`,
				description: `Please check the Windows Event Viewer to determine the cause of your FFXIV crash.`
						+ `\n\nThis can be found in \`Windows Logs\` -> \`Application\`.`
						+ `\n\nYou can also run a search for \`ffixv_dx11.exe\` in the "Find" action on the right-side panel.`
						+ ` **Please send us all of the inner text in the General tab**. You can copy and paste it into a `
						+ `\`\`\`fancy code block\`\`\` if you want, but a plain message is also fine.`
						+ ` You can also copy it to a text file named \`event.log\` and DM it to Franzbot for pricacy.`
						+ `\n\nNOTE: You may have multiple crash events. Please let us know if your recent Event IDs are `
						+ `stated as some for of CLR/.Net crash or if they're a native FFXIV error such as c000005.`,
				color: client.config.EMBED_NORMAL_COLOR,
				image: {
					"url": "https://cdn.discordapp.com/attachments/687530726756712478/842492553533194240/unknown.png",
				},
				footer: {
					"text": client.config.FRANZBOT_VERSION,
				},
			});
			break;
		case "removeplugin":
			responses.push({
				title: `Generic steps to remove plugins manually`,
				description: `General "how to delete a plugin" steps:\n`
						+ `1. Close the game and xivlauncher\n`
						+ `2. Go to \`%AppData%\\XIVLauncher\\installedPlugins\`\n`
						+ `3. Remove the folder[s] for the plugin[s]\n`
						+ `4. Start the game now\n`
						+ `5. Let us know if the issue persists`
						+ `\n\nEXPERIMENTAL: You can also now delete a plugin from xivlauncher before`
						+ ` logging in. While this should work, it hasn't been tested extensively yet.`,
				color: client.config.EMBED_NORMAL_COLOR,
				image: {
					"url": windowsExplorerScreenshot,
				},
				footer: {
					"text": client.config.FRANZBOT_VERSION,
				},
			});
			break;
		case "removedalamud":
			responses.push({
				title: `Generic steps to remove/reinstall Dalamud`,
				description: `General "how to delete dalamud" steps:\n`
						+ `1. Close the game and xivlauncher\n`
						+ `2. Go to \`%AppData%\\XIVLauncher\`\n`
						+ `3. Remove the Addon\\Hooks folder\n`
						+ `4. Start the game now\n`
						+ `5. Let us know if the issue persists`,
				color: client.config.EMBED_NORMAL_COLOR,
				image: {
					"url": windowsExplorerScreenshot,
				},
				footer: {
					"text": client.config.FRANZBOT_VERSION,
				},
			});
			break;
		case "removeconfig":
			responses.push({
				title: `Generic steps to remove a plugin's config`,
				description: `General "how to delete a plugin's config" steps:\n`
						+ `1. Close the game and xivlauncher\n`
						+ `2. Go to \`%AppData%\\XIVLauncher\\pluginConfigs\`\n`
						+ `3. Remove the offending config files\n`
						+ `4. Start the game now\n`
						+ `5. Let us know if the issue persists`,
				color: client.config.EMBED_NORMAL_COLOR,
				image: {
					"url": windowsExplorerScreenshot,
				},
				footer: {
					"text": client.config.FRANZBOT_VERSION,
				},
			});
			break;


		default:
			responses.push({
				title: `Faq not found for '${args[0]}'`,
				description: `Please check your spelling or use \`f!faq help\`.\n\n`
						+ `Franzbot does not contain FAQs for plugins. Please poke the plugin maintainer in `
						+ `<#684745859497590843>, <#719513457988337724>, or `
						+ `make an issue on their github repo if you have a question about a specific plugin. `,
				color: client.config.EMBED_ERROR_COLOR,
				footer: {
					"text": client.config.FRANZBOT_VERSION,
				},
			});
			break;
	}
	return responses;
};
