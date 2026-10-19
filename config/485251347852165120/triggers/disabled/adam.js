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
			&& message.content
				// TODO: Find a better way of taking string groups A B C and match AB or BC but not AC
				// .match(/(classic|lol|just|iconic)*\s*\bse\b\s*(things|quality)*/gui)?.length > 0) {
				.match(/((classic|lol|just|iconic)+\s*\bse\b\s*)|(\s*\bse\b\s*(quality|things)+)/gui)?.length > 0) {
			message.reply({
				content: "You know, you were doing well until the very last sentence, "
					+ "then you lost any and all respect you'd clawed back. Have a good day.",
				allowedMentions: {
					repliedUser: false,
				},
			});
		}
	}
	else if (timeoutSet(sectionIdentifier)) {
		logger.debug(`Timeout for ${sectionIdentifier} not exceeded. Ignoring message`);
	}
};

exports.info = {
	name: "adam",
	description: "he was doing so well",
	type: "funnyshit",
};
