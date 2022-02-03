const {
	setSlowmode,
} = require("../modules/slowmode.js");

exports.run = async (client, message, args) => {
	// eslint-disable-line no-unused-vars
	const selectedChannel = args.shift();
	const time = args.shift();
	const reason = args.shift();

	const channel = client.channels.cache.get(selectedChannel.replace('<#', '').replace('>', ''));

	const success = await setSlowmode(message.member, channel, message.channel, time, reason);

	if (success) {
		return channel.send(`Setting ${channel} to a slowmode of one message per user every ${time} minutes.`);
	}

	return message.channel.send("Something went wrong, please verify that your arguments are correct and try again.");
};

exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases: [],
};

exports.help = {
	name: "slowmode",
	category: "Admin",
	description: "Makes a channel slowmode. User must have the `Moderator` role to use.",
	usage: "slowmode <channel> <time in minutes> <reason>",
};
