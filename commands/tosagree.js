exports.run = (client, message) => {
	const ZuTriggers = [
		client.config.GUILDID_TESTING, // franzbot testing - general
		client.config.GUILDID_ZU, // Zu - general
	];
	if (!ZuTriggers.includes(message.guild.id)) {
		message
			.reply("\u200Bthis command doesn't work here.")
			.then(message.delete({
				timeout: 5000,
				reason: 'Cleaning up uneeded message',
			}));
		return; // this command
	}
	// toggle a role for Zu

	const addThisRole = message.guild.roles.cache.find(role => role.name === "Guest");
	if (!addThisRole) {
		message.reply("\u200BERROR: Something has gone terribly wrong.");
	}
	else if (!message.member.roles.cache.get(addThisRole.id)) {
		message.member.roles.add(addThisRole).catch(console.error);
		message.reply(`\u200BAdding role ${addThisRole.name} for you.`)
			.then(msg => {
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
};

exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases: [],
};

exports.help = {
	name: "tosagree",
	category: "Management",
	description: "Grants you the guest user so you can see things. You only need to do this once. Ask an Officer or Admin to switch you to member later.",
	usage: "tosagree",
};
