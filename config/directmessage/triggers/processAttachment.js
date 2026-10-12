
const {
	ChannelType,
} = require('discord.js');
const URLSafeBase64 = require('urlsafe-base64');
const logger = require('../../../modules/Logger.js');
const dmRelay = require("../../../modules/dmRelay.js");
const {
	SECOND, MINUTE, timeoutSet, timeoutEnded, resetTimeout,
} = require('../../../modules/triggerTimeoutManager.js');


exports.execute = async (client, message) => {
	// let's do some setup
	const isDirectMessage = message.channel.type == ChannelType.DM || message.channel.type == ChannelType.GroupDM;

	if (message.attachments.size > 0) {
		console.log("Found an attachment in this direct message");

		const needToRemoveAttachments = false;
		message.attachments.forEach(async attachment => {
			console.log(attachment.name);

			// Route through the DM relay chooser: special file types (tspack/dmp/
			// crash/injector) keep their dedicated path; generic parseable logs are
			// parsed, then offered a button to pick which server relays them.
			await dmRelay.handleLog(client, message, attachment, message.author);
		});
	}
};

exports.info = {
	name: "Process Attachment - DM edition",
	description: "Parses any incoming logs / handles relays",
	type: "logs",
};
