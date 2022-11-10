const {
	Client, Collection, Intents,
} = require("discord.js");
const {
	existsSync,
	readdirSync,
} = require("fs");

// set up intents
const myIntents = new Intents();
myIntents.add('DIRECT_MESSAGES', 'GUILDS', 'GUILD_MEMBERS', 'GUILD_MESSAGES', 'GUILD_MESSAGE_REACTIONS');


const client = new Client(
	{
		allowedMentions: {
			parse: [
				'users',
				// 'roles', // we probably don't need this either, but kept for posterity.
			],
		},
		intents: myIntents.bitfield,
		partials: [
			'GUILD',
			'MESSAGE',
			'CHANNEL',
			'REACTION',
		],
	}
);

const config = require("./config.json");
// We also need to make sure we're attaching the config to the CLIENT so it's accessible everywhere!
client.config = config;

// will this work?
const JSONdb = require('simple-json-db');
const configdb = new JSONdb('config.json', {
	syncOnWrite: true,
	jsonSpaces: 4,
});
client.configdb = configdb;

// Require our logger
const logger = require("./modules/Logger");
client.logger = logger;

// Let's start by getting some useful functions that we'll use throughout
// the bot, like logs and elevation features.
require("./modules/functions.js")(client);

// Aliases and commands are put in collections where they can be read from,
// catalogued, listed, etc.
client.commands = new Collection();
client.aliases = new Collection();
client.slashcmds = new Collection();
client.buttoncmds = new Collection();
client.perserversettings = new Collection();
client.perserveraliases = new Collection();
client.perservertriggers = new Collection();

const init = async () => {
	// Now let's load up some per-server config
	const perserversettings = readdirSync("./config", {
		withFileTypes: true,
	})
		.filter(folder => folder.isDirectory())
		.map(dir => dir.name);
	for (const dirname of perserversettings) {
		// logger.log(`Looking in "${dirname}"`);
		if (existsSync(`./config/${dirname}/faqs/`)) {
			logger.log(`Loading FAQs for ${dirname}`);
			const faqsToLoad = readdirSync(`./config/${dirname}/faqs/`).filter(file => file.endsWith(".js"));
			const faqentries = new Collection();
			if (faqsToLoad.length === 0) {
				logger.log(`No FAQs found for ${dirname}`);
				continue;
			}
			for (const faq of faqsToLoad) {
				// logger.debug(`./config/${dirname}/faqs/${faq}`);
				const faqentry = require(`./config/${dirname}/faqs/${faq}`);
				faqentries.set(faqentry.info.name, faqentry);
				faqentry.info.aliases.forEach(alias => {
					client.perserveraliases.set(alias, faqentry.info.name);
				});
				logger.debug(`Loaded the ${faqentry.info.name} FAQ`);
			}
			client.perserversettings.set(dirname, faqentries);
			// logger.log(`Finished Loading FAQs for ${dirname}. 👌`, "log");
		}

		if (existsSync(`./config/${dirname}/triggers/`)) {
			// logger.log(`Loading Triggers for ${dirname}`);
			const triggersToLoad = readdirSync(`./config/${dirname}/triggers/`).filter(file => file.endsWith(".js"));
			const servertriggers = new Collection();
			if (triggersToLoad.length === 0) {
				logger.log(`No Triggers found for ${dirname}`);
				continue;
			}
			for (const trigger of triggersToLoad) {
				// logger.debug(`./config/${dirname}/triggers/${trigger}`);
				const triggerentry = require(`./config/${dirname}/triggers/${trigger}`);
				servertriggers.set(triggerentry.info.name, triggerentry);
				logger.cmd(`Loaded the ${triggerentry.info.name} Trigger`);
			}
			client.perserversettings.set(`${dirname}-triggers`, servertriggers);
		}

		logger.log(`Loading per-server config for ${dirname}`);
		const serverSettings = new JSONdb(`./config/${dirname}/perserversettings.json`, {
			syncOnWrite: true,
			jsonSpaces: 4,
		});

		logger.log("loading command ignore list");
		let ignoredUsers = serverSettings.get("ignoredUsers");
		if (!Array.isArray(ignoredUsers)) {
			logger.warn(`Could not find ignored users for ${dirname}. Setting empty list.`);
			ignoredUsers = [];
			serverSettings.set("ignoredUsers", ignoredUsers);
		}

		logger.log("loading trigger ignored users list");
		let ignoredRoles = serverSettings.get("ignoredRoles");
		if (!Array.isArray(ignoredRoles)) {
			logger.warn(`Could not find ignored roles for ${dirname}. Setting empty list.`);
			ignoredRoles = [];
			serverSettings.set("ignoredRoles", ignoredRoles);
		}

		logger.log("loading trigger watch channels list");
		let suggestionWatchChannels = serverSettings.get("suggestionWatchChannels");
		if (!Array.isArray(suggestionWatchChannels)) {
			logger.warn(`Could not find watch channels for ${dirname}. Setting empty list.`);
			suggestionWatchChannels = [];
			serverSettings.set("suggestionWatchChannels", suggestionWatchChannels);
		}


		client.perserversettings.set(`${dirname}-serversettings`, serverSettings);
	}

	// Here we load **commands** into memory, as a collection, so they're accessible
	// here and everywhere else.
	const commands = readdirSync("./commands/").filter(file => file.endsWith(".js"));
	for (const file of commands) {
		const props = require(`./commands/${file}`);
		logger.cmd(`Loading Command: ${props.help.name}. 👌`);
		client.commands.set(props.help.name, props);
		props.conf.aliases.forEach(alias => {
			client.aliases.set(alias, props.help.name);
		});
	}
	// Now we load any **slash** commands you may have in the ./slash directory.
	const slashFiles = readdirSync("./slash").filter(file => file.endsWith(".js"));
	for (const file of slashFiles) {
		const command = require(`./slash/${file}`);
		const commandName = file.split(".")[0];
		logger.cmd(`Loading Slash command: ${commandName}. 👌`);

		// Now set the name of the command with it's properties.
		client.slashcmds.set(command.commandData().name, command);
	}

	// Now we load any **button** interactions you may have in the ./buttons directory.
	const buttonFiles = readdirSync("./buttons").filter(file => file.endsWith(".js"));
	for (const file of buttonFiles) {
		const button = require(`./buttons/${file}`);
		const buttonName = file.split(".")[0];
		logger.log(`Loading Button interactions: ${buttonName}. 👌`);

		// Now set the name of the command with it's properties.
		client.buttoncmds.set(button.buttonData().name, button);
	}

	// Then we load events, which will include our message and ready event.
	const eventFiles = readdirSync("./events/").filter(file => file.endsWith(".js"));
	for (const file of eventFiles) {
		const eventName = file.split(".")[0];
		logger.cmd(`Loading Event: ${eventName}. 👌`);
		const event = require(`./events/${file}`);
		// Bind the client to any event, before the existing arguments
		// provided by the discord.js event.
		// This line is awesome by the way. Just sayin'.
		client.on(eventName, event.bind(null, client));
	}

	// Here we login the client. And do a little check that the configdb is loaded
	client.login(configdb.get("token"));

	// End top-level async/await function.
};

init();
