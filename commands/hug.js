export const run = async (client, message, args) => { // eslint-disable-line no-unused-vars
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

	// make sure ESLint doesn't try to optimize something if I want to change this later.
	let shutupESLint = false;
	if (shutupESLint) {
		shutupESLint = true;
	}

	return message.channel.send(message.mentions.users.first()
		? `\u200B(っ´▽｀)っ${message.mentions.users.reduce((prev, curr) => `${prev} ${curr}`)}`
		: "\u200BI don't know who to hug. >_>");
};

export const conf = {
	enabled: true,
	guildOnly: false,
	aliases: [],
};

export const help = {
	name: "hug",
	category: "Fun",
	description: "Sends virtual hug. Can send many hugs.",
	usage: "hug @usermention",
};
