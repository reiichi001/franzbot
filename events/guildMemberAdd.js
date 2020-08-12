// This event executes when a new member joins a server. Let's welcome them!
module.exports = (client, member) => {
// Replace the placeholders in the welcome message with actual data
// const welcomeMessage = `Welcome, ${member.user.tag}!`;
// console.log(`New User "${member.user.username}" has joined "${member.guild.name}"` );

	// Send the welcome message to the welcome channel
	// There's a place for more configs here.

	const ZuTriggers = [
		client.config.GUILDID_TESTING, // franzbot testing - general
		client.config.GUILDID_ZU, // Zu - general
	];

	// if (member.guild.id == client.config.GUILDID_ZU)
	if (ZuTriggers.includes(member.guild.id)) {
		console.log(`New member found in ZuTriggers: ${member.user.tag}`);

		const embedobj = {
			"embed": {
				"title": `Welcome to ${member.guild.name}!`,
				"description": `Welcome to **Zu**, ${member.user} \n\nPlease check the ${member.guild.channels.cache.find(c => c.name === "server-rules")} channel for more details and get yourself the basic user assigned to see channels.`,
				"color": client.config.EMBED_NORMAL_COLOR,
				"timestamp": new Date(),
				"thumbnail": {
					"url": member.guild.iconURL().replace(".jpg", ".webp?size=1024"),
				},
			},
		};

		member
			.guild
			.channels
			.cache
			.find(c => c.name === "welcome")
			.send(embedobj)
			.catch(console.error);
	}


// member.guild.channels.find(c => c.name === "welcome").send(embedobj).catch(console.error);
//
// console.log(member.guild.iconURL);
// console.log(member.guild.iconURL.options.format='webp');
};
