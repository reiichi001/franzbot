/* eslint-disable max-len */
const logger = require("../../../modules/Logger");
const {
	SECOND, MINUTE, timeoutSet, timeoutEnded, resetTimeout,
} = require("../../../modules/triggerTimeoutManager");

const {
	checkTheMessage,
} = require("../../../modules/checkTheMessage");

exports.execute = async (client, message) => {
	const sectionIdentifier = `SupportedElsewhere-${message.guild.id}`;

	if (timeoutEnded(sectionIdentifier, 3 * SECOND)) {
		const forbidAny = [/(item|mod|piece[s]* of gear)/igu];
		const forbidCount = [/(change|replace(ment)*|move|conver(t|sion))/igu];
		const negateBadWords = [];
		const forbiddenMinCount = 2;
		const adjustedMinCount = 2;

		const {
			replyMessage,
		} = require("../embeds/itemconversion");

		checkTheMessage(client, message, forbidAny, forbidCount, negateBadWords, forbiddenMinCount, adjustedMinCount, false, replyMessage);

		resetTimeout(sectionIdentifier);
	}
	else if (timeoutSet(sectionIdentifier)) {
		// console.log(`${sectionIdentifier} timeout not exceeded; ignoring message`);

	}
};

exports.info = {
	name: "itemconversion",
	description: "don't ask",
	type: "rule",
};
