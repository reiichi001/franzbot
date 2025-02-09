/* eslint-disable max-len */
const {
	ActionRowBuilder, ButtonBuilder, ButtonStyle, ChannelType,
} = require('discord.js');
const URLSafeBase64 = require('urlsafe-base64');
const {
	createHash,
} = require('crypto');
const {
	S3Client, PutObjectCommand,
} = require("@aws-sdk/client-s3");
const logger = require('./Logger.js');

exports.relayFile = async (client, message, attachment, author, sourceChannel, force) => {
	const DiscordSnowflake = await import("discord-snowflake");
	const isDirectMessage = sourceChannel.type == ChannelType.DM || sourceChannel.type == ChannelType.GroupDM;
	let canRelay = false;
	let relayChannel = isDirectMessage
		? client.configdb.get("CHANNELID_RELAY_GOAT") // hardcode for now
		: client.perserversettings?.get(`${sourceChannel?.guild?.id}-serversettings`)?.get("relayChannel");
	let needToRemoveAttachments = false;


	// let's do some setup
	if (relayChannel && DiscordSnowflake.isSnowflake(relayChannel)) {
		logger.debug("Found applicable relay channel.");
		canRelay = true;
		relayChannel = await client.channels.fetch(relayChannel);
	}
	else {
		logger.warn(`Could not find a relay channel defined for ${message.guild.id}. Setting from legacy fallback, else empty string.`);

		// some fallbacks for legacy config
		if (message.guild?.id === client.configdb.get("GUILDID_GOAT")) {
			canRelay = true;
			relayChannel = await client.channels.fetch(client.configdb.get("CHANNELID_RELAY_GOAT"));
		}
		if (message.guild?.id === client.configdb.get("GUILDID_HELIOSPHERE")) {
			canRelay = true;
			relayChannel = await client.channels.fetch(client.configdb.get("CHANNELID_RELAY_HELIOSPHERE"));
		}
		if (message.guild?.id === client.configdb.get("GUILDID_XIVONMAC")) {
			canRelay = true;
			relayChannel = await client.channels.fetch(client.configdb.get("CHANNELID_RELAY_XIVONMAC"));
		}
		if (message.guild?.id === client.configdb.get("GUILDID_TESTING") || client.configdb.get("DEBUGMODE")) {
			canRelay = true;
			relayChannel = await client.channels.fetch(client.configdb.get("CHANNELID_RELAY_TEST"));
		}

		client.perserversettings?.get(`${message.guild.id}-serversettings`)?.set("relayChannel", relayChannel?.id ?? "");
	}

	if (!canRelay) {
		logger.error("No relay channel set.");
		return false;
	}

	// tspacks have to go first because they're special.
	// relay tspack files from goatplace (or DMs)
	const TSPACK_RELAY_ENABLE = true;
	if (attachment.name.match(/.*\.(tspack)$/gui)) {
		needToRemoveAttachments = true;
		console.log(`Troubleshooting pack upload: ${attachment.attachment}`);
		// const response = await got(attachment.attachment);
		console.log(`Fetched custom channel to relay: ${relayChannel.name}`);
		const relayedMessage = await relayChannel.send({
			embeds: [
				{
					"description": `${author.username} (${author}) uploaded a troubleshooting pack in `
                        + `${isDirectMessage ? "DMs" : `${sourceChannel} from **${sourceChannel.guild.name}**`}.\n\n`
                        + `Orginal Message:\n`
                        + `>>> ${message.content}`,
				},
			],
			files: [attachment],
		});


		// We upload these to S3 because Discord killed Franz's proxy
		const objGuildID = message.guild?.id ?? "directmessage";
		const response = await fetch(attachment.attachment);
		const buffer = Buffer.from(await response.arrayBuffer());
		const bucketName = "dalamud-support";

		const origKeyName = `${objGuildID}/${message.author.id}-${attachment.name}`;
		let safeKeyName = `${createHash('sha1').update(origKeyName)
			.digest('hex')}`;
		safeKeyName = URLSafeBase64.encode(new Buffer.from(safeKeyName, 'hex'));
		const keyName = `tspacks/${safeKeyName}.tspack`;
		const objectTags = `io.franzbot.tspack/source_user_id=${message.author.id}&io.franzbot.tspack/source_guild_id=${objGuildID}`;

		const s3Client = new S3Client({
			region: client.config.AWS_REGION,
			credentials: {
				accessKeyId: client.config.AWS_KEY,
				secretAccessKey: client.config.AWS_KEYSECRET,
			},
		});

		await s3Client.send(
			new PutObjectCommand({
				Bucket: bucketName,
				Key: keyName,
				Body: buffer,
				Tagging: objectTags,
			})
		);

		const url = `https://${bucketName}.s3.amazonaws.com/${keyName}`;

		// console.log(url);
		// const base64url = new Buffer.from(url).toString('base64');
		const safebase64url = URLSafeBase64.encode(new Buffer.from(url));

		const loggyUrl = `https://loggy.goat.place/?url=${safebase64url}`;

		if (isDirectMessage) {
			await message.reply({
				embeds: [
					{
						"description": `${author}, Franzbot has relayed this tspack to a private channel in **${relayChannel.guild.name}** for analysis by select members of the XIVLauncher/Dalamud support team.\n\nDon't want to wait? You can use [Loggy](<https://loggy.goat.place/>) to parse it for you.`,
					},
				],
				allowedMentions: {
					repliedUser: false,
				},
			});
			await sourceChannel.send({
				embeds: [
					{
						"description": `Read provided logs on [Loggy](${loggyUrl})`,
					},
				],
			});
		}

		if (!isDirectMessage && TSPACK_RELAY_ENABLE && !force) {
			const replymsg = await message.reply({
				embeds: [
					{
						"description": `${author}, Franzbot has relayed this tspack to a private channel in `
                            + `**${relayChannel.guild.name}** for analysis by select members of the support team.\n\n`
                            + `Support staff can find it [here](${relayedMessage.url})\n\n`
                            + `**NOTE**: Please make sure to provide some context about this if you haven't already.` // ,
                            + `Orginal Message:\n`
                            + `>>> ${message.content}`
						,
					},
				],
				allowedMentions: {
					repliedUser: false,
				},
			});
		}

		// send our loggy url to the relay channel
		await relayChannel.send({
			embeds: [
				{
					"description": `Read provided logs on [Loggy](${loggyUrl})\n\n`
                        // + `Original post: ${replymsg.url}`,
                        + `Original post: ${message.url}`,
				},
			],
		});

		return needToRemoveAttachments;
	}

	// if we've already made a relay post, just relay the the rest of the attachments
	if (force) {
		logger.debug(`Forced relaying ${attachment.name}`);
		const relayedMessage = await relayChannel.send({
			content: `${author.username} (${author}) also uploaded a file in ${isDirectMessage ? "DMs" : `${sourceChannel} from **${sourceChannel.guild.name}**`} that has been removed as part of the original post.`,
			files: [attachment],
		});
		return force;
	}

	// process other attachments for relays

	if (isDirectMessage && attachment.name.match(/(aria|output|dalamud|message|dalamudConfig|launcher|dxdiag|event|SquirrelSetup|patcher).*\.(log|txt|json|evtx|dmp)$/gui)) {
		needToRemoveAttachments = false;
		// sane filesizes only
		if (attachment.size > (6 * 1024 * 1024)) {
			console.log("Big chonker file. That's a lot of text...");
			sourceChannel.send("This file is pretty big and has not be relayed.\n"
                + "Perhaps you'd like to generate a fresh log that's smaller?\n\n"
                + "To do that, just delete your log file and try to relaunch with XIVLauncher. "
                + "Then upload the new log, which should be much smaller!");
		}

		console.log(`Launcher or Dalamud log upload: ${attachment.attachment}`);
		// const response = await got(attachment.attachment);
		console.log(`Fetched custom channel to relay: ${relayChannel.name}`);
		await relayChannel.send({
			content: `${author.username} (${author}) uploaded an attachment in DMs`,
			files: [attachment],
		});

		return needToRemoveAttachments;
	}

	// relay crash dumps from goatplace (or DMs)
	if (attachment.name.match(/^dalamud_appcrash_.*|.*\.(dmp)$/gui)) {
		needToRemoveAttachments = true;
		console.log(`Dalamud crash dump upload: ${attachment.attachment}`);
		// const response = await got(attachment.attachment);
		console.log(`Fetched custom channel to relay: ${relayChannel.name}`);
		const relayedMessage = await relayChannel.send({
			embeds: [
				{
					"description": `${author.username} (${author}) uploaded a crash log in ${isDirectMessage ? "DMs" : `${sourceChannel} from **${sourceChannel.guild.name}**`}.`,
				},
			],
			files: [attachment],
		});

		if (isDirectMessage) {
			await sourceChannel.send({
				content: `Franzbot has relayed ${attachment.name} to a private channel in **${relayChannel.guild.name}** for analysis.`,
			});
		}
		else {
			const replymsg = await message.reply({
				embeds: [
					{
						"description": `${author}, Franzbot has relayed ${attachment.name} to a private channel in `
                            + `**${relayChannel.guild.name}** for analysis.\n\n`
                            + `Support staff can find it [here](${relayedMessage.url})\n\n`
                            + `The attachment will be removed.\n\n`
                            + `Orginal Message:\n`
                            + `>>> ${message.content}`
						,
					},
				],
				allowedMentions: {
					repliedUser: false,
				},
			});

			await relayChannel.send({
				embeds: [
					{
						"description": `Original post: ${replymsg.url}`,
					},
				],
			});
		}
		return needToRemoveAttachments;
	}

	// relay dalamud.injector.log files from goatplace (or DMs)
	const DALAMUD_INJECTOR_RELAY_ENABLE = true;
	if (DALAMUD_INJECTOR_RELAY_ENABLE && attachment.name.match(/dalamud\.injector.*\.(log)$/gui)) {
		needToRemoveAttachments = true;
		console.log(`Dalamud injector log upload: ${attachment.attachment}`);
		// const response = await got(attachment.attachment);
		console.log(`Fetched custom channel to relay: ${relayChannel.name}`);
		const relayedMessage = await relayChannel.send({
			embeds: [
				{
					"description": `${author.username} (${author}) uploaded a dalamud.injector log in ${isDirectMessage ? "DMs" : `${sourceChannel} from **${sourceChannel.guild.name}**`}.`,
				},
			],
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
                            + `Orginal Message:\n`
                            + `>>> ${message.content}`
						,
					},
				],
				allowedMentions: {
					repliedUser: false,
				},
			});

			// injector log no longer has the thing unless it's debug.
			// TODO: parse injector log and verbose xlcore logs and strip that out.
			// await message.removeAttachments().catch(console.error);
		}
		return needToRemoveAttachments;
	}

	logger.cmd(`We probably didn't relay. Need for ${attachment.name}: ${needToRemoveAttachments}`);
	return needToRemoveAttachments;
};
