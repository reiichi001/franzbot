const got = require('got');

function checkTheMessage(message, forbidAny, forbidCount, negateBadWords, forbiddenMinCount, adjustedMinCount, ignoredRoles, replyMessage) {
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

	const adjustedWordWeight = forbidden.size - offsetWeight;
	if (replyMessage
		&& hasForbidAny
		&& forbidCountQuantity >= forbiddenMinCount
		&& adjustedWordWeight >= adjustedMinCount
		&& message.content.length <= 220 // if it's longer than a tweet, it's probably a false positive
	) {
		message.reply(replyMessage);
	}
}

// The MESSAGE event runs anytime a message is received
// Note that due to the binding of client to every event, every event
// goes `client, other, args` when this function is run.
module.exports = async (client, message) => {
	// It's good practice to ignore other bots. This also makes your bot ignore itself
	// and not get into a spam loop (we call that "botception").
	if (message.author.bot) {
		return;
	}

	// Channel-specific markers
	const GoatTriggers = [
		client.config.GUILDID_TESTING, // franzbot testing - general
		client.config.GUILDID_GOAT, // Goatplace - general
	];
	const MeteorTriggers = [
		client.config.GUILDID_TESTING, // franzbot testing - general
		client.config.GUILDID_METEOR, // Meteor - general
	];
	const ZuTriggers = [
		client.config.GUILDID_TESTING, // franzbot testing - general
		client.config.GUILDID_ZU, // Zu - general
	];
	console.log(`GUILD: ${message.guild.id}, CHANNEL: ${message.channel.id}`);

	// Checks if the bot was mentioned, with no message after it, returns the prefix.
	const prefixMention = new RegExp(`^\\s*<@!?${client.user.id}>\\s*$`, 'u');
	if (message.content.match(prefixMention)) {
		message.channel.send(`My prefix on this guild is \`${client.config.prefix}\``);


		if (MeteorTriggers.includes(message.guild.id)) {
			const embedobj = {
				"embed": {
					"title": "Franzbot FAQ",
					"description": `Supported FAQ commands listed below. Type \`${client.config.prefix}faq <topic>\` to display the content.`,
					"color": client.config.EMBED_NORMAL_COLOR,
					"footer": {
						"text": client.config.FRANZBOT_VERSION,
					},
					"fields": [
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
				},
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
	if (GoatTriggers.includes(message.guild.id)) {
		console.log(`Found in GoatTriggers: ${message.channel.name}`);

		// check if it's a dalamud log
		if (message.attachments.size > 0) {
			console.log("Found an attachment in this message");

			message.attachments.forEach(async attachment => {
				console.log(attachment.name);
				if (attachment.name === "dalamud.txt") {
					// read the data
					console.log(attachment.attachment);
					try {
						const response = await got(attachment.attachment);
						// console.log(response.body);
						const logdata = response.body;
						const results = logdata.match(/TROUBLESHOOTING:(.*)/gu);
						if (results.length > 0) {
							let data = results[results.length - 1];
							data = data.slice(16);
							console.log(data);

							// decrypt from base64
							const buffer = new Buffer.from(data, 'base64');
							data = buffer.toString('ascii');
							console.log(data);
							data = JSON.parse(data);

							// make fancy embed and return

							const embedfields = data.LoadedPlugins.map(item => ({
								name: item.Name,
								value: item.AssemblyVersion,
							}));
							embedfields.push({
								name: "Dalamud Testing",
								value: data.DoDalamudTest,
								inline: true,
							});
							embedfields.push({
								name: "Plugin Testing",
								value: data.DoPluginTest,
								inline: true,
							});


							replyMessage = {
								"embed": {
									"title": "Dalamud.txt parse results",
									"description": "Franzbot has parsed your logfile."
										+ "Here's some information about the plugins that were loaded.",
									"color": client.config.EMBED_NORMAL_COLOR,
									"footer": {
										"text": `DalamudVersion: ${data.DalamudVersion}`,
									},
									"fields": embedfields,
								},
							};

							message.reply(replyMessage);
						}
					}
					catch (error) {
						console.log(error.response.body);
					}
				}
			});
			//
		}
		// process triggers
		forbidAny.push(/(plugin|dalamud|launcher|in-game|in game|XL|XIVLauncher|XIV Launcher)/igu);
		forbidCount.push(/(update|(not|n't)\s+(work|exist|use)|when|eta|why|yet)+(?!.*\1)/igu);
		forbiddenMinCount = 2;
		adjustedMinCount = Number.MIN_SAFE_INTEGER; // disable the "good words offset" feature
		ignoredRoles = ignoredRoles.concat([
			"moderator",
			"demigoat",
			"plugin developer",
			"test",
		]);
		replyMessage = {
		  "embed": {
				"title": client.config.TRIGGER_TITLE,
				"description": "Please understand that this is a community-driven project that has multiple dependencies by people who have school/jobs/both and live in a variety of timezones. Updates to XIV Launcher, Dalamud, and plugins will come when they can, but asking for a time estimate will not make that happen sooner.",
				"color": client.config.EMBED_ERROR_COLOR,
				"footer": {
					"text": client.config.TRIGGER_FOOTER,
				},
			},
		};
	}

	checkTheMessage(message, forbidAny, forbidCount, negateBadWords, forbiddenMinCount, adjustedMinCount, ignoredRoles, replyMessage);

	// bandaid, clear all the important variables
	forbidAny = [];
	forbidCount = [];
	negateBadWords = [];

	// Triggers for Project Meteor
	if (MeteorTriggers.includes(message.guild.id)) {
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
			"embed": {
				"title": client.config.TRIGGER_TITLE,
				"description": "Any discussion of torrenting, piracy, or other illegitimate means of obtaining software is not allowed on this server.",
				"color": client.config.EMBED_ERROR_COLOR,
				"footer": {
					"text": client.config.TRIGGER_FOOTER,
				},
			},
		};
	}

	checkTheMessage(message, forbidAny, forbidCount, negateBadWords, forbiddenMinCount, adjustedMinCount, ignoredRoles, replyMessage);

	// bandaid, clear all the important variables
	forbidAny = [];
	forbidCount = [];
	negateBadWords = [];

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
			"embed": {
				"title": client.config.TRIGGER_TITLE,
				"description": "Please move this conversation out of the general channel. There are additional opt-in channels available on the discord for this topic.",
				"color": client.config.EMBED_ERROR_COLOR,
				"footer": {
					"text": client.config.TRIGGER_FOOTER,
				},
				"fields": [
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
	}

	checkTheMessage(message, forbidAny, forbidCount, negateBadWords, forbiddenMinCount, adjustedMinCount, ignoredRoles, replyMessage);

	// bandaid, clear all the important variables
	forbidAny = [];
	forbidCount = [];
	negateBadWords = [];


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
		await message.guild.fetchMember(message.author);
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
