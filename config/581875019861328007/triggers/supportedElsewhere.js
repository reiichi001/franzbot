/* eslint-disable max-len */
import * as logger from '../../../modules/logger.js';

import {
	SECOND, MINUTE, timeoutSet, timeoutEnded, resetTimeout,
} from '../../../modules/triggerTimeoutManager.js';
import {
	checkTheMessage,
} from '../../../modules/checkTheMessage.js';

export const execute = async (client, message) => {
	const sectionIdentifier = `SupportedElsewhere-${message.guild.id}`;

	if (timeoutEnded(sectionIdentifier, 3 * SECOND)) {
		const forbidAny = [/(sonar|delvui|aether\s*sense|fvp|vibe_*\s*plugin|penumbra)/gui];
		const forbidCount = [/\b(get|install|help|support|download|update?|use|using|where|find|issue|problem|command|crash|break|know|run+)(ed|t?ing)?\b/gui];
		const negateBadWords = [];
		const forbiddenMinCount = 1;
		const adjustedMinCount = Number.MIN_SAFE_INTEGER; // disable the "good words offset" feature;

		const replyMessage = {

			title: "Automated Message Response",
			description: "While this plugin may or may not be on the official Dalamud Plugins repository, support for it is provided elsewhere. "
				+ "Please contact the creator[s] directly or ask in their support discords.\n\n"
				+ "If they have a third party repo URL or Discord link, someone may link it is as long as it doesn't provide other unsupport plugins or tools."
				+ "Thank you for your understanding!",
			color: client.configdb.get("EMBED_WARN_COLOR"),
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
