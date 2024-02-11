function randomInt(low, high) {
	return Math.floor(Math.random() * (high - low) + low);
}

export const run = async (client, message, args) => {
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

	let joinedargs = args.join(" ");
	console.log(`Starting with: ${joinedargs}\n`);
	message.mentions.users.each(user => {
		// make a text replacement for mention -> username string

		const useridstring = `<@${user.id}>`;
		const usernickidstring = `<@!${user.id}>`;

		const usernamestring = user.username;
		const usernickstring = message.guild.members.cache.get(user.id).nickname || usernamestring;

		console.log(`User: ${user.id}\n`
            + `Nick: ${usernickstring}\n`
            + `Name: ${usernamestring}`);

		joinedargs = joinedargs
			.replace(useridstring, usernamestring)
			.replace(usernickidstring, usernickstring);
	});

	const rating = randomInt(0, 10);

	if (joinedargs) {
		output += `${joinedargs}? **${rating}**/10\n\n`;
		for (let i = 0; i < rating; i++) {
			output += ":star:";
		}
	}
	else {
		output += "You need to provide something for me to rate.";
	}

	return message.channel.send(`\u200B${output}`);
};

export const conf = {
	enabled: true,
	guildOnly: false,
	aliases: [],
};

export const help = {
	name: "rate",
	category: "Fun",
	description: "Franzbot is biased.",
	usage: "rate <input>",
};
