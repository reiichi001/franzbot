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
		const forbidAny = [/(sonar|delvui|aether\s*sense|fvp|vibe_*\s*plugin)/gui];
		const forbidCount = [/\b(get|install|help|support|download|update?|use|using|where|find|issue|problem|command|crash|break|know|run+)(ed|t?ing)?\b/gui];
		const negateBadWords = [];
		const forbiddenMinCount = 1;
		const adjustedMinCount = Number.MIN_SAFE_INTEGER; // disable the "good words offset" feature;

		const replyMessage = {

			title: "Automated Message Response",
			description: "While this tool is on the official Dalamud Plugins repository (or used to be or is planned to be), support for it is provided elsewhere. "
				+ "Please contact the creator[s] directly or ask in their support discords."
				+ "\n\nIf they have a third party repo URL or Discord link, someone may link is as long as it doesn't provide other unofficial plugins. "
				+ "Thank you for your understanding!",
			color: client.config.EMBED_WARN_COLOR,
			footer: {
				"text": client.config.TRIGGER_FOOTER,
			},
		};

		resetTimeout(sectionIdentifier);

		checkTheMessage(client, message, forbidAny, forbidCount, negateBadWords, forbiddenMinCount, adjustedMinCount, false, replyMessage);
	}
};

exports.info = {
	name: "Unsupported Tools",
	description: "Addons and plugins that we don't support",
	type: "rule",
};
