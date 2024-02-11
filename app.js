import {
	Client, Collection, GatewayIntentBits, Partials,
} from "discord.js";
import {
	isSnowflake,
} from "discord-snowflake";
import {
	existsSync, readdirSync,
} from "fs";


const client = new Client(
	{
		allowedMentions: {
			parse: [
				'users',
				// 'roles', // we probably don't need this either, but kept for posterity.
			],
		},
		intents: [
			GatewayIntentBits.DirectMessages,
			GatewayIntentBits.Guilds,
			GatewayIntentBits.GuildMembers,
			GatewayIntentBits.GuildMessages,
			GatewayIntentBits.GuildMessageReactions,
			GatewayIntentBits.MessageContent,
		],
		partials: [
			Partials.GuildMember,
			Partials.Message,
			Partials.Channel,
			Partials.Reaction,
		],
	}
);

// We also need to make sure we're attaching the config to the CLIENT so it's accessible everywhere!
// This is currently broken. But we also wanted to phase this out for the DB solution anyways.
// import config from "./config.json" assert { type: 'json' };
// client.config = config;

// will this work?
import JSONdb from 'simple-json-db';
const configdb = new JSONdb('config.json', {
	syncOnWrite: true,
	jsonSpaces: 4,
});
client.configdb = configdb;

// Require our logger
import * as logger from "./modules/logger.js";
import {
	dir,
} from "console";

// Let's start by getting some useful functions that we'll use throughout
// the bot, like logs and elevation features.
// require("./modules/functions.js")(client);
// since we can't actually use require to just dump it all in anymore, copy functions.js directly.
/*
SINGLE-LINE AWAITMESSAGE
A simple way to grab a single reply, from the user that initiated
the command. Useful to get "precisions" on certain things...
USAGE
const response = await client.awaitReply(msg, "Favourite Color?");
msg.reply(`Oh, I really love ${response} too!`);
*/
client.awaitReply = async (msg, question, limit = 60000) => {
	const filter = m => m.author.id === msg.author.id;
	await msg.channel.send(question);
	try {
		const collected = await msg.channel.awaitMessages(
			filter,
			{
				max: 1,
				time: limit,
				errors: ["time"],
			}
		);
		return collected.first().content;
	}
	catch (e) {
		return false;
	}
};


/*
MESSAGE CLEAN FUNCTION
"Clean" removes @everyone pings, as well as tokens, and makes code blocks
escaped so they're shown more easily. As a bonus it resolves promises
and stringifies objects!
This is mostly only used by the Eval and Exec commands.
*/
client.clean = async (clientObj, text) => {
	if (text && text.constructor.name == "Promise") {
		text = await text;
	}
	if (typeof text !== "string") {
		text = JSON.stringify(text);
	}
	text = text
		.replace(/`/gu, `\`${String.fromCharCode(8203)}`)
		.replace(/@/gu, `@${String.fromCharCode(8203)}`)
		.replace(clientObj.token, "mfa.VkO_2G4Qv3T--NO--lWetW_tjND--TOKEN--QFTm6YGtzq9PH--4U--tG0");

	return text;
};

/* MISCELANEOUS NON-CRITICAL FUNCTIONS */

// EXTENDING NATIVE TYPES IS BAD PRACTICE. Why? Because if JavaScript adds this
// later, this conflicts with native code. Also, if some other lib you use does
// this, a conflict also occurs. KNOWING THIS however, the following 2 methods
// are, we feel, very useful in code.

// <String>.toPropercase() returns a proper-cased string such as:
// "Mary had a little lamb".toProperCase() returns "Mary Had A Little Lamb"
Object.defineProperty(
	String.prototype,
	"toProperCase",
	{
		value() {
			return this.replace(
				/([^\W_]+[^\s-]*) */gu,
				txt => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
			);
		},
	}
);

