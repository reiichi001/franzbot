import {
	ChannelType,
} from 'discord.js';
import * as logger from '../../../modules/logger.js';
import {
	SECOND, MINUTE, timeoutSet, timeoutEnded, resetTimeout,
} from '../../../modules/triggerTimeoutManager.js';

export const execute = async (client, message) => {
	if (message.channel.type === ChannelType.GuildAnnouncement) {
		message.crosspost()
			.then(() => logger.log(`Crossposted an announcement in ${message.channel} in ${message.guild.name}.`))
			.catch(e => {
				logger.error(e);
			});
	}
};

export const info = {
	name: "announcement publisher",
	description: "automatically publishes messages in announcement channels",
	type: "helper",
};
