function randomInt(low, high) {
	return Math.floor(Math.random() * (high - low) + low);
}

exports.run = async (client, message, args) => {
	/*
	const ZuTriggers = [
		client.configdb.get("GUILDID_TESTING"), // franzbot testing - general
		client.configdb.get("GUILDID_ZU"), // Zu - general
	];
	if (!ZuTriggers.includes(message.guild.id)) {
		return message.reply("\u200Bthis command doesn't work here.")
			.then(message.delete({
				timeout: 5000,
				reason: client.configdb.get("AUDITLOG_COMMON"),
			}));
	}
	*/

	let output = "";

	let joinedargs = args.join(" and ");
	console.log(`Starting with: ${joinedargs}\n`);
	for (const user of message.mentions.users.values()) {
		// make a text replacement for mention -> username string

		const useridstring = `<@${user.id}>`;
		const usernickidstring = `<@!${user.id}>`;

		const usernamestring = user.username;
		// A single-member fetch is intent-free (GUILD_MEMBERS gates only the full
		// list). It can still fail — the user left, or this is a DM with no guild —
		// so fall back to the plain username.
		const member = await message.guild?.members.fetch(user.id).catch(() => null);
		const usernickstring = member?.nickname || usernamestring;

		console.log(`User: ${user.id}\n`
			+ `Nick: ${usernickstring}\n`
			+ `Name: ${usernamestring}`);

		joinedargs = joinedargs
			.replace(useridstring, usernamestring)
			.replace(usernickidstring, usernickstring);
	}

	const rating = randomInt(0, 100);

	if (joinedargs) {
		output += `Checking the compatibility of ${joinedargs}. It's **${rating}**%\n\n`;
		for (let i = 0; i < rating; i++) {
			output += ":star:";
		}
	}
	else {
		output += "I don't understand. Please just mention two people.";
	}

	return message.channel.send(`\u200B${output}`);
};

exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases: [],
};

exports.help = {
	name: "ship",
	category: "Fun",
	description: "Franzbot is biased.",
	usage: "ship @person1 @person2",
};
