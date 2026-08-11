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

	const runes = require('stringz');
	let output = "\u200B(╯°□°）╯︵ ";
	let joinedargs = args.join(" ");
	console.log(`Starting with: ${joinedargs}\n`);
	message.mentions.users.forEach(user => {
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

	const runifiedoutput = runes.toArray(joinedargs);
	const chars = require('../modules/flip.js');

	Object.keys(chars).forEach(key => {
		const value = chars[key];
		if (!chars[value]) {
			chars[value] = key;
		}
	});

	let result = "";
	let c = runes.length(joinedargs);
	let ch = "";

	for (; c >= 0; --c) {
		ch = runifiedoutput[c];
		// console.log(ch);
		result += chars[ch] || ch || "";
	}

	console.log(result);


	if (joinedargs) {
		output += result;
	}
	else {
		output += "This command requires an argument.";
	}


	return message.channel.send(output);
};

exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases: [],
};

exports.help = {
	name: "flip",
	category: "Fun",
	description: "Flips provided text. Franzbot is strong enough to flip multiple people.",
	usage: "flip this text",
};
