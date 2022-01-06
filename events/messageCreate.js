/* eslint-disable max-len */
const {
	MessageEmbed,
} = require('discord.js');
const got = require('got');

const SECOND = 1000;
const MINUTE = 60 * SECOND;

function makeTimeoutManager() {
	const lastResponseTimes = new Map(); // Map<string, number>

	function timeoutSet(identifier) {
		const currentTimeout = lastResponseTimes.get(identifier);
		return currentTimeout !== null && typeof currentTimeout !== "undefined";
	}

	function timeoutEnded(identifier, timeoutMs) {
		return !timeoutSet(identifier) || Date.now() - lastResponseTimes.get(identifier) > timeoutMs;
	}

	function resetTimeout(identifier) {
		lastResponseTimes.set(identifier, Date.now());
	}

	return {
		timeoutSet,
		timeoutEnded,
		resetTimeout,
	};
}

const timeoutManager = makeTimeoutManager();

function checkTheMessage(message, forbidAny, forbidCount, negateBadWords, forbiddenMinCount, adjustedMinCount, ignoredRoles, ignorelength, replyMessage) {
	if (message.member.roles.cache.some(r => ignoredRoles.includes(r.name))) {
		return;
	}

	let offsetWeight = 0;
	let hasForbidAny = false;
	let forbidCountQuantity = 0;
	const forbidden = new Set();

	if (!forbidAny) {
		forbidAny = [];
	}
	if (!Array.isArray(forbidAny)) {
		forbidAny = [forbidAny];
	}
	if (!forbidCount) {
		forbidCount = [];
	}
	if (!Array.isArray(forbidCount)) {
		forbidCount = [forbidCount];
	}
	if (!negateBadWords) {
		negateBadWords = [];
	}
	if (!Array.isArray(negateBadWords)) {
		negateBadWords = [negateBadWords];
	}

	for (const forbid of forbidAny) {
		const results = message.content.match(forbid);
		if (results) {
			hasForbidAny = true;
			const noun = `forbidden word${results.length == 1 ? '' : 's'}`;
			console.log(`Matched ${results.length} ${noun}: ${results.join(',')}`);
			for (const item of results) {
				forbidden.add(item);
			}
		}
	}
	for (const forbid of forbidCount) {
		const results = message.content.match(forbid);
		if (results) {
			forbidCountQuantity += results.length;
			const noun = `bad word${results.length == 1 ? '' : 's'}`;
			console.log(`Matched ${results.length} ${noun}: ${results.join(',')}`);
			for (const item of results) {
				forbidden.add(item);
			}
		}
	}

	for (const permit of negateBadWords) {
		const results = message.content.match(permit);
		if (results) {
			offsetWeight = results.length;
			const noun = `good word${results.length == 1 ? '' : 's'}`;
			console.log(`Matched ${results.length} ${noun}: ${results.join(',')}`);
		}
	}

	console.log(`Bad wordset: ${forbidden.size} Goodwords: ${offsetWeight}`);
	console.log(`Ignoring message length: ${ignorelength}`);

	const adjustedWordWeight = forbidden.size - offsetWeight;
	if (replyMessage
		&& hasForbidAny
		&& forbidCountQuantity >= forbiddenMinCount
		&& adjustedWordWeight >= adjustedMinCount
		&& (message.content.length <= 220 || ignorelength === true) // if it's longer than a tweet, it's probably a false positive
	) {
		message.reply({
			embeds: [replyMessage],
			allowedMentions: {
				repliedUser: false,
			},
		});
	}
}

