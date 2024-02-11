/* eslint-disable consistent-return */
export const run = (client, message, args) => {
	// toggle a role for Zu

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

	if (args.length == 1) {
		const addThisRole = message.guild.roles.cache.find(role => role.name === args[0]);
		console.log(`the role is: ${addThisRole}`);


		let textresponse = "";

		if (!addThisRole) {
			message.reply(`\u200BERROR: Cannot find the role "${args[0]}" on this server. `
			+ `Please check spelling and capitalization, or ask an Officer/Admin to set the role for you.`).then(
				setTimeout(() => message.delete(), 5000)
			);
		}
		else if (message.member.roles.cache.get(addThisRole.id)) {
			message.member.roles.remove(addThisRole).catch(console.error);
			textresponse = `\u200BRemoving role ${addThisRole.name} for you.`;
		}
		else {
			message.member.roles.add(addThisRole).catch(console.error);
			textresponse = `\u200BAdding role ${addThisRole.name} for you.`;
		}

		message.reply(textresponse).then(msg => {
			setTimeout(() => msg.delete(), 5000);
		})
			.then(
				setTimeout(() => message.delete(), 5000)
			);
	}
	else {
		message.reply("\u200BI didn't understand what you meant by that.");
	}
};

export const conf = {
	enabled: true,
	guildOnly: false,
	aliases: [
		"togglerole",
		"setrole",
		"addrole",
		"removerole",
	],
};

export const help = {
	name: "role",
	category: "Management",
	description: "Toggles a user role. Can only toggle roles below bot's permissions.",
	usage: "role role-name",
};
