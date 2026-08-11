exports.run = (client, message, args) => {
	const ZuTriggers = [
		client.configdb.get("GUILDID_TESTING"), // franzbot testing - general
		client.configdb.get("GUILDID_ZU"), // Zu - general
	];
	if (!ZuTriggers.includes(message.guild.id)) {
		return message.reply("\u200Bthis command doesn't work here.")
			.then(
				setTimeout(() => message.delete(), 5000)
			);
	}

	// toggle a role for Zu

	if (args.length == 0) {
		const addThisRole = message.guild.roles.find(role => role.name === args[0]);
		if (!addThisRole) {
			return message.reply(`\u200BERROR: Cannot find the role "${args[0]}" on this server.`);
		}
		if (message.member.roles.has(addThisRole.id)) {
			message.member.removeRole(addThisRole).catch(console.error);
			return message
				.reply(`\u200BRemoving role ${addThisRole.name} for you.`)
				.then(msg => {
					msg.delete(5000);
				})
				.then(message.delete(5000));
		}

		message.member.addRole(addThisRole).catch(console.error);
		return message
			.reply(`\u200BAdding role ${addThisRole.name} for you.`)
			.then(msg => {
				msg.delete(5000);
			})
			.then(message.delete(5000));
	}

	return message.reply("\u200BI didn't understand what you meant by that.");
};

exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases: [
		"allroles",
		"roles",
	],
};

exports.help = {
	name: "postroles",
	category: "Management",
	description: "Posts a fancy message with reactions for all of the available server roles.",
	usage: "postroles",
};
