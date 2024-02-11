/* eslint-disable max-len */
import * as logger from '../../../modules/logger.js';

import {
	SECOND, MINUTE, timeoutSet, timeoutEnded, resetTimeout,
} from '../../../modules/triggerTimeoutManager.js';
import {
	checkTheMessage,
} from '../../../modules/checkTheMessage.js';

export const execute = async (client, message) => {
	const sectionIdentifier = `xivlauncher-suggestions-${message.guild.id}`;
	// const watchChannels = client.configdb.get("SUGGESTION_WATCH_CHANNELS");

	let watchXLSuggest = client.perserversettings?.get(`${message.guild.id}-serversettings`)?.get("watchXLSuggest");
	if (!Array.isArray(watchXLSuggest)) {
		logger.warn(`Could not find wrong-place-for-plugin-suggestions watch channels for ${message.guild.id}. Setting empty list.`);
		watchXLSuggest = [];
		client.perserversettings?.get(`${message.guild.id}-serversettings`)?.set("watchXLSuggest", watchXLSuggest);
	}

	if (watchXLSuggest.includes(message.channel.id) && timeoutEnded(sectionIdentifier, 60 * MINUTE)) {
		const ignoredRoles = client.perserversettings?.get(`${message.guild.id}-serversettings`)?.get("ignoredRoles");
		const forbidAny = [/(plug[-]*in|add[-]*on|mod|xiv\s*combo)/gui];
		const forbidCount = [/(can|would|is there|possible|made|make|build|create)/gui];
		const negateBadWords = [];
		const forbiddenMinCount = 1;
		const adjustedMinCount = Number.MIN_SAFE_INTEGER; // disable the "good words offset" feature
		const replyMessage = {

			title: client.configdb.get("TRIGGER_TITLE"),
			description: "Please put plugin suggestions into the <#685275026156683280> channel please."
				+ "\n\nThis channel is for XIVLauncher, Dalamud, or Discord related requests.",
			color: client.configdb.get("EMBED_INFO_COLOR"),
			footer: {
				"text": client.configdb.get("TRIGGER_FOOTER"),
			},
		};

		checkTheMessage(message, forbidAny, forbidCount, negateBadWords, forbiddenMinCount, adjustedMinCount, ignoredRoles, true, replyMessage);

		resetTimeout(sectionIdentifier);
	}
	else if (timeoutSet(sectionIdentifier)) {
		// console.log(`${sectionIdentifier} timeout not exceeded; ignoring message`);
	}
};

export const info = {
	name: "Unchecked Suggestion Channel Watch",
	description: "You'd think users would stop being surprised at this being posted.",
	type: "nag",
};
