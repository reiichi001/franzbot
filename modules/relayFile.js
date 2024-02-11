/* eslint-disable max-len */
import {
	ActionRowBuilder, ButtonBuilder, ButtonStyle, ChannelType,
} from 'discord.js';
import {
	isSnowflake,
} from "discord-snowflake";
import URLSafeBase64 from 'urlsafe-base64';
import * as logger from '../modules/logger.js';

export async function relayFile(client, message, attachment, author, sourceChannel) {
	const isDirectMessage = sourceChannel.type == ChannelType.DM || sourceChannel.type == ChannelType.GroupDM;
	let canRelay = false;
	let relayChannel = client.perserversettings?.get(`${sourceChannel.guild.id}-serversettings`)?.get("relayChannel");
	if (relayChannel && isSnowflake(relayChannel)) {
		canRelay = true;
		relayChannel = await client.channels.fetch(relayChannel);
	}

	if (!canRelay) {
		logger.error("No relay channel set.");
		return false;
	}

	let needToRemoveAttachments = false;

	if (isDirectMessage && attachment.name.match(/(aria|output|dalamud|message|dalamudConfig|launcher|dxdiag|event|SquirrelSetup|patcher).*\.(log|txt|json|evtx)$/gui)) {
		// sane filesizes only
		if (attachment.size > (6 * 1024 * 1024)) {
			console.log("Big chonker file. That's a lot of text...");
			sourceChannel.send("This file is pretty big and has not be relayed.\n"
				+ "Perhaps you'd like to generate a fresh log that's smaller?\n\n"
				+ "To do that, just delete your log file and try to relaunch with XIVLauncher. "
				+ "Then upload the new log, which should be much smaller!");
			return needToRemoveAttachments;
		}

		console.log(`Launcher or Dalamud log upload: ${attachment.attachment}`);
		// const response = await got(attachment.attachment);
		console.log(`Fetched custom channel to relay: ${relayChannel.name}`);
		await relayChannel.send({
			content: `${author.username} (${author}) uploaded an attachment in DMs`,
			files: [attachment],
		});
	}

	// relay crash dumps from goatplace (or DMs)
	if (attachment.name.match(/.*\.(dmp)$/gui)) {
		console.log(`Dalamud crash dump upload: ${attachment.attachment}`);
		// const response = await got(attachment.attachment);
		console.log(`Fetched custom channel to relay: ${relayChannel.name}`);
		const relayedMessage = await relayChannel.send({
			content: `${author.username} (${author}) uploaded a crash log in ${isDirectMessage ? "DMs" : `${sourceChannel} from **${sourceChannel.guild.name}**`}.`,
			files: [attachment],
		});


		if (isDirectMessage) {
			await sourceChannel.send({
				content: `Franzbot has relayed this crash dump to a private channel in **${relayChannel.guild.name}** for analysis.`,
			});
		}
		else {
			const replymsg = await message.reply({
				embeds: [
					{
						"description": `${author}, Franzbot has relayed this crash dump to a private channel in `
							+ `**${relayChannel.guild.name}** for analysis.\n\n`
							+ `Support staff can find it [here](${relayedMessage.url})\n\n`
							+ `The attachment will be removed.\n\n`
						// + `Orginal Message:\n`
						// + `>>> ${message.content}`
						,
					},
				],
				allowedMentions: {
					repliedUser: false,
				},
			});
			needToRemoveAttachments = true;

			await relayChannel.send({
				embeds: [
					{
						"description": `Original post: ${replymsg.url}`,
					},
				],
			});
		}
	}

	// relay dalamud.injector.log files from goatplace (or DMs)
	const DALAMUD_INJECTOR_RELAY_ENABLE = true;
	if (DALAMUD_INJECTOR_RELAY_ENABLE && attachment.name.match(/dalamud\.injector.*\.(log)$/gui)) {
		console.log(`Dalamud injector log upload: ${attachment.attachment}`);
		// const response = await got(attachment.attachment);
		console.log(`Fetched custom channel to relay: ${relayChannel.name}`);
		const relayedMessage = await relayChannel.send({
			content: `${author.username} (${author}) uploaded a dalamud.injector log in ${isDirectMessage ? "DMs" : `${sourceChannel} from **${sourceChannel.guild.name}**`}.`,
			files: [attachment],
		});


		if (isDirectMessage) {
			await sourceChannel.send({
				content: `Franzbot has relayed this log to a private channel in **${relayChannel.guild.name}** for analysis by select members of the support team.`,
			});
		}
		else {
			const replymsg = await message.reply({
				embeds: [
					{
						"description": `${author}, Franzbot has relayed this log to a private channel in `
							+ `**${relayChannel.guild.name}** for analysis.\n\n`
							+ `Support staff can find it [here](${relayedMessage.url})\n\n`
							+ `The attachment will be removed.\n\n`
						// + `Orginal Message:\n`
						// + `>>> ${message.content}`
						,
					},
				],
				allowedMentions: {
					repliedUser: false,
				},
			});

			// injector log no longer has the thing unless it's debug.
			// TODO: parse injector log and verbose xlcore logs and strip that out.
			needToRemoveAttachments = true;
			// await message.removeAttachments().catch(console.error);
		}
	}

	// relay tspack files from goatplace (or DMs)
	const TSPACK_RELAY_ENABLE = true;
	if (attachment.name.match(/.*\.(tspack)$/gui)) {
		console.log(`Troubleshooting pack upload: ${attachment.attachment}`);
		// const response = await got(attachment.attachment);
		console.log(`Fetched custom channel to relay: ${relayChannel.name}`);
		const relayedMessage = await relayChannel.send({
			embeds: [
				{
					"description": `${author.username} (${author}) uploaded a troubleshooting pack in `
						+ `${isDirectMessage ? "DMs" : `${sourceChannel.channel} from **${sourceChannel.guild.name}**`}.\n\n`
						+ `Orginal Message:\n`
						+ `>>> ${message.content}`,
				},
			],
			files: [attachment],
		});


		// set up proxied url relay for loggy
		// console.log(relayedMessage.attachments.first().proxyURL);
		// console.log(relayedMessage.attachments.first().url);
		const relayurl = `https://wiki.ffxivrp.org/${relayedMessage.channelId}/${relayedMessage.attachments.first().id}/${relayedMessage.attachments.first().name}`;
		// console.log(url);
		// const base64url = new Buffer.from(url).toString('base64');
		const relaysafebase64url = URLSafeBase64.encode(new Buffer.from(relayurl));

		const relayloggyUrl = `https://loggy.goat.place/?url=${relaysafebase64url}`;

		if (isDirectMessage) {
			await message.reply({
				embeds: [
					{
						"description": `${author}, Franzbot has relayed this file to a private channel in **${relayChannel.guild.name}** for analysis by select members of the XIVLauncher/Dalamud support team.`,
					},
				],
				allowedMentions: {
					repliedUser: false,
				},
			});
			await sourceChannel.send({
				embeds: [
					{
						"description": `Read provided logs on [Loggy](${relayloggyUrl})`,
					},
				],
			});
		}

		if (!isDirectMessage && TSPACK_RELAY_ENABLE) {
			const replymsg = await message.reply({
				embeds: [
					{
						"description": `${author}, Franzbot has relayed this file to a private channel in `
							+ `**${relayChannel.guild.name}** for analysis by select members of the support team.\n\n`
							+ `Support staff can find it [here](${relayedMessage.url})\n\n`
							+ `**NOTE**: Please make sure to provide some context about this if you haven't already.` // ,
							+ `The attachment will be removed.\n\n`
						// + `Orginal Message:\n`
						// + `>>> ${message.content}`
						,
					},
				],
				allowedMentions: {
					repliedUser: false,
				},
			});
			needToRemoveAttachments = true;
		}

		// send our loggy url to the relay channel
		await relayChannel.send({
			embeds: [
				{
					"description": `Read provided logs on [Loggy](${relayloggyUrl})\n\n`
						// + `Original post: ${replymsg.url}`,
						+ `Original post: ${message.url}`,
				},
			],
		});
	}

	return needToRemoveAttachments;
}

export default relayFile;
