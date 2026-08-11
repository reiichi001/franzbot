exports.run = async (client, message, args) => { // eslint-disable-line no-unused-vars
	// console.log(`All slash commands: ${[...client.slashcmds.keys()]}`);

	if (message.author.id !== "60851293232574464") {
		await message.reply("You don't have permission to run that.");
		return;
	}

	// Filter the slash commands to find guild only ones.
	const guildCmds = client.slashcmds.filter(c => c.guildOnly).map(c => c.commandData(client, message));

	// Give the user a notification the commands are deploying.
	await message.channel.send("Deploying guild commands!");

	// We'll use set but please keep in mind that `set` is overkill for a singular command.
	// Set the guild commands like
	await client.guilds.cache.get(message.guild.id)?.commands.set(guildCmds)
		.then(c => {
			// console.log([...guildCmds.keys()].toString());
			// console.log(c);
		})
		.catch(console.error);

	// Reply to the user that the commands have been deployed.
	await message.channel.send("Guild commands deployed!");
};

exports.conf = {
	enabled: true,
	guildOnly: true,
	aliases: [],
};

exports.help = {
	name: "deploy",
	category: "System",
	description: "This will deploy all guild slash commands.",
	usage: "deploy",
};
