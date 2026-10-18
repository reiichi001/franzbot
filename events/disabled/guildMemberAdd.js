/*
 * DISABLED — kept for reference, not loaded.
 *
 * The event loader (app.js) only reads top-level files in events/, so anything
 * in this folder is skipped. This handler fires on GUILD_MEMBER_ADD, which is
 * gated behind the privileged GUILD_MEMBERS intent; Franzbot no longer
 * requests that intent, so it can never run. Zu should use Discord's
 * community/onboarding features for welcomes instead. Restore this file to
 * events/ only if the intent is granted again.
 */
const {
	Events,
} = require('discord.js');

// This event executes when a new member joins a server. Let's welcome them!
module.exports = {
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

		// if (member.guild.id == client.config.GUILDID_ZU)
		if (ZuTriggers.includes(member.guild.id)) {
			console.log(`New member found in ZuTriggers: ${member.user.tag}`);
			console.log(`New member found in ZuTriggers: ${member.user}`);
			console.log(`New member found in ZuTriggers: ${member}`);

			if (member.partial) {
				console.log("This was a partial member. Fetching the rest.");
				// Resolve the partial into a full member before using it below.
				member = await member.fetch(member.id);
			}

			const embedobj = {
				title: `Welcome to ${member.guild.name}!`,
				description: `Welcome to **Zu**, ${member} \n\n`
					+ `Please check the ${member.guild.channels.cache.find(c => c.name === "server-rules")} `
					+ `channel for more details and get yourself the basic user assigned to see channels.`,
				color: client.configdb.get("EMBED_NORMAL_COLOR"),
				timestamp: new Date(),
				thumbnail: {
					"url": member.guild.iconURL().replace(".jpg", ".webp?size=1024"),
				},
			};

			member
				.guild
				.channels
				.cache
				.find(c => c.name === "welcome")
				.send({
					content: `${member}`,
					embeds: [embedobj],
				})
				.catch(console.error);
		}


		// member.guild.channels.find(c => c.name === "welcome").send(embedobj).catch(console.error);
		//
		// console.log(member.guild.iconURL);
		// console.log(member.guild.iconURL.options.format='webp');
	},
};
