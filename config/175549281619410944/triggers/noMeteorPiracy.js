import * as logger from '../../../modules/logger.js';
import {
	SECOND, MINUTE, timeoutSet, timeoutEnded, resetTimeout,
} from '../../../modules/triggerTimeoutManager.js';
import {
	checkTheMessage,
} from '../../../modules/checkTheMessage.js';

export const execute = async (client, message) => {
	// Triggers for Project Meteor
	logger.debug(`Checking to see if someone is a dirty pirate~`);
	const forbidAny = [/(ffxiv|ff14|1\.[0-9]{1,2}[a|b|c]?)+(?!.*\1)/igu];
	const forbidCount = [/(torrent|pirat|free|copy|copies|download|ISO)+(?!.*\1)/igu];
	const negateBadWords = [/(can't|don't|cannot|ARR|HW|SB|SHB|trial|[2-9]\.[0-9]{0,2})+/igu];
	const forbiddenMinCount = 2;
	const adjustedMinCount = 2;

	let ignoredRoles = client.perserversettings?.get(`${message.guild.id}-serversettings`)?.get("ignoredRoles");
	if (!ignoredRoles) {
		logger.warn(`Could not find ignored roles for ${message.guild.name}. Setting empty list.`);
		ignoredRoles = [];
		client.perserversettings?.get(`${message.guild.id}-serversettings`)?.set("ignoredRoles", ignoredRoles);
		// client.perserversettings.set(`${message.guild.id}-serversettings`, ignoredRoles);
	}

	const replyMessage = {

		title: client.configdb.get("TRIGGER_TITLE"),
		description: "Any discussion of torrenting, piracy, or other illegitimate means of obtaining software is not allowed on this server.",
		color: client.configdb.get("EMBED_ERROR_COLOR"),
		footer: {
			"text": client.configdb.get("TRIGGER_FOOTER"),
		},
	};

	checkTheMessage(message, forbidAny, forbidCount, negateBadWords, forbiddenMinCount, adjustedMinCount, ignoredRoles, false, replyMessage);
};

export const info = {
	name: "nopiracy",
	description: "don't steal FFXIV 1.0",
	type: "rule",
};
