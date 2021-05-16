module.exports = async (client, messageUpdate) => {
	// Turns out we probably don't need this. But it's here just in case we ever do.
	/*
	const GoatTriggers = [
		client.config.GUILDID_TESTING, // franzbot testing - general
		client.config.GUILDID_GOAT, // Goatplace - general
	];

	// Triggers for Goatplace
	if (GoatTriggers.includes(messageUpdate.guild.id)) {
		console.log(`Found in GoatTriggers for edits: ${messageUpdate.channel.name}`);

		// autopublish in announcement channels
		if (messageUpdate.channel.type === 'news') {
			messageUpdate.crosspost()
				.then(() => console.log('Crossposted the announcement'))
				.catch(console.error);
		}
	}
	*/
};
