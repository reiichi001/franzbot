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

	let newpatchNag = client.perserversettings?.get(`${message.guild.id}-serversettings`)?.get("newpatchNag");
	if (newpatchNag === null || typeof newpatchNag === "undefined") {
		logger.warn(`Could not find newpatch nag watch channels for ${message.guild.id}. Setting to false as default.`);
		newpatchNag = false;
		client.perserversettings?.get(`${message.guild.id}-serversettings`)?.set("newpatchNag", newpatchNag);
	}

	if (!newpatchNag) {
		logger.debug(`newpatch nag checking disabled for #${message.channel.name} in ${message.guild.name}`);
		return;
	}
	logger.debug(`newpatch nag checking enabled for <${message.channel.id}> in ${message.guild.name}`);

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
	name: "newpatch",
	description: "remind people to not constantly ask for updates",
	type: "nag",
};