// <Array>.random() returns a single random element from an array
// [1, 2, 3, 4, 5].random() can return 1, 2, 3, 4 or 5.
Object.defineProperty(
	Array.prototype,
	"random",
	{
		value() {
			return this[Math.floor(Math.random() * this.length)];
		},
	}
);

// `await client.wait(1000);` to "pause" for 1 second.
// client.wait = require("util").promisify(setTimeout);

// These 2 process methods will catch exceptions and give *more details* about the error and stack trace.
process.on("uncaughtException", err => {
	const errorMsg = err.stack.replace(new RegExp(`${__dirname}/`, "gu"), "./");
	logger.error(`Uncaught Exception: ${errorMsg}`);
	// console.error(err);
	// Always best practice to let the code crash on uncaught exceptions.
	// Because you should be catching them anyway.
	process.exit(1);
});

process.on("unhandledRejection", err => {
	logger.error(`Unhandled rejection: ${err}`);
	console.error(err);
});

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
	// Here we load **commands** into memory, as a collection, so they're accessible
	// here and everywhere else.
	const commands = readdirSync("./commands/").filter(file => file.endsWith(".js"));
	for (const file of commands) {
		const props = await import(`./commands/${file}`);
		logger.cmd(`Loading Command: ${props.help.name}. 👌`);
		client.commands.set(props.help.name, props);
		props.conf.aliases.forEach(alias => {
			client.aliases.set(alias, props.help.name);
		});
	}
	// Now we load any **slash** commands you may have in the ./slash directory.
	const slashFiles = readdirSync("./slash").filter(file => file.endsWith(".js"));
	for (const file of slashFiles) {
		const command = await import(`./slash/${file}`);
		const commandName = file.split(".")[0];
		logger.cmd(`Loading Slash command: ${commandName}. 👌`);

		// Now set the name of the command with it's properties.
		client.slashcmds.set(command.commandData().name, command);
	}

	// Now we load any **button** interactions you may have in the ./buttons directory.
	const buttonFiles = readdirSync("./buttons").filter(file => file.endsWith(".js"));
	for (const file of buttonFiles) {
		const button = await import(`./buttons/${file}`);
		const buttonName = file.split(".")[0];
		logger.log(`Loading Button interactions: ${buttonName}. 👌`);

		// Now set the name of the command with it's properties.
		client.buttoncmds.set(button.buttonData.name, button);
	}

	// Then we load events, which will include our message and ready event.
	const eventFiles = readdirSync("./events/").filter(file => file.endsWith(".js"));
	for (const file of eventFiles) {
		const eventModule = await import(`./events/${file}`);
		const event = eventModule.default;

		logger.cmd(`Loading Event: ${event.name}. 👌`);
		// Bind the client to any event, before the existing arguments
		// provided by the discord.js event.
		// This line is awesome by the way. Just sayin'.
		client.on(event.name, (...args) => {
			event.execute(client, ...args);
		});
	}

	// Here we login the client. And do a little check that the configdb is loaded
	client.login(configdb.get("token"));

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
				// continue;
			}
			for (const faq of faqsToLoad) {
				// logger.debug(`./config/${dirname}/faqs/${faq}`);
				const faqentry = await import(`./config/${dirname}/faqs/${faq}`);
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
				// continue;
			}
			for (const trigger of triggersToLoad) {
				// logger.debug(`./config/${dirname}/triggers/${trigger}`);
				const triggerentry = await import(`./config/${dirname}/triggers/${trigger}`);
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

		if (dirname == "directmessage") {
			serverSettings.set("guildname", "directmessage");
		}
		else if (isSnowflake(dirname)) {
			try {
				const guild = await client.guilds.fetch(dirname);
				serverSettings.set("guildname", guild.name);
			}
			catch {
				logger.error(`Couldn't handle ${dirname}`);
			}
		}


		await client.perserversettings.set(`${dirname}-serversettings`, serverSettings);
	}

	// End top-level async/await function.
};

init();
