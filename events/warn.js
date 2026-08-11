const {
	Events,
} = require('discord.js');

module.exports = {
	name: Events.Warn,
	execute(client, warn) {
		client.logger.log(`A warn event was sent by Discord.js: \n${warn}`, "warn");
	},
};
