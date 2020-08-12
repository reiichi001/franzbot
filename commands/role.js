exports.run = (client, message, args) => {
	// toggle a role for Zu

	if (args.length == 1) {
		const addThisRole = message.guild.roles.cache.find(role => role.name === args[0]);
		console.log(`the role is: ${addThisRole}`);


		if (!addThisRole) {
			message.reply(`\u200BERROR: Cannot find the role "${args[0]}" on this server. Please check spelling and capitalization, or ask an Officer/Admin to set the role for you.`);
		}
		else if (message.member.roles.cache.get(addThisRole.id)) {
			message.member.roles.remove(addThisRole).catch(console.error);
			message.reply(`\u200BRemoving role ${addThisRole.name} for you.`).then(msg => {
				msg.delete({
					timeout: 5000,
					reason: 'Cleaning up uneeded message',
				});
			})
				.then(message.delete({
					timeout: 5000,
					reason: 'Cleaning up uneeded message',
				}));
		}
		else {
			message.member.roles.add(addThisRole).catch(console.error);
			message.reply(`\u200BAdding role ${addThisRole.name} for you.`).then(msg => {
				msg.delete({
					timeout: 5000,
					reason: 'Cleaning up uneeded message',
				});
			})
				.then(message.delete({
					timeout: 5000,
					reason: 'Cleaning up uneeded message',
				}));
		}
	}
	else {
		message.reply("\u200BI didn't understand what you meant by that.");
	}
};

exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases: [
		"togglerole",
		"setrole",
		"addrole",
		"removerole",
	],
};

exports.help = {
	name: "role",
	category: "Management",
	description: "Toggles a user role. Can only toggle roles below bot's permissions.",
	usage: "role role-name",
};
