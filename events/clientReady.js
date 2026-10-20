const {
	ActivityType, Events,
} = require('discord.js');
const {
	configuredGuildIds,
} = require('../modules/configuredGuildIds');

module.exports = {
	name: Events.ClientReady,
	once: true,
	async execute(client) {
		// Log that the bot is online. users.cache only holds users the gateway has
		// already sent us, which without MESSAGE_CONTENT/GUILD_MEMBERS is roughly
		// just the bot itself. memberCount arrives with each guild at READY, so it
		// is both accurate and free.
		const tag = client.user.tag;
		const membercount = client.guilds.cache.reduce(
			(total, guild) => total + (guild.memberCount ?? 0),
			0
		);
		const members = `member${membercount == 1 ? '' : 's'}`;
		const servercount = client.guilds.cache.size;
		const servers = `server${servercount == 1 ? '' : 's'}`;
		client.logger.log(
			`${tag}, ready to serve ${membercount} ${members} in ${servercount} ${servers}.`,
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

		// Deploy guild slash commands to every configured server the running
		// token has joined. guild.commands.set() REPLACES the guild's command
		// list, so push the FULL guild command set — guild_slash (faq override,
		// uploadlog, attachmentnotice, slowmode, ...) plus the context-menu
		// commands in application_commands — or the others are wiped.
		const guildCmds = [
			...client.guildSlashcmds.values(),
			...client.applicationcmds.values(),
		].map(c => c.commandData(client));
		const configured = configuredGuildIds();
		// Cross-check the config folders against the guilds this token is in.
		// Membership arrives in the READY payload, so this needs no REST call;
		// targeting only the intersection keeps a token from pushing commands at
		// servers it cannot see (404 Unknown Guild).
		const joined = configured.filter(id => client.guilds.cache.has(id));
		const configuredNotJoined = configured.filter(id => !client.guilds.cache.has(id));
		const joinedNotConfigured = [...client.guilds.cache.keys()].filter(id => !configured.includes(id));

		if (configuredNotJoined.length > 0) {
			client.logger.warn(`Configured but not joined by this token, skipping: ${configuredNotJoined.join(', ')}`);
		}
		if (joinedNotConfigured.length > 0) {
			client.logger.debug(`Joined but not configured, no commands deployed: ${joinedNotConfigured.join(', ')}`);
		}

		for (const id of joined) {
			const guild = client.guilds.cache.get(id);
			guild.commands.set(guildCmds)
				.then(() => client.logger.log(`Deployed guild slash commands to ${guild.name}`, "cmd"))
				.catch(err => client.logger.error(`Failed to deploy guild commands to ${guild.name}: ${err}`));
		}
	},
};
