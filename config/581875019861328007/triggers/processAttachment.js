
const logger = require('../../../modules/Logger.js');
const {
	parseLog,
} = require("../../../modules/parseLog.js");
const {
	postParsedEmbeds,
} = require("../../../modules/respond.js");
const {
	relayFile,
} = require("../../../modules/relayFile.js");
const {
	isSpecialRelayAttachment,
} = require("../../../modules/processAttachment.js");


exports.execute = async (client, message) => {
	if (message.attachments.size > 0) {
		console.log("Found an attachment in this message");

		let needToRemoveAttachments = false;
		const relayedFiles = [];

		// Sequential on purpose: relayFile and parseLog are async, and the removal
		// decision below has to be settled before anything acts on it.
		for (const attachment of message.attachments.values()) {
			console.log(attachment.name);

			// Only files with dedicated relay handling (tspack, crash /
			// dalamud.injector logs, .dmp) are handed to relayFile at all — the same
			// guard the interaction paths use. Passing every attachment meant an
			// ordinary file (a screenshot, a video) drew a relay-limit complaint
			// about a relay it was never a candidate for.
			//
			// The `needToRemoveAttachments` argument is relayFile's `force`: once one
			// file has been relayed, another relayable file joins that post instead of
			// producing a second receipt.
			//
			// Returns true if attachments need to be removed.
			if (isSpecialRelayAttachment(attachment.name)
				&& await relayFile(client, message, attachment, message.author, message.channel, needToRemoveAttachments)) {
				logger.debug(`We need to remove the message containing ${attachment.name}`);

				needToRemoveAttachments = true;
				relayedFiles.push(attachment.name);
			}

			// parseLog only parses and returns; posting the results is this
			// trigger's job. No anyTextFile here — a message attachment keeps the
			// strict filename gate so arbitrary text files aren't parsed.
			const embeds = await parseLog(client, attachment, {
				guildId: message.guild?.id,
			});
			if (embeds?.length) {
				await postParsedEmbeds(message, embeds);
			}
		}

		if (needToRemoveAttachments) {
			logger.debug("We need to remove the message containing this attachment.");

			// Relay anything that has not been relayed yet BEFORE deleting the
			// message: relayFile downloads from the message's CDN copy. This pass is
			// forced, so every leftover rides along on the existing relay post.
			for (const attachment of message.attachments.values()) {
				if (relayedFiles.includes(attachment.name)) {
					continue;
				}
				logger.debug(`We need to upload ${attachment.name} since it hasn't been relayed yet.`);
				await relayFile(client, message, attachment, message.author, message.channel, true);
			}

			// it sure would be nice if Discord let us delete only the attachment instead of the entire message
			await message.delete().catch(console.error);
		}
	}
};

exports.info = {
	name: "Process Attachment",
	description: "Parses any incoming logs / handles relays",
	type: "logs",
};
