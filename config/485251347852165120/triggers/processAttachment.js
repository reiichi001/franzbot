
const {
	ChannelType,
} = require('discord.js');
const URLSafeBase64 = require('urlsafe-base64');
const logger = require('../../../modules/Logger.js');
const {
	parseLog,
} = require("../../../modules/parseLog.js");
const {
	postParsedEmbeds,
} = require("../../../modules/respond.js");
const {
	relayFile,
} = require("../../../modules/relayFile.js");
const {
	SECOND, MINUTE, timeoutSet, timeoutEnded, resetTimeout,
} = require('../../../modules/triggerTimeoutManager.js');


exports.execute = async (client, message) => {
	// let's do some setup
	const DiscordSnowflake = await import("discord-snowflake");
	let relayChannel = client.perserversettings?.get(`${message.guild.id}-serversettings`)?.get("relayChannel");
	if (relayChannel && DiscordSnowflake.isSnowflake(relayChannel)) {
		logger.debug("Found applicable relay channel.");
	}
	else {
		logger.warn(`Could not find a relay channel defined for ${message.guild.id}. Setting from legacy fallback, else empty string.`);

		// some fallbacks for legacy config
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
		const relayedFiles = [];

		message.attachments.forEach(async attachment => {
			console.log(attachment.name);

			// const url = `https://wiki.ffxivrp.org/${message.channelId}/${attachment.id}/${attachment.name}`;
			// console.log(url);
			// const base64url = new Buffer.from(url).toString('base64');
			// const safebase64url = URLSafeBase64.encode(new Buffer.from(url));

			// const loggyUrl = `https://loggy.goat.place/?url=${safebase64url}`;

			// Returns true if attachments need to be removed.
			if (await relayFile(client, message, attachment, message.author, message.channel)) {
				needToRemoveAttachments = true;
				relayedFiles.push(attachment.name);
			}

			// parseLog only parses and returns; posting the results is this
			// trigger's job. No anyTextFile here — a message attachment keeps the
			// strict filename gate so arbitrary text files aren't parsed.
			const embeds = await parseLog(client, attachment, {
				guildId: message.guild?.id,
			});
			if (embeds?.length) {
				await postParsedEmbeds(message, embeds);
			}
		});

		if (needToRemoveAttachments) {
			logger.debug("We need to remove the message containing this attachment.");

			// TODO: If we have to delete the message, relay any other attachments first
			message.attachments.forEach(async attachment => {
				if (!relayedFiles.includes(attachment.name)) {
					await relayFile(client, message, attachment, message.author, message.channel, true);
				}
			});

			// it sure would be nice if Discord let us delete only the attachment instead of the entire message
			// setTimeout(() => message.removeAttachments().catch(console.error), 5 * SECOND);
			setTimeout(() => message.delete().catch(console.error), 5 * SECOND);
		}
	}
};

exports.info = {
	name: "Process Attachment",
	description: "Parses any incoming logs / handles relays",
	type: "logs",
};
