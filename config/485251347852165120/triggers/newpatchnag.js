/* eslint-disable max-len */
import * as logger from '../../../modules/logger.js';

import {
	SECOND, MINUTE, timeoutSet, timeoutEnded, resetTimeout,
} from '../../../modules/triggerTimeoutManager.js';
import {
	checkTheMessage,
} from '../../../modules/checkTheMessage.js';

export const execute = async (client, message) => {
	const sectionIdentifier = `newpatchnag-${message.guild.id}`;
	const postnag = false;
	// const watchNagChannels = client.configdb.get("NEWPATCHNAG_WATCH_CHANNELS");

	let  watchNagChannels = client.perserversettings?.get(`${message.guild.id}-serversettings`)?.get("watchNagChannels");
	if (!Array.isArray(watchNagChannels)) {
		logger.warn(`Could not find newpatch nag watch channels for ${message.guild.id}. Setting empty list.`);
		watchNagChannels = [];
		client.perserversettings?.get(`${message.guild.id}-serversettings`)?.set("watchNagChannels", watchNagChannels);
	}
	console.log("Running newpatchnag check.");
	if (postnag && watchNagChannels.includes(message.channel.id) && timeoutEnded(sectionIdentifier, 15 * MINUTE)) {
		const ignoredRoles = client.perserversettings?.get(`${message.guild.id}-serversettings`)?.get("ignoredRoles");
		if (message.member.roles.cache.some(r => ignoredRoles.includes(r.name))) {
			console.log("Ignored role. Skipping this newpatchnag check.");
			return;
		}

		resetTimeout(sectionIdentifier);
		logger.log("Suggestion watch channel detected.");

		// send a reply
		const replyMessage = {

			title: "Automated Chat Channel Nag",
			description: "Franzbot has detected chat activity from a non-mod/non-dev user.",
			color: client.configdb.get("EMBED_INFO_COLOR"),
			footer: {
				"text": "This automated response is on a 15 minute cooldown every time there's chat activity and is not based on the words you said. "
					+ "This message will self destruct in 5 minutes.",
			},
			fields: [
				{
					"name": "Dalamud is not ready yet",
					"value": "Please don't ask when it will be ready. There is no average time it takes or estimate. "
						+ "We'd like it to be ready too!"
						+ "\n__All plugins are disabled because Dalamud is disabled.__\n\n"
						+ "Follow the <#585180735032393730> channel for updated information.",
				},
				{
					"name": "This is not #general",
					"value": "Please try to keep discussions in this channel to a minimum. It's a support channel first and foremost.\n\n"
						+ "You can pick up a role for <#581875020632948762> access in <#719508946141970492>",
				},
				{
					"name": "This is not #plugin-help",
					"value": "Please don't ask for help with missing/broken plugins here. See above.",
				},
				{
					"name": "Other third party tools/mods",
					"value": "We have no control over other third party tools or mods. Please ask for support in their support servers/forums/websites/etc.",
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
	name: "new patch nag",
	description: "please stop asking these",
	type: "nag",
};
