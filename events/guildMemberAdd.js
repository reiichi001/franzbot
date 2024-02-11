import {
	Events, EmbedBuilder,
} from 'discord.js';
import logger, {
	log, debug, cmd, warn,
} from "../modules/logger.js";

// This event executes when a new member joins a server. Let's welcome them!
export default {
	name: Events.GuildMemberAdd,
	async execute(client, member) {
		// Replace the placeholders in the welcome message with actual data
		// const welcomeMessage = `Welcome, ${member.user.tag}!`;
		// console.log(`New User "${member.user.username}" has joined "${member.guild.name}"` );

		// Send the welcome message to the welcome channel
		// There's a place for more configs here.

		const ZuTriggers = [
			client.configdb.get("GUILDID_TESTING"), // franzbot testing - general
			client.configdb.get("GUILDID_ZU"), // Zu - general
		];

		// if (member.guild.id == client.configdb.get("GUILDID_ZU"))
		if (ZuTriggers.includes(member.guild.id)) {
			console.log(`New member found in ZuTriggers: ${member.user.tag}`);
			console.log(`New member found in ZuTriggers: ${member.user}`);
			console.log(`New member found in ZuTriggers: ${member}`);

			if (member.partial) {
				console.log("This was a partial member. Fetching the rest.");
				member = member.fetch(member.id);
			}

			const newGuildMemberEmbed = new EmbedBuilder()
				.setTitle(`Welcome to ${member.guild.name}!`)
				.setDescription(`Welcome to **Zu**, ${member} \n\n`
					+ `Please check the ${member.guild.channels.cache.find(c => c.name === "server-rules")} `
					+ `channel for more details and get yourself the basic user assigned to see channels.`)
				.setColor(client.configdb.get("EMBED_NORMAL_COLOR"))
				.setTimestamp(new Date())
				.setThumbnail(member.guild.iconURL().replace(".jpg", ".webp?size=1024"));

			member
				.guild
				.channels
				.cache
				.find(c => c.name === "welcome")
				.send({
					content: `${member}`,
					embeds: [newGuildMemberEmbed],
				})
				.catch(console.error);
		}


		// member.guild.channels.find(c => c.name === "welcome").send(embedobj).catch(console.error);
		//
		// console.log(member.guild.iconURL);
		// console.log(member.guild.iconURL.options.format='webp');
	},
};
