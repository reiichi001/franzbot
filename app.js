const Discord = require("discord.js");
const {
	promisify,
} = require("util");
const readdir = promisify(require("fs").readdir);
const Enmap = require("enmap");

//const { getResponse } = require('./commands/faq.js')

// set up intents
const myIntents = new Discord.Intents();
myIntents.add('GUILDS', 'GUILD_MESSAGES', 'GUILD_MESSAGE_REACTIONS');

const client = new Discord.Client({ intents: myIntents.bitfield });

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

	const commandData = {
		name: 'faq',
		description: 'Get info about a specific topic!',
		options: [{
			name: 'faq',
			type: 'STRING',
			description: 'The FAQ entry to be shown',
			required: true,
			choices: [
				{
					"name": "Getting a XIVLauncher Log",
					"value": "logxl"
				},
				{
					"name": "Getting a Dalamud Log",
					"value": "logd"
				},
				{
					"name": "Antivirus Guide",
					"value": "av"
				},
				{
					"name": "VC Redist & .NET Framework",
					"value": "redist"
				},
				{
					"name": "Game Path/Location",
					"value": "gamepath"
				},
				{
					"name": "Moving the game/XL to a new PC",
					"value": "migrate"
				},
				{
					"name": "Repairing bad game installations",
					"value": "repair"
				},
				{
					"name": "Resources for plugin development",
					"value": "dev"
				},
				{
					"name": "Show all FAQs",
					"value": "help"
				}
			]
		}],
	};

	client.once('ready', () => {
		// Creating a guild-specific command for Goat Place

		try
		{
			client.guilds.cache.get('581875019861328007').commands.create(commandData);
		} catch(error)
		{
			console.error("Could not register FAQ command.");
			console.error(error);
		}
	});

	client.on('interaction', async interaction => {
		// If the interaction isn't a slash command, return
		if (interaction.isCommand()) {
			// Check if it is the correct command
			if (interaction.commandName === 'faq') {
				// Get the input of the user
				const input = interaction.options.get('faq').value;

				var responses = await getResponse(client, interaction.guild, input);
				responses = responses.map(function (v) {
					return v.embed;
				});

				interaction.reply({
					embeds: responses
				});
			}
		}
	});

	// Here we login the client.
	client.login(client.config.token);

	// End top-level async/await function.
};

init();
