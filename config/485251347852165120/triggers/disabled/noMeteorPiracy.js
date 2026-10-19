const logger = require("../../../modules/Logger");
const {
	SECOND, MINUTE, timeoutSet, timeoutEnded, resetTimeout,
} = require("../../../modules/triggerTimeoutManager");

const {
	checkTheMessage,
} = require("../../../modules/checkTheMessage");

exports.execute = async (client, message) => {
	// Triggers for Project Meteor
	logger.debug(`Checking to see if someone is a dirty pirate~`);
	const forbidAny = [/(ffxiv|ff14|1\.[0-9]{1,2}[a|b|c]?)+(?!.*\1)/igu];
	const forbidCount = [/(torrent|pirat|free|copy|copies|download|ISO)+(?!.*\1)/igu];
	const negateBadWords = [/(can't|don't|cannot|ARR|HW|SB|SHB|trial|[2-9]\.[0-9]{0,2})+/igu];
	const forbiddenMinCount = 2;
	const adjustedMinCount = 2;

	const replyMessage = {

		title: client.config.TRIGGER_TITLE,
		description: "Any discussion of torrenting, piracy, or other illegitimate means of obtaining software is not allowed on this server.",
		color: client.config.EMBED_ERROR_COLOR,
		footer: {
			"text": client.config.TRIGGER_FOOTER,
		},
	};

	checkTheMessage(client, message, forbidAny, forbidCount, negateBadWords, forbiddenMinCount, adjustedMinCount, false, replyMessage);
};

exports.info = {
	name: "nopiracy",
	description: "don't steal FFXIV 1.0",
	type: "rule",
};
