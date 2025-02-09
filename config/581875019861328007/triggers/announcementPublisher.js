const {
	ChannelType,
} = require('discord.js');
const logger = require("../../../modules/Logger");
const {
	SECOND, MINUTE, timeoutSet, timeoutEnded, resetTimeout,
} = require("../../../modules/triggerTimeoutManager");

exports.execute = async (client, message) => {
	if (message.channel.type === ChannelType.GuildAnnouncement) {
		message.crosspost()
			.then(() => logger.log(`Crossposted an announcement in ${message.channel} in ${message.guild.name}.`))
			.catch(e => {
				logger.error(e);
			});
	}
};

exports.info = {
	name: "announcement publisher",
	description: "automatically publishes messages in announcement channels",
	type: "helper",
};
