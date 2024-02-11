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
	const isDirectMessage = message.channel.type == ChannelType.DM || message.channel.type == ChannelType.GroupDM;

	if (message.attachments.size > 0) {
		console.log("Found an attachment in this message");

		let needToRemoveAttachments = false;
		message.attachments.forEach(async attachment => {
			console.log(attachment.name);

			// Returns true if attachments need to be removed.
			if (relayFile(client, message, attachment, message.author, message.channel)) {
				needToRemoveAttachments = true;
			}

			parseLog(client, message, attachment);
		});

		if (needToRemoveAttachments && message.deletable && !isDirectMessage) {
			message.removeAttachments();
		}
	}
};

export const info = {
	name: "Process Attachment",
	description: "Parses any incoming logs / handles relays",
	type: "logs",
};
