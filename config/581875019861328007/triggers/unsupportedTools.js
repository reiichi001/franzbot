/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
const logger = require("../../../modules/Logger");
const {
	SECOND, MINUTE, timeoutSet, timeoutEnded, resetTimeout,
} = require("../../../modules/triggerTimeoutManager");

const {
	checkTheMessage,
} = require("../../../modules/checkTheMessage");

exports.execute = async (client, message) => {
	const sectionIdentifier = `unsupportedtool-${message.guild.id}`;

	if (timeoutEnded(sectionIdentifier, 3 * SECOND)) {
		const forbidAny = [/\b(bdth|burn[ing]*\s*down\s*the\s*house|xiv\s*alex.*|no\s*clip.*|l\s*meter|cammy|oobplugin|sloth|combo\s*expand.*|splatoon|makeplace|mare|mui|material\s*ui\s*plugin|glamourer)/gui];
		const forbidCount = [/\b(get|install|help|support|download|update?|use|using|where|find|issue|problem|command|crash|break|know|run+)(s|ed|t?ing)?\b/gui];
		const negateBadWords = [/\b(do not|don't)?\b/gui];
		const forbiddenMinCount = 1;
		const adjustedMinCount = 2;

		const replyMessage = {

			title: client.config.TRIGGER_TITLE,
			description: "We are unable to provide support for plugins that can only be installed via custom plugin repo or other third party tools. "
			+ "Please contact the creator[s] directly, make an issue on their git repo, or ask in their support discords."
			+ "\n\nPlease do not link or discuss the aforementioned tool/plugin here. Thank you for your understanding!",
			color: client.config.EMBED_ERROR_COLOR,
			footer: {
				"text": client.config.TRIGGER_FOOTER,
			},
		};

		checkTheMessage(client, message, forbidAny, forbidCount, negateBadWords, forbiddenMinCount, adjustedMinCount, false, replyMessage);

		resetTimeout(sectionIdentifier);
	}
	else if (timeoutSet(sectionIdentifier)) {
		// console.log(`${sectionIdentifier} timeout not exceeded; ignoring message`);

	}
};

exports.info = {
	name: "Unsupported Tools",
	description: "Addons and plugins that we don't support",
	type: "rule",
};
