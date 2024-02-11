/* eslint-disable max-len */
import * as logger from '../../../modules/logger.js';

import {
	SECOND, MINUTE, timeoutSet, timeoutEnded, resetTimeout,
} from '../../../modules/triggerTimeoutManager.js';
import {
	checkTheMessage,
} from '../../../modules/checkTheMessage.js';

export const execute = async (client, message) => {
	const sectionIdentifier = `suggestionchannels-${message.guild.id}`;

	if (timeoutEnded(sectionIdentifier, 3 * SECOND)) {
		const forbidAny = [/(bdth|burn[ing]*\s*down\s*the\s*house|xiv\s*alex.*|no\s*clip.*|l\s*meter|cammy|oobplugin|sloth|combo\s*expand.*|splatoon|makeplace)/gui];
		const forbidCount = [/\b(get|install|help|support|download|update?|use|using|where|find|issue|problem|command|crash|break|know|run+)(s|ed|t?ing)?\b/gui];
		const negateBadWords = [];
		const forbiddenMinCount = 1;
		const adjustedMinCount = Number.MIN_SAFE_INTEGER; // disable the "good words offset" feature;

		const replyMessage = {

			title: client.configdb.get("TRIGGER_TITLE"),
			description: "We are unable to provide support for plugins that can only be installed via third-party repo or other third party tools. "
			+ "Please contact the creator[s] directly, make an issue on their git repo, or ask in their support discords."
			+ "\n\nPlease do not link or discuss the aforementioned tool/plugin here. Thank you for your understanding!",
			color: client.configdb.get("EMBED_ERROR_COLOR"),
			footer: {
				"text": client.configdb.get("TRIGGER_FOOTER"),
			},
		};

		checkTheMessage(client, message, forbidAny, forbidCount, negateBadWords, forbiddenMinCount, adjustedMinCount, false, replyMessage);

		resetTimeout(sectionIdentifier);
	}
	else if (timeoutSet(sectionIdentifier)) {
		// console.log(`${sectionIdentifier} timeout not exceeded; ignoring message`);

	}
};

export const info = {
	name: "Unsupported Tools",
	description: "Addons and plugins that we don't support",
	type: "rule",
};
