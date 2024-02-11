/* eslint-disable max-len */
import {
	ChannelType,
} from 'discord.js';
import {
	isSnowflake,
} from "discord-snowflake";
import URLSafeBase64 from 'urlsafe-base64';
import * as logger from '../../../modules/logger.js';
import parseLog from "../../../modules/parseLog.js";
import relayFile from "../../../modules/relayFile.js";
import {
	SECOND, MINUTE, timeoutSet, timeoutEnded, resetTimeout,
} from '../../../modules/triggerTimeoutManager.js';


export const execute = async (client, message) => {
	// let's do some setup
	let relayChannel = client.perserversettings?.get(`${message.guild.id}-serversettings`)?.get("relayChannel");
	if (relayChannel && isSnowflake(relayChannel)) {
		logger.debug("Found applicable relay channel.");
	}
	else {
		logger.warn(`Could not find a relay channel defined for ${message.guild.id}. Setting from legacy fallback, else empty string.`);

		// some debugging
		if (message.guild?.id === client.configdb.get("GUILDID_GOAT")) {
			relayChannel = await client.channels.fetch(client.configdb.get("CHANNELID_RELAY_GOAT"));
		}
		if (message.guild?.id === client.configdb.get("GUILDID_HELIOSPHERE")) {
			relayChannel = await client.channels.fetch(client.configdb.get("CHANNELID_RELAY_HELIOSPHERE"));
		}
		if (message.guild?.id === client.configdb.get("GUILDID_XIVONMAC")) {
			relayChannel = await client.channels.fetch(client.configdb.get("CHANNELID_RELAY_XIVONMAC"));
		}
		if (message.guild?.id === client.configdb.get("GUILDID_TESTING") || client.configdb.get("DEBUGMODE")) {
			relayChannel = await client.channels.fetch(client.configdb.get("CHANNELID_RELAY_TEST"));
		}

		client.perserversettings?.get(`${message.guild.id}-serversettings`)?.set("relayChannel", relayChannel?.id ?? "");
	}

	if (message.attachments.size > 0) {
		console.log("Found an attachment in this message");

		let needToRemoveAttachments = false;

		message.attachments.forEach(async attachment => {
			console.log(attachment.name);

			// const url = `https://wiki.ffxivrp.org/${message.channelId}/${attachment.id}/${attachment.name}`;
			// console.log(url);
			// const base64url = new Buffer.from(url).toString('base64');
			// const safebase64url = URLSafeBase64.encode(new Buffer.from(url));

			// const loggyUrl = `https://loggy.goat.place/?url=${safebase64url}`;

			// Returns true if attachments need to be removed.
			if (relayFile(client, message, attachment, message.author, message.channel)) {
				needToRemoveAttachments = true;
			}

			parseLog(client, message, attachment);
		});

		if (needToRemoveAttachments) {
			setTimeout(() => message.removeAttachments().catch(console.error), 5 * SECOND);
		}
	}
};

export const info = {
	name: "Process Attachment",
	description: "Parses any incoming logs / handles relays",
	type: "logs",
};
