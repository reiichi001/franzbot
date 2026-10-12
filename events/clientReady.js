const {
	ActivityType, Events,
} = require('discord.js');

module.exports = {
	name: Events.ClientReady,
	once: true,
	async execute(client) {
		// Log that the bot is online.
		const tag = client.user.tag;
		const usercount = client.users.cache.size;
		const users = `user${usercount == 1 ? '' : 's'}`;
		const servercount = client.guilds.cache.size;
		const servers = `server${servercount == 1 ? '' : 's'}`;
		client.logger.log(
			`${tag}, ready to serve ${usercount} ${users} in ${servercount} ${servers}.`,
			"ready"
		);

		// Make the bot "play the game" which is the help command with default prefix.
		await client.user.setPresence({
			activities: [
				{
					name: 'Franzbot Reborn',
					type: ActivityType.Playing,
				},
			],
			status: 'online',
		});

		// Deploy all global slash commands (every guild + DMs).
		const globalCmds = [...client.slashcmds.values()].map(c => c.commandData());
		if (globalCmds.length > 0) {
			client.application?.commands.set(globalCmds).catch(err => client.logger.error(`Failed to deploy global slash commands: ${err}`));
		}

		// Deploy guild slash commands ONLY to the whitelist. guild.commands.set()
		// REPLACES the guild's command list, so push the FULL guild_slash set
		// (faq override, logd, logxl, ticket, slowmode) or the others are wiped.
		const guildCmds = [...client.guildSlashcmds.values()].map(c => c.commandData(client));
		const guildIds = [
			client.configdb.get("GUILDID_TESTING"),
			client.configdb.get("GUILDID_GOAT"),
		];
		for (const id of guildIds) {
			const guild = client.guilds.cache.get(id);
			if (guild) {
				guild.commands.set(guildCmds).catch(err => client.logger.error(`Failed to deploy guild commands to ${guild.name}: ${err}`));
			}
		}
	},
};
