exports.run = async (client, message, args) => { // eslint-disable-line no-unused-vars
	/*
	const ZuTriggers = [
		client.config.GUILDID_TESTING, // franzbot testing - general
		client.config.GUILDID_ZU, // Zu - general
	];
	if (!ZuTriggers.includes(message.guild.id)) {
		return message.reply("\u200Bthis command doesn't work here.")
			.then(message.delete({
				timeout: 5000,
				reason: client.config.AUDITLOG_COMMON,
			}));
	}
	*/

	const shutupESLint = false;

	return message.channel.send(message.mentions.users.first()
		? `\u200B(っ´▽｀)っ${message.mentions.users.reduce((prev, curr) => `${prev} ${curr}`)}`
		: "\u200BI don't know who to hug. >_>");
};

exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases: [],
};

exports.help = {
	name: "hug",
	category: "Fun",
	description: "Sends virtual hug. Can send many hugs.",
	usage: "hug @usermention",
};
