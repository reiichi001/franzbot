
const {
	ChannelType,
} = require('discord.js');
const URLSafeBase64 = require('urlsafe-base64');
const logger = require('../../../modules/Logger.js');
const {
	parseLog,
} = require("../../../modules/parseLog.js");
const {
	relayFile,
} = require("../../../modules/relayFile.js");
const {
	SECOND, MINUTE, timeoutSet, timeoutEnded, resetTimeout,
} = require('../../../modules/triggerTimeoutManager.js');

exports.execute = async (client, message) => {
	if (message.attachments.size > 0) {
		console.log("Found an attachment in this message");

		let needToRemoveAttachments = false;
		const relayedFiles = [];

		const numAttachments = await message.attachments.size;
		for (let i = 0; i < numAttachments; i++) {
			const attachment = await message.attachments.at(i);
			// }
			// await message.attachments.forEach(async attachment => {
			console.log(attachment.name);


			// Returns true if attachments need to be removed.
			if (await relayFile(client, message, attachment, message.author, message.channel, needToRemoveAttachments)) {
				logger.debug(`We need to remove the message containing ${attachment.name}`);

				needToRemoveAttachments = true;
				relayedFiles.push(attachment.name);
			}

			await parseLog(client, message, attachment);
		}// );


		// logger.warn(`needToRemoveAttachments: ${needToRemoveAttachments}`);
		if (needToRemoveAttachments) {
			// TODO: If we have to delete the message, relay any other attachments first
			message.attachments.forEach(async attachment => {
				logger.debug(`Rechecking if ${attachment.name} has been relayed`);
				if (!relayedFiles.includes(attachment.name)) {
					logger.debug(`We need to upload ${attachment.name} since it hasn't been relayed yet.`);
					await relayFile(client, message, attachment, message.author, message.channel, true);
				}
			});

			// it sure would be nice if Discord let us delete only the attachment instead of the entire message
			// setTimeout(() => message.removeAttachments().catch(console.error), 5 * SECOND);
			// setTimeout(() => message.delete().catch(console.error), 5 * SECOND);
			await message.delete();
		}
	}
};

exports.info = {
	name: "Process Attachment",
	description: "Parses any incoming logs / handles relays",
	type: "logs",
};
