/* eslint-disable max-len */
const {
	ChannelType,
} = require('discord.js');
const URLSafeBase64 = require('urlsafe-base64');
const {
	createHash,
} = require('crypto');
const {
	S3Client, PutObjectCommand,
} = require("@aws-sdk/client-s3");
const logger = require('./Logger.js');
const {
	replyToSource,
} = require('./respond');
const {
	MAX_UPLOAD_BYTES,
} = require('./processAttachment');
const {
	resolveRelayChannel,
} = require('./resolveRelayChannel');

exports.relayFile = async (client, source, attachment, author, sourceChannel, force) => {
	const isDirectMessage = sourceChannel.type == ChannelType.DM || sourceChannel.type == ChannelType.GroupDM;
	let needToRemoveAttachments = false;

	// Configured channel first, then the legacy hardcoded fallbacks for known
	// guilds. See modules/resolveRelayChannel.js — the FAQ modal's private relay
	// deliberately skips those fallbacks.
	const relayChannel = await resolveRelayChannel(client, sourceChannel);
	if (!relayChannel) {
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
                        + `Original Message:\n`
                        + `>>> ${source.content ?? ''}`,
				},
			],
			files: [attachment],
		});


		// We upload these to S3 because Discord killed Franz's proxy
		const objGuildID = source.guild?.id ?? "directmessage";
		const response = await fetch(attachment.attachment);
		const buffer = Buffer.from(await response.arrayBuffer());
		const bucketName = "dalamud-support";

		const origKeyName = `${objGuildID}/${author.id}-${attachment.name}`;
		let safeKeyName = `${createHash('sha1').update(origKeyName)
			.digest('hex')}`;
		safeKeyName = URLSafeBase64.encode(new Buffer.from(safeKeyName, 'hex'));
		const keyName = `tspacks/${safeKeyName}.tspack`;
		const objectTags = `io.franzbot.tspack/source_user_id=${author.id}&io.franzbot.tspack/source_guild_id=${objGuildID}`;

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
			await replyToSource(source, {
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
			// Binding not kept: the receipt is sent for its side effect, and the
			// relay-channel follow-up links the ORIGINAL post instead (below).
			await replyToSource(source, {
				embeds: [
					{
						"description": `${author}, Franzbot has relayed this tspack to a private channel in `
                            + `**${relayChannel.guild.name}** for analysis by select members of the support team.\n\n`
                            + `Support staff can find it [here](${relayedMessage.url})\n\n`
                            + `**NOTE**: Please make sure to provide some context about this if you haven't already.\n\n`
                            + `Original Message:\n`
                            + `>>> ${source.content ?? ''}`
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
                        + `Original post: ${source.url ?? ''}`,
				},
			],
		});

		return needToRemoveAttachments;
	}

	// if we've already made a relay post, just relay the the rest of the attachments
	if (force) {
		logger.debug(`Forced relaying ${attachment.name}`);
		await relayChannel.send({
			content: `${author.username} (${author}) also uploaded a file in ${isDirectMessage ? "DMs" : `${sourceChannel} from **${sourceChannel.guild.name}**`} that has been removed as part of the original post.`,
			files: [attachment],
		});
		return force;
	}

	// process other attachments for relays

	if (isDirectMessage && attachment.name.match(/(aria|dxdiag|event|dalamud|dalamudConfig|launcher|message|output|patcher|SquirrelSetup|velopack).*\.(log|txt|json|evtx|dmp)$/gui)) {
		needToRemoveAttachments = false;
		// Sane filesizes only, using the same ceiling every other upload path
		// applies (modules/processAttachment.js). The extension set here is
		// deliberately wider than checkUpload's (.json/.evtx also relay from DMs),
		// so only the bound is shared.
		//
		// NOTE: this branch warns and then relays anyway — the copy says "has not
		// be relayed" but there is no return. Left as-is because changing it would
		// stop relaying oversized DM logs, which is a behaviour change, not a
		// cleanup.
		if (attachment.size > MAX_UPLOAD_BYTES) {
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
	if (attachment.name.match(/^dalamud_appcrash_.*\.(log)$/gui)) {
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
			const replymsg = await replyToSource(source, {
				embeds: [
					{
						"description": `${author}, Franzbot has relayed ${attachment.name} to a private channel in `
                            + `**${relayChannel.guild.name}** for analysis.\n\n`
                            + `Support staff can find it [here](${relayedMessage.url})\n\n`
                            + `The attachment will be removed.\n\n`
                            + `Original Message:\n`
                            + `>>> ${source.content ?? ''}`
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

	// don't relay crash dumps from goatplace (or DMs)
	if (attachment.name.match(/.*\.(dmp)$/gui)) {
		needToRemoveAttachments = true;
		console.log(`Dalamud crash dump upload: ${attachment.attachment}`);
		// Per Goat, we should not relay DMP files anymore
		if (isDirectMessage) {
			// Per Goat, we should not relay DMP files anymore
			await sourceChannel.send({
				content: `Franzbot no longer handles relaying DMP files as these can contain private data. Please reach out to a Dalamud Support Team member or Dalamud Maintainer member directly if you need one analyzed.`,
			});
		}
		else {
			// Per Goat, we should not relay DMP files anymore
			await replyToSource(source, {
				embeds: [
					{
						"description": `${author}, it can be dangerous to upload a DMP file.\n\n`
							+ `Please do not upload those in public channels.\n\n`
							+ `The attachment will be removed. Please reach out to a Dalamud Support Team member or Dalamud Maintainer member directly if you need one analyzed.\n\n`
							+ `Original Message:\n`
							+ `>>> ${source.content ?? ''}`
						,
					},
				],
				allowedMentions: {
					repliedUser: false,
				},
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
			// Binding not kept: the receipt is sent for its side effect. The old
			// "Original post: <replymsg.url>" follow-up to the relay channel was
			// already commented out below.
			await replyToSource(source, {
				embeds: [
					{
						"description": `${author}, Franzbot has relayed this log to a private channel in `
                            + `**${relayChannel.guild.name}** for analysis.\n\n`
                            + `Support staff can find it [here](${relayedMessage.url})\n\n`
                            + `Original Message:\n`
                            + `>>> ${source.content ?? ''}`
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

	// logger.cmd(`We probably didn't relay. Need for ${attachment.name}: ${needToRemoveAttachments}`);
	return needToRemoveAttachments;
};
