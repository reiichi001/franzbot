export const run = (client, message) => {
	const ZuTriggers = [
		client.configdb.get("GUILDID_TESTING"), // franzbot testing - general
		client.configdb.get("GUILDID_ZU"), // Zu - general
	];
	if (!ZuTriggers.includes(message.guild.id)) {
		message
			.reply("\u200Bthis command doesn't work here.")
			.then(
				setTimeout(() => message.delete(), 5000)
			);
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
				setTimeout(() => msg.delete(), 5000);
			})
			.then(
				setTimeout(() => message.delete(), 5000)
			);
	}
};

export const conf = {
	enabled: true,
	guildOnly: false,
	aliases: [],
};

export const help = {
	name: "tosagree",
	category: "Management",
	description: `Grants you the guest user so you can see things. `
	+ `You only need to do this once. Ask an Officer or Admin to switch you to member later.`,
	usage: "tosagree",
};
