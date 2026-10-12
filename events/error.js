const {
	Events,
} = require('discord.js');

module.exports = {
	name: Events.Error,
	execute(client, error) {
		client.logger.log(`An error event was sent by Discord.js: \n${error}`, "error");
	},
};
