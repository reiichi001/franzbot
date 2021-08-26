exports.run = (client, message, args) => {
	const ZuTriggers = [
		client.config.GUILDID_TESTING, // franzbot testing - general
		client.config.GUILDID_ZU, // Zu - general
	];
	if (!ZuTriggers.includes(message.guild.id)) {
		return message.reply("\u200Bthis command doesn't work here.")
			.then(
				setTimeout(() => message.delete(), 5000)
			);
	}

	if (!args || args.length < 1) {
		return message.reply("\u200BMust provide a command name to reload.");
	}
	const commandName = args[0];
	// Check if the command exists and is valid
	if (!client.commands.has(commandName)) {
		return message.reply("\u200BThat command does not exist");
	}
	// the path is relative to the *current folder*, so just ./filename.js
	delete require.cache[require.resolve(`./${commandName}.js`)];
	// We also need to delete and reload the command from the client.commands Enmap
	client.commands.delete(commandName);
	const props = require(`./${commandName}.js`);
	client.commands.set(commandName, props);
	return message
		.reply(`\u200BThe command ${commandName} has been reloaded`)
		.then(msg => {
			setTimeout(() => msg.delete(), 5000);
		})
		.then(
			setTimeout(() => message.delete(), 5000)
		);
};

exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases: [],
};

exports.help = {
	name: "reload",
	category: "System",
	description: "Reloads a Franzbot command. Please don't unless you know what you're doing.",
	usage: "reload commandname",
};
