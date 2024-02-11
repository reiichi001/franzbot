import {
	ActivityType, Events,
} from 'discord.js';
import * as logger from "../modules/logger.js";

export default {
	name: Events.ClientReady,
	once: true,
	async execute(client) {
	// Log that the bot is online.
		const tag = client.user.tag;
		const usercount = client.users.cache.size;
		const users = `user${usercount == 1 ? '' : 's'}`;
		const servercount = client.guilds.cache.size;
		const servers = `server${servercount == 1 ? '' : 's'}`;
		logger.log(
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
	},

};
