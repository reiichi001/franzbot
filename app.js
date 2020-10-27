const Discord = require("discord.js");
const {
	promisify,
} = require("util");
const readdir = promisify(require("fs").readdir);
const Enmap = require("enmap");

// set up intents
// const myIntents = new Discord.Intents();
//  myIntents.add('GUILDS', 'GUILD_MEMBERS', 'GUILD_MESSAGES', 'GUILD_MESSAGE_REACTIONS');

const client = new Discord.Client();

const config = require("./config.json");
// We also need to make sure we're attaching the config to the CLIENT so it's accessible everywhere!
client.config = config;

// Require our logger
client.logger = require("./modules/Logger");

// Let's start by getting some useful functions that we'll use throughout
// the bot, like logs and elevation features.
require("./modules/functions.js")(client);

// Aliases and commands are put in collections where they can be read from,
// catalogued, listed, etc.
client.commands = new Enmap();
client.aliases = new Enmap();

const init = async () => {
	// Here we load **commands** into memory, as a collection, so they're accessible
	// here and everywhere else.
	const cmdFiles = await readdir("./commands/");
	client.logger.log(`Loading a total of ${cmdFiles.length} commands.`);
	cmdFiles.forEach(f => {
		if (!f.endsWith(".js")) {
			return;
		}
		const response = client.loadCommand(f);
		if (response) {
			console.log(response);
		}
	});

	// Then we load events, which will include our message and ready event.
	const evtFiles = await readdir("./events/");
	client.logger.log(`Loading a total of ${evtFiles.length} events.`);
	evtFiles.forEach(file => {
		const eventName = file.split(".")[0];
		client.logger.log(`Loading Event: ${eventName}`);
		const event = require(`./events/${file}`);
		// Bind the client to any event, before the existing arguments
		// provided by the discord.js event.
		// This line is awesome by the way. Just sayin'.
		client.on(eventName, event.bind(null, client));
	});


	// Here we login the client.
	client.login(client.config.token);

	// End top-level async/await function.
};

init();
