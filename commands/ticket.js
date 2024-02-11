/* eslint-disable max-len */
/* eslint-disable consistent-return */
import * as logger from "../modules/logger.js";
import {
	createChannel,
} from '../modules/createTicketChannel.js';

import {
	MessageMentions,
} from 'discord.js';

export const run = async (client, message, args) => {
	logger.debug(`GUILD: ${message.guild.id}, CHANNEL: ${message.channel.id}, ARGS: ${args} ${typeof args}`);
	let user = message.member;
	let reason = null;
	// args = args.split(',');
	if (args.length > 0) {
		// check if the first arg is a mention or ID number
		// const matches = args[0].match(/^<@!?(\d+)>$/u);
		const matches = args[0].match(MessageMentions.USERS_PATTERN);
		if (matches) {
			logger.debug(`Matches: ${JSON.stringify(matches)}`);
			user = await message.guild.members.fetch(`${matches[1]}`);
			args.shift();
		}
		// merge args into a reason
		reason = args.length == 1 ? args[0] : args.join(' ');
	}

	// logger.debug(`User: ${user}\nreason: ${reason}`);

	await createChannel(message.guild, user, reason);

	await message.delete();
};

export const conf = {
	enabled: true,
	guildOnly: true,
	aliases: [],
};

export const help = {
	name: "ticket",
	category: "System",
	description: "Creates a help ticket",
	usage: "ticket <memberIDnumber> <topic>",
};
