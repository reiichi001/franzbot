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
		let nicetime;

		if (time.toLowerCase().endsWith("s")) {
			nicetime = `${parseInt(time, 10)} seconds`;
		}
		else if (time.toLowerCase().endsWith("h")) {
			// time in hours, convert to seconds
			nicetime = `${parseInt(time, 10)} hour`;
			if (parseInt(time, 10) !== 1) {
				nicetime = `${nicetime}s`;
			}
		}
		else if (time.toLowerCase() == "off") {
			// time in hours, convert to seconds
			nicetime = 0;
		}
		else {
			// time in minutes, convert to seconds
			nicetime = `${parseInt(time, 10)} minute`;
			if (parseInt(time, 10) !== 1) {
				nicetime = `${nicetime}s`;
			}
		}

		return nicetime === 0
			? channel.send(`Setting ${channel} to a slowmode of one message per user every ${nicetime}.`)
			: channel.send(`Slowmode has been turned off for ${channel}.`);
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
