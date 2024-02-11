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
	// const watchChannels = client.configdb.get("SUGGESTION_WATCH_CHANNELS");

	const watchChannels = client.perserversettings?.get(`${message.guild.id}-serversettings`)?.get("suggestionWatchChannels");

	if (watchChannels.includes(message.channel.id) && timeoutEnded(sectionIdentifier, 60 * MINUTE)) {
		const ignoredRoles = client.perserversettings?.get(`${message.guild.id}-serversettings`)?.get("ignoredRoles");
		if (message.member.roles.cache.some(r => ignoredRoles.includes(r.name))) {
			// console.log("Ignored role. Skipping this check.");
			return;
		}
		resetTimeout(sectionIdentifier);
		console.log("Suggestion watch channel detected.");

		// send a reply
		const replyMessage = {

			title: client.configdb.get("TRIGGER_TITLE"),
			description: "Franzbot has detected chat activity from a non-mod/non-dev user in a suggestions channel.",
			color: client.configdb.get("EMBED_INFO_COLOR"),
			footer: {
				"text": "This automated response is on a 30 minute cooldown every time there's chat activity and is not based on the words you said. "
						+ "This message will self destruct in 5 minutes.",
			},
			fields: [
				{
					"name": "Existing Plugins",
					"value": "If you haven't already, see if the plugin has an issue or requests tracker on its repo. This may require a GitHub or other account. Otherwise, tag the developer once so they can find this request if you haven't already.",
				},
				{
					"name": "New Plugins",
					"value": "If you are proposing a new plugin and have a GitHub account, please consider opening an issue on the [suggestions repository](https://github.com/goatcorp/suggestions/issues/new?assignees=&labels=discussion+requested&template=plugin_request.md&title=).",
				},
				{
					"name": "XIVLauncher/Dalamud",
					"value": "If you have a GitHub account, please submit an issue/feature request for [XIVLauncher](https://github.com/goatcorp/FFXIVQuickLauncher/issues) or [Dalamud](https://github.com/goatcorp/Dalamud/issues) on their respective GitHub repos.",
				},
			],
		};

		message.channel.send({
			embeds: [replyMessage],
		})
			.then(msg => {
				setTimeout(() => msg.delete(), 5 * MINUTE);
			});
	}
	else if (timeoutSet(sectionIdentifier)) {
		logger.debug(`Timeout for ${sectionIdentifier} not exceeded. Ignoring message`);
	}
};

export const info = {
	name: "Unchecked Suggestion Channel Watch",
	description: "You'd think users would stop being surprised at this being posted.",
	type: "nag",
};
