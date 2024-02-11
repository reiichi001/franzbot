import {
	setSlowmode,
} from '../modules/slowmode.js';

export const run = async (client, message, args) => {
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
		else if (time == "0" || time.toLowerCase() == "off") {
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
			? channel.send(`Slowmode has been turned off for ${channel}.`)
				.then(msg => {
					setTimeout(() => msg.delete(), 5 * 60 * 60);
				})
			: channel.send(`Setting ${channel} to a slowmode of one message per user every ${nicetime}.`)
				.then(msg => {
					setTimeout(() => msg.delete(), 5 * 60 * 60);
				});
	}

	return message.channel.send("Something went wrong with the slowmode command. "
		+ "Please verify that your arguments are correct and try again.")
		.then(msg => {
			setTimeout(() => msg.delete(), 5 * 60 * 60);
		});
};

export const conf = {
	enabled: true,
	guildOnly: false,
	aliases: [],
};

export const help = {
	name: "slowmode",
	category: "Admin",
	description: "Makes a channel slowmode. User must have the `Moderator` role to use.",
	usage: "slowmode <channel> <time in minutes> <reason>",
};