// The MESSAGE event runs anytime a message is received
// Note that due to the binding of client to every event, every event
// goes `client, other, args` when this function is run.
module.exports = async (client, message) => {
	// It's good practice to ignore other bots. This also makes your bot ignore itself
	// and not get into a spam loop (we call that "botception").
	// unless it's an announcement channel, since we want to publish posts...
	if (message.partial) {
		message = await message.fetch()
			.catch(error => {
				console.log('Something went wrong when fetching the message: ', error);
			});
	}
	// client.logger.debug(`Message type: ${message.channel.type}`);

	if (message.channel.type !== 'news' && message.author.bot) {
		return;
	}

	// Franzbot should ignore webhooks too, unless it's an announcement channel
	if (message.channel.type !== 'news' && message.webhookID) {
		return;
	}

	const isDirectMessage = message.channel.type == "DM";


	// Channel-specific markers
	const GoatTriggers = [
		client.config.GUILDID_TESTING, // franzbot testing - general
		client.config.GUILDID_GOAT, // Goatplace - general
	];
	const MeteorTriggers = [
		// client.config.GUILDID_TESTING, // franzbot testing - general
		client.config.GUILDID_METEOR, // Meteor - general
	];
	/*
	const ZuTriggers = [
		client.config.GUILDID_TESTING, // franzbot testing - general
		client.config.GUILDID_ZU, // Zu - general
	];
	*/
	if (isDirectMessage) {
		console.log(`Received a DM from ${message.author.username}.`);
	}
	else {
		console.log(`GUILD: ${message.guild?.id ?? "Not a guild"}`);
		console.log(`CHANNEL: ${message.channel?.id ?? "Not a channel"}`);
	}

	// Checks if the bot was mentioned, with no message after it, returns the prefix.
	const prefixMention = new RegExp(`^\\s*<@!?${client.user.id}>\\s*$`, 'u');
	if (message.content.match(prefixMention)) {
		message.channel.send(`My prefix on this guild is \`${client.config.prefix}\``);


		if (MeteorTriggers.includes(message.guild.id)) {
			const embedobj = {

				title: "Franzbot FAQ",
				description: `Supported FAQ commands listed below. Type \`${client.config.prefix}faq <topic>\` to display the content.`,
				color: client.config.EMBED_NORMAL_COLOR,
				footer: {
					"text": client.config.FRANZBOT_VERSION,
				},
				fields: [
					{
						"name": "Information",
						"value": "wiki status paru md5",
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
			};
			message.channel.send(embedobj);
		}
		return;
	}

	// console.log(message.member.guild.iconURL.replace(".jpg",".webp?size=1024"));

	// PrincessRTFM's rewrite starts here

	let forbidAny = []; // an array of regex, at least one must match to complain
	let forbidCount = []; // same value type, a minimum number must match
	let negateBadWords = []; // same type again, these matches count against the bad word matches
	let forbiddenMinCount; // the number of forbidCount match results to complain
	let adjustedMinCount; // the number of ADJUSTED bad word match results to complain
	let ignoredRoles = []; // an array of roles to ignore messages from
	let replyMessage; // whatever this is, it gets sent via `message.reply()` unless it's falsey

	// Triggers for Goatplace
	if (isDirectMessage || GoatTriggers.includes(message.guild?.id)) {
		console.log(`Found in GoatTriggers: ${isDirectMessage ? "direct message" : message.channel.name}`);

		// some debugging
		let customChannel = await client.channels.fetch(client.config.CHANNELID_RELAY_GOAT);
		if (client.config.DEBUGMODE) {
			customChannel = await client.channels.fetch(client.config.CHANNELID_RELAY_TEST);
		}

		// autopublish in announcement channels
		console.log(`Channel type: ${message.channel.type}`);
		if (message.channel.type === 'GUILD_NEWS' || message.channel.type.match(/news/gui)) {
			message.crosspost()
				.then(() => console.log('Crossposted an announcement'))
				.catch(console.error);
		}

		  // check if it's a dalamud log
		if (message.attachments.size > 0)  {
			console.log("Found an attachment in this message");

			message.attachments.forEach(async attachment => {
				console.log(attachment.name);
				if (isDirectMessage && attachment.name.match(/(aria|output|dalamud|message|dalamudConfig|launcherConfigV3|dxdiag|event|SquirrelSetup|patcher).*\.(log|txt|json|evtx)/gui)) {
					// sane filesizes only
					if (attachment.size > (5 * 1024 * 1024)) {
						console.log("Big chonker file. That's a lot of text...");
						message.channel.send("This file is pretty big and has not be relayed.\n"
							+ "Perhaps you'd like to generate a fresh log that's smaller?\n\n"
							+ "To do that, just delete your log file and try to relaunch with xivlauncher. "
							+ "Then upload the new log, which should be much smaller!");
						return;
					}

					console.log(`Launcher or Dalamud log upload: ${attachment.attachment}`);
					// const response = await got(attachment.attachment);
					console.log(`Fetched custom channel to relay: ${customChannel.name}`);
					await customChannel.send({
						content: `${message.author.username} (${message.author}) uploaded an attachment in DMs`,
						files: [attachment],
					});
				}

				// relay crash dumps from goatplace (or DMs)
				if (attachment.name.match(/.*\.(dmp)/gui)) {
					console.log(`Dalamud crash dump upload: ${attachment.attachment}`);
					// const response = await got(attachment.attachment);
					console.log(`Fetched custom channel to relay: ${customChannel.name}`);
					await customChannel.send({
						content: `${message.author.username} (${message.author}) uploaded a crash log in ${isDirectMessage ? "DMs" : message.channel}.`,
						files: [attachment],
					});
					await message.channel.send({
						content: `Franzbot has relayed a crash dump to a private channel for analysis.`,
					});

					if (!isDirectMessage) {
						// try to delete this out of the channel it was in.
						// const curChannel = message.channel;
						await message.delete()
							/*
							.catch(await curChannel.send({
								content: `Franzbot couldn't delete your crash dump from this channel for you. Please remove it.`,
							}));
							*/
							.catch(console.error);
					}
				}

				// handle the dalamud.txt file
				if (attachment.name.match(/(dalamud|output|message).*\.(log|txt)/gui)) {
					// read the data
					console.log(`Processing Dalamud or XIVLauncher log called ${attachment.name}`);
					try {
						const response = await got(attachment.attachment);

						/*
						if (message.channel.isThread()) {
							client.logger.debug("THIS IS A THREAD");
							console.log(response?.body);
							client.logger.debug("END OF THREAD");
						}
						*/

						const logdata = response?.body;
						const logdresults = logdata.match(/TROUBLESHOOTING:(.*)/gu);
						if (logdresults?.length > 0) {
							let data = logdresults[logdresults.length - 1];
							data = data.slice(16);
							// console.log(`TROUBLESHOOTING:\n${data}`);

							// decrypt from base64
							const buffer = new Buffer.from(data, 'base64');
							data = buffer.toString('utf8');
							// console.log(`TROUBLESHOOTING decoded:\n${data}`);
							data = JSON.parse(data);

							// make fancy embed and return
							const replymessage2 = new MessageEmbed()
								.setTitle(`${attachment.name} TROUBLESHOOTING parse results${client.config.DEBUGMODE ? " - Debug Version" : ""}`)
								.setDescription("Franzbot has parsed your logfile. "
									+ "Here's some information about the plugins that were loaded.")
								.setColor(13580863)
								.setFooter(`DalamudVersion: ${data.DalamudVersion}\nGameVersion: ${data.GameVersion}`);

							let plugintext = ">>> ";
							let overflowed = false;

							if (data?.LoadedPlugins?.length == 0) {
								replymessage2
									.addField(
										"Loaded plugins",
										"No plugins loaded according to troubleshooting blob."
									);
							}
							else if (data.LoadedPlugins.length == 1) {
								plugintext += `**${data.LoadedPlugins[0].Name}**`
									+ ` - ${data.LoadedPlugins[0].AssemblyVersion}\n`;

								replymessage2
									.addField(
										"Loaded plugin",
										plugintext
									);
							}
							else {
								data.LoadedPlugins
									.sort((a, b) => (a.Name.toLowerCase() > b.Name.toLowerCase() ? 1 : -1))
									.forEach(plugin => {
										plugintext += `**${plugin.Name}**`
											+ ` - ${plugin.AssemblyVersion}\n`;
										if (plugintext.length > 900) {
											replymessage2
												.addField(
													"Loaded plugins",
													plugintext
												);
											plugintext = ">>> ";
											overflowed = true;
										}
									});

								if (overflowed) {
									replymessage2
										.addField(
											"Plugins Continued...",
											plugintext
										);
								}
								else {
									replymessage2
										.addField(
											"Last known loaded plugins",
											plugintext
										);
								}
							}

							replymessage2
								.addField(
									"Has third party repos",
									data.HasThirdRepo ? "Yes" : "No"
								)
								.addField(
									"Dalamud Testing",
									data.BetaKey ?? "null",
									true
								)
								.addField(
									"Plugin Testing",
									data.DoPluginTest ? "Yes" : "No",
									true
								)
								.addField(
									"InterfaceLoaded",
									data.InterfaceLoaded ? "Yes" : "No",
									true
								);
							if (isDirectMessage) {
								customChannel.send({
									embeds: [replymessage2],
									allowedMentions: {
										repliedUser: false,
									},
								});
							}
							else {
								message.reply({
									embeds: [replymessage2],
									allowedMentions: {
										repliedUser: false,
									},
								});
							}
						}

						const lastexpresults = logdata.match(/LASTEXCEPTION:(.*)/gu);
						if (lastexpresults?.length > 0) {
							let data = lastexpresults[lastexpresults.length - 1];
							data = data.slice(14);
							// console.log(`LASTEXCEPTION:\n${data}`);

							// decrypt from base64
							const buffer = new Buffer.from(data, 'base64');
							data = buffer.toString('utf8');
							// console.log(`LASTEXCEPTION decoded:\n${data}`);
							data = JSON.parse(data);

							// handle the injection error blob
							const timestamp = Math.round(Date.parse(data?.When) / 1000);

							const replymessage3 = new MessageEmbed()
								.setTitle(`${attachment.name} LASTEXCEPTION parse results${client.config.DEBUGMODE ? " - Debug Version" : ""}`)
								.setDescription("Franzbot has parsed your logfile. "
									+ "Here's some information about the last issue found in your log file.")
								.setColor(13580863)
								.setFooter(client.config.FRANZBOT_VERSION);

							const exceptionInfo = data?.Info;
							const exceptionContext = data?.Context;

							if (exceptionInfo.length > 0) {
								// console.log(`Long Info ${exceptionInfo.length} characters.`);
								if (exceptionInfo.length > 1024) {
									const temp = exceptionInfo.split("\r\n");
									// console.log(temp);
									// console.log(`Split into ${temp.length} lines`);
									let tempvalue = "";
									let overflowed = false;

									temp.forEach(line => {
										tempvalue += line;
										if (tempvalue.length > 700) {
											// console.log("Splitting Info into new field.");
											replymessage3.addField(
												"Info",
												`\`\`\`${tempvalue}\`\`\``
											);
											tempvalue = "";
											overflowed = true;
										}
									});

									if (overflowed) {
										replymessage3.addField(
											"Info continued",
											`\`\`\`${tempvalue}\`\`\``
										);
									}
								}
								else {
									replymessage3.addField(
										"Info",
										`\`\`\`${data?.Info}\`\`\``
									);
								}
							}

							if (exceptionContext.length > 0) {
								// console.log(`Long Context ${exceptionInfo.length} characters.`);
								if (exceptionContext.length > 1024) {
									const temp = exceptionContext.split("\r\n");
									// console.log(`Split into ${temp.length} lines`);
									let tempvalue = "";
									let overflowed = false;

									temp.forEach(line => {
										tempvalue += line;
										if (tempvalue.length > 700) {
											// console.log("Splitting Context into new field.");
											replymessage3.addField(
												"Context",
												`\`\`\`${tempvalue}\`\`\``
											);
											tempvalue = "";
											overflowed = true;
										}
									});

									if (overflowed) {
										replymessage3.addField(
											"Context continued",
											`\`\`\`${tempvalue}\`\`\``
										);
									}
								}
								else {
									replymessage3.addField(
										"Context",
										`\`\`\`${data?.Context}\`\`\``
									);
								}
							}

							replymessage3.addField(
								"Timestamp",
								`${data?.When}\n<t:${timestamp}:F>`
							);

							if (isDirectMessage) {
								customChannel.send({
									embeds: [replymessage3],
									allowedMentions: {
										repliedUser: false,
									},
								});
							}
							else {
								message.reply({
									embeds: [replymessage3],
									allowedMentions: {
										repliedUser: false,
									},
								});
							}
						}

						const logxlresults = logdata.match(/TROUBLESHXLTING:(.*)/gu);
						if (logxlresults?.length > 0) {
							let data = logxlresults[logxlresults.length - 1];
							data = data.slice(16);
							console.log(`TROUBLESHXLTING:\n${data}`);

							// decrypt from base64
							const buffer = new Buffer.from(data, 'base64');
							data = buffer.toString('utf8');
							// console.log(`TROUBLESHXLTING decoded:\n${data}`);
							data = JSON.parse(data);

							// handle the injection error blob
							const timestamp = Math.round(Date.parse(data?.When) / 1000);

							/* eslint-disable sonarjs/no-duplicate-string */

							const troubleshxltingreplymessage = new MessageEmbed()
								.setTitle(`${attachment.name} XLTROUBLESHOOTING parse results${client.config.DEBUGMODE ? " - Debug Version" : ""}`)
								.setDescription("Franzbot has parsed your logfile. "
									+ "Here's some information about the last issue found in your log file.")
								.setColor(4886754);


							// launcher info
							troubleshxltingreplymessage
								.addField("XIVLauncher version", data.LauncherVersion, true)
								.addField("XL Git Hash", data.LauncherHash, true)
								.addField("Official XL Release", data.Official ? "yes" : "no", true);

							// launcher settings
							const troubleshxltingreplymessage2 = new MessageEmbed()
								.setColor(4886754)
								.setTitle("General Launcher Settings")
								.addField("Autologin", data.IsAutoLogin ? "enabled" : "disabled", true)
								.addField("DirectX", data.IsDx11 ? "dx11" : "dx9", true)
								.addField("DPI Aware", data.DpiAwareness ? "yes" : "no", true)
								.addField("Encrypted Arguments", data.EncryptArguments ? "enabled" : "disabled", true)
								.addField("Steam Integration", data.SteamIntegration ? "enabled" : "disabled", true)
								.addField("UID Cache", data.IsUidCache ? "enabled" : "disabled", true);
							// dalamud injection
							troubleshxltingreplymessage2
								.addField("Dalamud", data.DalamudEnabled ? "enabled" : "disabled");
							if (data.DalamudEnabled) {
								troubleshxltingreplymessage2
									.addField("Injection Method", data.DalamudLoadMethod == 0 ? "Entrypoint" : "DLL Inject", true)
									.addField("Injection Delay", data.DalamudInjectionDelay ? `${data.DalamudInjectionDelay}ms` : "0ms", true);
							}

							// game version info

							const troubleshxltingreplymessage3 = new MessageEmbed()
								.setColor(4886754)
								.setTitle("Game Version Information")
								.addField("A Realm Reborn", data.ObservedGameVersion ?? "not installed", true)
								.addField("Heavensward", data.ObservedEx1Version ?? "not installed", true)
								.addField("Stormblood", data.ObservedEx2Version ?? "not installed", true)
								.addField("Shadowbringers", data.ObservedEx3Version ?? "not installed", true)
								.addField("Endwalker", data.ObservedEx4Version ?? "not installed", true)
								.addField("BCK files match", data.BckMatch ? "yes" : "no", true);

							switch (data.IndexIntegrity) {
								case 0:
									troubleshxltingreplymessage3
										.addField("Index Integrity", "Failed");
									break;

								case 1:
									troubleshxltingreplymessage3
										.addField("Index Integrity", "Exception");
									break;

								case 2:
									troubleshxltingreplymessage3
										.addField("Index Integrity", "NoGame");
									break;

								case 3:
									troubleshxltingreplymessage3
										.addField("Index Integrity", "NoServer");
									break;

								case 4:
									troubleshxltingreplymessage3
										.addField("Index Integrity", "Success");
									break;

								default:
									break;
							}

							troubleshxltingreplymessage.addField(
								"Log Timestamp",
								`${data?.When}\n<t:${timestamp}:F>`
							);

							troubleshxltingreplymessage3
								.setFooter(client.config.FRANZBOT_VERSION);

							/* eslint-enable sonarjs/no-duplicate-string */

							if (isDirectMessage) {
								customChannel.send({
									embeds: [
										troubleshxltingreplymessage,
										troubleshxltingreplymessage2,
										troubleshxltingreplymessage3,
									],
									allowedMentions: {
										repliedUser: false,
									},
								});
							}
							else {
								message.reply({
									embeds: [
										troubleshxltingreplymessage,
										troubleshxltingreplymessage2,
										troubleshxltingreplymessage3,
									],
									allowedMentions: {
										repliedUser: false,
									},
								});
							}
						}
					}
					catch (error) {
						if (error?.response?.body) {
							console.error(error.response.body);
						}
						else {
							console.error(error);
						}
					}
				}
			});
			return;
		}

		// we don't want to deal with any other DMs.
		if (isDirectMessage) {
			return;
		}

		// START custom triggers that I probably shouldn't do.

		// testing CD

		// just for Adam
		let sectionIdentifier = "funnyshit";
		if (timeoutManager.timeoutEnded(sectionIdentifier, 5 * MINUTE)) {
			if (message.author.id == "95483650853838848"
				&& message.content.match(/(classic|lol|just|iconic)*\s*\bse\b\s*(things|quality)*/gui).length > 0) {
				message.reply({
					content: "You know, you were doing well until the very last sentence, then you lost any and all respect you'd clawed back. Have a good day.",
					allowedMentions: {
						repliedUser: false,
					},
				});
				return;
			}

			// just for Attick
			if (message.author.id == "131195749017976833"
				&& message.content.match(/(glad|happy) to help/gui)) {
				message.channel.send("https://cdn.discordapp.com/attachments/684745859497590843/812389944013881394/unknown.png");
				return;
			}

			timeoutManager.resetTimeout(sectionIdentifier);
		}
		else if (timeoutManager.timeoutSet(sectionIdentifier)) {
			console.log(`${sectionIdentifier} timeout not exceeded; ignoring message`);
		}


		// END custom triggers that I probably shouldn't do.

		// process actual triggers
		ignoredRoles = ignoredRoles.concat([
			"moderator",
			"demogoat",
			"plugin developer",
			"test",
			"botters",
		]);


		// disabled as no new patches
		sectionIdentifier = "newpatch";
		if (client.config.NEWFFXIVPATCH) {
			if (timeoutManager.timeoutEnded(sectionIdentifier, 5 * MINUTE)) {
				forbidAny.push(/(plugin|dalamud|launcher|in-game|in game|XL|XIVLauncher|XIV Launcher|combo|moaction|mouseover)/igu);
				forbidCount.push(/(update|(not|n't)\s+(work|exist|use)|when|eta|why|yet)+(?!.*\1)/igu);
				forbiddenMinCount = 2;
				adjustedMinCount = Number.MIN_SAFE_INTEGER; // disable the "good words offset" feature

				replyMessage = {

					title: client.config.TRIGGER_TITLE,
					description: "Please understand that this is a community-driven project that has multiple dependencies by people who have school/jobs/both and live in a variety of timezones. Updates to XIV Launcher, Dalamud, and plugins will come when they can, but asking for a time estimate will not make that happen sooner.\n\nPlease see our [many](https://discord.com/channels/581875019861328007/830939095478829096/893209077071609887) [posts](https://discord.com/channels/581875019861328007/585180735032393730/914487751708119091) in <#585180735032393730> and <#830939095478829096>",
					color: client.config.EMBED_ERROR_COLOR,
					footer: {
						"text": client.config.TRIGGER_FOOTER,
					},
				};

				checkTheMessage(message, forbidAny, forbidCount, negateBadWords, forbiddenMinCount, adjustedMinCount, ignoredRoles, false, replyMessage);

				timeoutManager.resetTimeout(sectionIdentifier);

				// bandaid, clear all the important variables
				forbidAny = [];
				forbidCount = [];
				negateBadWords = [];
			}
			else if (timeoutManager.timeoutSet(sectionIdentifier)) {
				console.log(`${sectionIdentifier} timeout not exceeded; ignoring message`);
			}
			// return;
		}

		sectionIdentifier = "SupportedElsewhere";
		if (timeoutManager.timeoutEnded(sectionIdentifier, 3 * SECOND)) {
			forbidAny.push(/(sonar|delvui|aether\s*sense|fvp|vibe_*\s*plugin)/gui);
			forbidCount.push(/\b(get|install|help|support|download|update?|use|using|where|find|issue|problem|command|crash|break|know|run+)(ed|t?ing)?\b/gui);
			negateBadWords = [];
			forbiddenMinCount = 1;
			adjustedMinCount = Number.MIN_SAFE_INTEGER; // disable the "good words offset" feature
			replyMessage = {

				title: "Automated Message Response",
				description: "While this tool is on the official Dalamud Plugins repository, support for it is provided elsewhere. "
					+ "Please contact the creator[s] directly or ask in their support discords."
					+ "\n\nIf they have a third party repo URL or Discord link, someone may link is as long as it doesn't provide other unofficial plugins. "
					+ "Thank you for your understanding!",
				color: client.config.EMBED_WARN_COLOR,
				footer: {
					"text": client.config.TRIGGER_FOOTER,
				},
			};

			checkTheMessage(message, forbidAny, forbidCount, negateBadWords, forbiddenMinCount, adjustedMinCount, ignoredRoles, true, replyMessage);

			timeoutManager.resetTimeout(sectionIdentifier);

			// bandaid, clear all the important variables
			forbidAny = [];
			forbidCount = [];
			negateBadWords = [];
		}
		else if (timeoutManager.timeoutSet(sectionIdentifier)) {
			console.log(`${sectionIdentifier} timeout not exceeded; ignoring message`);
		}

		sectionIdentifier = "UnsupportedTools";
		if (timeoutManager.timeoutEnded(sectionIdentifier, 3 * SECOND)) {
			forbidAny.push(/(bdth|burn[ing]* down the house|xiv\s*alex.*|no\s*clip.*)/gui);
			forbidCount.push(/\b(get|install|help|support|download|update?|use|using|where|find|issue|problem|command|crash|break|know|run+)(s|ed|t?ing)?\b/gui);
			negateBadWords = [];
			forbiddenMinCount = 1;
			adjustedMinCount = Number.MIN_SAFE_INTEGER; // disable the "good words offset" feature
			replyMessage = {

				title: client.config.TRIGGER_TITLE,
				description: "We are unable to provide support for plugins that can only be installed via third-party repo or other third party tools. "
					+ "Please contact the creator[s] directly, make an issue on their git repo, or ask in their support discords."
					+ "\n\nPlease do not link to the aforementioned tool/plugin here. Thank you for your understanding!",
				color: client.config.EMBED_ERROR_COLOR,
				footer: {
					"text": client.config.TRIGGER_FOOTER,
				},
			};

			checkTheMessage(message, forbidAny, forbidCount, negateBadWords, forbiddenMinCount, adjustedMinCount, ignoredRoles, true, replyMessage);

			timeoutManager.resetTimeout(sectionIdentifier);

			// bandaid, clear all the important variables
			forbidAny = [];
			forbidCount = [];
			negateBadWords = [];
		}
		else if (timeoutManager.timeoutSet(sectionIdentifier)) {
			console.log(`${sectionIdentifier} timeout not exceeded; ignoring message`);
		}

		sectionIdentifier = "xivlauncher-suggestions";
		const watchXLSuggest = client.config.XLSUGGEST_TRIGGER_CHANNEL;
		if (watchXLSuggest.includes(message.channel.id) && timeoutManager.timeoutEnded(sectionIdentifier, 60 * MINUTE)) {
			forbidAny.push(/(plug[-]*in|add[-]*on|mod|xiv\s*combo)/gui);
			forbidCount.push(/(can|would|is there|possible|made|make|build|create)/gui);
			negateBadWords = [];
			forbiddenMinCount = 1;
			adjustedMinCount = Number.MIN_SAFE_INTEGER; // disable the "good words offset" feature
			replyMessage = {

				title: client.config.TRIGGER_TITLE,
				description: "Please put plugin suggestions into the <#685275026156683280> channel please."
						+ "\n\nThis channel is for XIVLauncher, Dalamud, or Discord related requests.",
				color: client.config.EMBED_INFO_COLOR,
				footer: {
					"text": client.config.TRIGGER_FOOTER,
				},
			};

			checkTheMessage(message, forbidAny, forbidCount, negateBadWords, forbiddenMinCount, adjustedMinCount, ignoredRoles, true, replyMessage);

			timeoutManager.resetTimeout(sectionIdentifier);

			// bandaid, clear all the important variables
			forbidAny = [];
			forbidCount = [];
			negateBadWords = [];
			return;
		}
		else if (timeoutManager.timeoutSet(sectionIdentifier)) {
			console.log(`${sectionIdentifier} timeout not exceeded; ignoring message`);
		}

		sectionIdentifier = "suggestionchannels";
		const watchChannels = client.config.SUGGESTION_WATCH_CHANNELS;
		if (watchChannels.includes(message.channel.id) && timeoutManager.timeoutEnded(sectionIdentifier, 60 * MINUTE)) {
			// These need to be set to things about suggestions
			// forbidAny.push(/(bdth|burn[ing]* down the house)/gui);
			// forbidCount.push(/(install|help|support|download|update|use|using|where|find|issue|problem|command)/gui);
			// negateBadWords = [];
			// forbiddenMinCount = 1;
			// adjustedMinCount = Number.MIN_SAFE_INTEGER; // disable the "good words offset" feature
			if (message.member.roles.cache.some(r => ignoredRoles.includes(r.name))) {
				return;
			}

			console.log("Suggestion watch channel detected.");

			// send a reply
			replyMessage = {

				title: client.config.TRIGGER_TITLE,
				description: "Franzbot has detected chat activity from a non-mod/non-dev user in a suggestions channel.",
				color: client.config.EMBED_INFO_COLOR,
				footer: {
					"text": "This automated response is on a 30 minute cooldown every time there's chat activity and is not based on the words you said. "
							+ "This message will self destruct in 5 minutes.",
				},
				fields: [
					{
						"name": "Existing Plugins",
						"value": "If you haven't already, see if the plugin has an issue or requests tracker on its repo. This may require a GitHub or other account. Otherwise, tag the developer once so they can find this request if you haven't already.",
					},
					{
						"name": "New Plugins",
						"value": "If you are proposing a new plugin and have a GitHub account, please consider opening an issue on the [suggestions repository](https://github.com/goatcorp/suggestions/issues/new?assignees=&labels=discussion+requested&template=plugin_request.md&title=).",
					},
					{
						"name": "XIVLauncher/Dalamud",
						"value": "If you have a gitHub account, please submit an issue/feature request for [XIVLauncher](https://github.com/goatcorp/FFXIVQuickLauncher/issues) or [Dalamud](https://github.com/goatcorp/Dalamud/issues) on their respective Github repos.",
					},
				],
			};

			message.channel.send({
				embeds: [replyMessage],
			})
				.then(msg => {
					setTimeout(() => msg.delete(), 5 * MINUTE);
				});

			// checkTheMessage(message, forbidAny, forbidCount, negateBadWords, forbiddenMinCount, adjustedMinCount, ignoredRoles, true, replyMessage);

			timeoutManager.resetTimeout(sectionIdentifier);

			// bandaid, clear all the important variables
			forbidAny = [];
			forbidCount = [];
			negateBadWords = [];
			return;
		}
		else if (timeoutManager.timeoutSet(sectionIdentifier)) {
			console.log(`${sectionIdentifier} timeout not exceeded or not a watched channel for ${sectionIdentifier}; ignoring message`);
		}

		sectionIdentifier = "newpatchnag";
		const postnag = false;
		const watchNagChannels = client.config.NEWPATCHNAG_WATCH_CHANNELS;
		if (postnag && watchNagChannels.includes(message.channel.id) && timeoutManager.timeoutEnded(sectionIdentifier, 15 * MINUTE)) {
			if (message.member.roles.cache.some(r => ignoredRoles.includes(r.name))) {
				return;
			}

			console.log("Suggestion watch channel detected.");

			// send a reply
			replyMessage = {

				title: "Automated Chat Channel Nag",
				description: "Franzbot has detected chat activity from a non-mod/non-dev user.",
				color: client.config.EMBED_INFO_COLOR,
				footer: {
					"text": "This automated response is on a 15 minute cooldown every time there's chat activity and is not based on the words you said. "
						+ "This message will self destruct in 5 minutes.",
				},
				fields: [
					{
						"name": "Dalamud is not ready yet",
						"value": "Please don't ask when it will be ready. There is no average time it takes or estimate. "
							+ "We'd like it to be ready too!"
							+ "\n__All plugins are disabled because Dalamud is disabled.__\n\n"
							+ "Follow the <#585180735032393730> channel for updated information.",
					},
					{
						"name": "This is not #general",
						"value": "Please try to keep discussions in this channel to a minimum. It's a support channel first and foremost.\n\n"
							+ "You can pick up a role for <#581875020632948762> access in <#719508946141970492>",
					},
					{
						"name": "This is not #plugin-help",
						"value": "Please don't ask for help with missing/broken plugins here. See above.",
					},
					{
						"name": "Other third party tools/mods",
						"value": "We have no control over other third party tools or mods. Please ask for support in their support servers/forums/websites/etc.",
					},
				],
			};

			message.channel.send({
				embeds: [replyMessage],
			})
				.then(msg => {
					setTimeout(() => msg.delete(), 5 * MINUTE);
				});

			// checkTheMessage(message, forbidAny, forbidCount, negateBadWords, forbiddenMinCount, adjustedMinCount, ignoredRoles, true, replyMessage);

			timeoutManager.resetTimeout(sectionIdentifier);

			// bandaid, clear all the important variables
			forbidAny = [];
			forbidCount = [];
			negateBadWords = [];
			return;
		}
		else if (timeoutManager.timeoutSet(sectionIdentifier)) {
			console.log(`${sectionIdentifier} timeout not exceeded or not a watched channel for ${sectionIdentifier}; ignoring message`);
		}
	}


	// Triggers for Project Meteor
	if (MeteorTriggers.includes(message.guild?.id)) {
		console.log(`Found in MeteorTriggers: ${message.channel.name}`);
		forbidAny.push(/(ffxiv|ff14|1\.[0-9]{0,2}[a|b|c]?)+(?!.*\1)/igu);
		forbidCount.push(/(torrent|pirat|free|copy|copies|download|ISO)+(?!.*\1)/igu);
		negateBadWords.push(/(can't|don't|cannot|ARR|HW|SB|SHB|trial|[2-9]\.[0-9]{0,2})+/igu);
		forbiddenMinCount = 2;
		adjustedMinCount = 2;
		ignoredRoles = ignoredRoles.concat([
			"Developer",
			"Moderator",
			"Operator",
			"test",
		]);
		replyMessage = {

			title: client.config.TRIGGER_TITLE,
			description: "Any discussion of torrenting, piracy, or other illegitimate means of obtaining software is not allowed on this server.",
			color: client.config.EMBED_ERROR_COLOR,
			footer: {
				"text": client.config.TRIGGER_FOOTER,
			},
		};

		checkTheMessage(message, forbidAny, forbidCount, negateBadWords, forbiddenMinCount, adjustedMinCount, ignoredRoles, false, replyMessage);

		// bandaid, clear all the important variables
		forbidAny = [];
		forbidCount = [];
		negateBadWords = [];
	}

	/*
	// Triggers for Zu
	if (ZuTriggers.includes(message.guild.id)) {
		console.log(`Found in ZuTriggers: ${message.channel.name}`);
		forbidAny.push(/(corona|virus|covid)/igu);
		forbidCount = [];
		negateBadWords.push(/(computer|beer)+/igu);
		forbiddenMinCount = 0;
		adjustedMinCount = 1;
		ignoredRoles = ignoredRoles.concat([
			"Admin",
			"test",
		]);
		replyMessage = {

				title: client.config.TRIGGER_TITLE,
				description: "Please move this conversation out of the general channel. There are additional opt-in channels available on the discord for this topic.",
				color: client.config.EMBED_ERROR_COLOR,
				footer: {
					"text": client.config.TRIGGER_FOOTER,
				},
				fields: [
					{
						"name": "Spoilers",
						"value": "Please enable the Discussion role to talk about spoilers.",
					},
					{
						"name": "IRL",
						"value": `Please enable the IRL role and discuss this topic in <#690416629913223208>`,
					},
				],
			},
		};
		checkTheMessage(message, forbidAny, forbidCount, negateBadWords, forbiddenMinCount, adjustedMinCount, ignoredRoles, false, replyMessage);

		// bandaid, clear all the important variables
		forbidAny = [];
		forbidCount = [];
		negateBadWords = [];
	}
	*/

	// End of PrincessRTFM's rewrite

	// Also good practice to ignore any message that does not start with our prefix,
	// which is set in the configuration file.
	if (message.content[0] == client.config.prefix_old && message.guild.id == client.config.GUILDID_METEOR) {
		message.reply(`Franzbot now uses ${client.config.prefix} as a prefix.`);
	}
	if (message.content.indexOf(client.config.prefix) !== 0) {
		return;
	}

	// Here we separate our "command" name, and our "arguments" for the command.
	// e.g. if we have the message "+say Is this the real life?" , we'll get the following:
	// command = say
	// args = ["Is", "this", "the", "real", "life?"]
	const args = message
		.content
		.slice(client.config.prefix.length)
		.trim()
		.split(/\s+/gu);
	const command = args.shift().toLowerCase();

	// If the member on a guild is invisible or not cached, fetch them.
	if (message.guild && !message.member) {
		message.guild.fetchMember(message.author);
	}


	// Check whether the command, or alias, exist in the collections defined
	// in app.js.
	const cmd = client.commands.get(command) || client.commands.get(client.aliases.get(command));
	if (!cmd) {
		return;
	}

	// Some commands may not be useable in DMs. This check prevents those commands from running
	// and return a friendly error message.
	if (cmd && !message.guild && cmd.conf.guildOnly) {
		message.channel.send("This command is unavailable via private message. Please run this command in a guild.");
		return;
	}

	message.flags = [];
	while (args[0] && args[0][0] === "-") {
		message.flags.push(args.shift().slice(1));
	}
	cmd.run(client, message, args);
};
