/* eslint-disable max-len */
import * as logger from '../../../modules/logger.js';

import {
	SECOND, MINUTE, timeoutSet, timeoutEnded, resetTimeout,
} from '../../../modules/triggerTimeoutManager.js';
import {
	checkTheMessage,
} from '../../../modules/checkTheMessage.js';

export const execute = async (client, message) => {
	const sectionIdentifier = `newpatch-${message.guild.id}`;

	if (timeoutEnded(sectionIdentifier, 5 * MINUTE)) {
		resetTimeout(sectionIdentifier);
		const forbidAny = [/(plugin|dalamud|launcher|in-game|in game|XL|XIVLauncher|XIV Launcher|combo|moaction|mouseover)/igu];
		const forbidCount = [/(update|(not|n't)\s+(work|exist|use)|when|eta|why|yet)+(?!.*\1)/igu];
		const negateBadWords = [];
		const forbiddenMinCount = 2;
		const adjustedMinCount = Number.MIN_SAFE_INTEGER; // disable the "good words offset" feature

		const replyMessage = {

			title: client.configdb.get("TRIGGER_TITLE"),
			description: "Please understand that this is a community-driven project that has multiple dependencies by people who have school/jobs/both and live in a variety of timezones. Updates to XIVLauncher, Dalamud, and plugins will come when they can, but asking for a time estimate will not make that happen sooner.\n\nPlease see our [many](https://discord.com/channels/581875019861328007/830939095478829096/893209077071609887) [posts](https://discord.com/channels/581875019861328007/585180735032393730/914487751708119091) in <#585180735032393730> and <#830939095478829096>",
			color: client.configdb.get("EMBED_ERROR_COLOR"),
			footer: {
				"text": client.configdb.get("TRIGGER_FOOTER"),
			},
		};

		checkTheMessage(client, message, forbidAny, forbidCount, negateBadWords, forbiddenMinCount, adjustedMinCount, false, replyMessage);
	}
	else if (timeoutSet(sectionIdentifier)) {
		// console.log(`${sectionIdentifier} timeout not exceeded; ignoring message`);
	}
};

export const info = {
	name: "nopiracy",
	description: "don't steal FFXIV 1.0",
	type: "rule",
};
