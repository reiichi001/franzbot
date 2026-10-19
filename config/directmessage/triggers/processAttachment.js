const dmRelay = require("../../../modules/dmRelay.js");


exports.execute = async (client, message) => {
	if (message.attachments.size > 0) {
		console.log("Found an attachment in this direct message");

		// Sequential on purpose: forEach does not await async callbacks, so a
		// multi-attachment DM could hand several files to the relay chooser at
		// once. Await each one before moving on, matching the guild trigger.
		for (const attachment of message.attachments.values()) {
			console.log(attachment.name);

			// Route through the DM relay chooser: special file types (tspack/dmp/
			// crash/injector) keep their dedicated path; generic parseable logs are
			// parsed, then offered a button to pick which server relays them.
			await dmRelay.handleLog(client, message, attachment, message.author);
		}
	}
};

exports.info = {
	name: "Process Attachment - DM edition",
	description: "Parses any incoming logs / handles relays",
	type: "logs",
};
