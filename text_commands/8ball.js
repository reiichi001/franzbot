exports.run = async (client, message, args) => { // eslint-disable-line no-unused-vars
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

	const predict = require('eightball');
	return message.channel.send(`\u200B${predict()}`);
};


exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases: [],
};

exports.help = {
	name: "8ball",
	category: "Fun",
	description: "Astrologians hate this one secret trick to telling the future.",
	usage: "8ball",
};
