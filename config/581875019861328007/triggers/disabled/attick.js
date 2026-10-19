const logger = require("../../../modules/Logger");
const {
	SECOND, MINUTE, timeoutSet, timeoutEnded, resetTimeout,
} = require("../../../modules/triggerTimeoutManager");

exports.execute = async (client, message) => {
	const sectionIdentifier = `funnyshit-${message.guild.id}`;

	if (timeoutEnded(sectionIdentifier, 5 * MINUTE)) {
		resetTimeout(sectionIdentifier);
		if ((message.author.id == "131195749017976833"
			|| message.author.id == "60851293232574464")
			&& message.content.match(/(glad|happy) to help/gui)) {
			message.channel.send("https://cdn.discordapp.com/attachments/684745859497590843/812389944013881394/unknown.png");
		}
	}
	else if (timeoutSet(sectionIdentifier)) {
		// logger.debug(`Timeout for ${sectionIdentifier} not exceeded. Ignoring message`);
	}
};

exports.info = {
	name: "attick",
	description: "happy to help",
	type: "funnyshit",
};
