/* eslint-disable max-len */
const logger = require('./Logger.js');
const {
	replyToSource, noticeAfterDefer, mentionTag,
} = require('./respond');
const {
	maxUploadBytesForTier,
} = require('./processAttachment');
const {
	uploadTspackToS3,
} = require('./tspackLoggy');
const {
	resolveRelayChannel,
} = require('./resolveRelayChannel');

/**
 * The "Original Message" quote block appended to a receipt, or '' when there is
 * nothing to quote: interaction sources (slash command, FAQ upload modal) have
 * no message content at all, and a message carrying only attachments would
 * otherwise render an empty quote block.
 */
function originalMessageBlock(source) {
	const content = source.content?.trim();
	if (!content) {
		return '';
	}
	return `\n\nOriginal Message:\n>>> ${source.content}`;
}

/**
 * The "Original post" line pointing back at where the upload happened, or ''
 * when there is nothing to link: only Message sources have a postable URL.
 */
function originalPostBlock(source) {
	if (!source.url) {
		return '';
	}
	return `\n\nOriginal post: ${source.url}`;
}

exports.relayFile = async (client, source, attachment, author, sourceChannel, force) => {
	// NOTE: DM sources stopped routing here when the DM upload flow moved to
	// modules/dmRelay.js (parse/Loggy + a single relay button). Everything below
	// is guild-only: the message triggers, /uploadlog, and the FAQ upload
	// modal's special-file divert.
	let needToRemoveAttachments = false;

	// don't relay crash dumps from goatplace
	// Checked FIRST, ahead of destination resolution and the size gate: a .dmp is
	// refused rather than relayed, so it needs no relay channel and must never be
	// measured against one's upload limit — a crash dump is routinely larger than
	// the limit, and answering it with "too large for the relay channel" would
	// bury the refusal (and skip the removal it asks for). Kept as a check rather
	// than deleted outright in case the handling of these changes one day.
	if (attachment.name.match(/.*\.(dmp)$/gui)) {
		needToRemoveAttachments = true;
		console.log(`Dalamud crash dump upload: ${attachment.attachment}`);
		// Per Goat, we should not relay DMP files anymore
		await replyToSource(source, {
			embeds: [
				{
					"description": `${author}, it can be dangerous to upload a DMP file.\n\nPlease do not upload those in public channels.\n\nThe attachment will be removed. Please reach out to a Dalamud Support Team member or Dalamud Maintainer member directly if you need one analyzed.${originalMessageBlock(source)}`
					,
				},
			],
			allowedMentions: {
				repliedUser: false,
			},
		});
		return needToRemoveAttachments;
	}

	// Configured channel first, then the legacy hardcoded fallbacks for known
	// guilds. See modules/resolveRelayChannel.js — the FAQ modal's private relay
	// deliberately skips those fallbacks.
	const relayChannel = await resolveRelayChannel(client, sourceChannel);
	if (!relayChannel) {
		logger.error("No relay channel set.");
		// Nothing was relayed, which an interaction has to be told: it is
		// deferred, and would otherwise sit on "thinking..." forever. A Message
		// source is left alone here, as it always has been. In a guild the
		// missing value is that server's own setting, so there is an admin to
		// point at.
		if (typeof source.deleteReply === 'function') {
			await noticeAfterDefer(source, `Franzbot did not relay \`${attachment.name}\`: this server has no private relay channel set up. Please let a server admin know to contact Franz.`);
		}
		return false;
	}

	// The relay channel's server has its own upload limit (its boost tier), and
	// that is the hard bound on the relay: Franzbot re-uploads the file INTO
	// that server, so a file bigger than its tier allows cannot land there no
	// matter what intake accepted — the legacy fallback can even point at a
	// DIFFERENT server than the one the upload happened in. Interactions are
	// answered privately (they are already deferred); a Message source gets a
	// public reply, since there is no ephemeral channel to a message.
	if (attachment.size > maxUploadBytesForTier(relayChannel.guild?.premiumTier)) {
		const tooLargeNotice = `Franzbot did not relay \`${attachment.name}\`: it is too large for the relay channel's upload limit.`;
		if (typeof source.deleteReply === 'function') {
			await noticeAfterDefer(source, tooLargeNotice);
		}
		else {
			await replyToSource(source, {
				embeds: [
					{
						"description": `${author}, \`${attachment.name}\` is too large for the relay channel's upload limit, so it was not relayed. Please reach out to the support team directly if you need it analyzed.${originalMessageBlock(source)}`,
					},
				],
				allowedMentions: {
					repliedUser: false,
				},
			});
		}
		return false;
	}

	// tspacks have to go first because they're special.
	const TSPACK_RELAY_ENABLE = true;
	if (attachment.name.match(/.*\.(tspack)$/gui)) {
		needToRemoveAttachments = true;
		console.log(`Troubleshooting pack upload: ${attachment.attachment}`);
		// const response = await got(attachment.attachment);
		console.log(`Fetched custom channel to relay: ${relayChannel.name}`);
		const relayedMessage = await relayChannel.send({
			embeds: [
				{
					"description": `${mentionTag(author)} uploaded a troubleshooting pack in ${sourceChannel} from **${sourceChannel.guild.name}**.${originalMessageBlock(source)}`,
				},
			],
			files: [attachment],
		});


		// We upload these to S3 because Discord killed Franz's proxy
		const objGuildID = source.guild?.id ?? "directmessage";
		const {
			loggyUrl,
		} = await uploadTspackToS3(client, attachment, author, objGuildID);

		if (TSPACK_RELAY_ENABLE && !force) {
			// Binding not kept: the receipt is sent for its side effect, and the
			// relay-channel follow-up links the ORIGINAL post instead (below).
			await replyToSource(source, {
				embeds: [
					{
						"description": `${author}, Franzbot has relayed this tspack to a private channel in ${relayChannel.guild.name} for analysis by select members of the support team.\n\nSupport staff can find it [here](${relayedMessage.url})\n\n**NOTE**: Please make sure to provide some context about this if you haven't already.${originalMessageBlock(source)}`
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
					"description": `Read provided logs on [Loggy](${loggyUrl})${originalPostBlock(source)}`,
				},
			],
		});

		return needToRemoveAttachments;
	}

	// if we've already made a relay post, just relay the the rest of the attachments
	if (force) {
		logger.debug(`Forced relaying ${attachment.name}`);
		await relayChannel.send({
			content: `${mentionTag(author)} also uploaded a file in ${sourceChannel} from **${sourceChannel.guild.name}** that has been removed as part of the original post.`,
			files: [attachment],
			// The `<@id>` must render but must not notify the uploader.
			allowedMentions: {
				parse: [],
			},
		});
		return force;
	}

	// relay crash dumps from goatplace
	if (attachment.name.match(/^dalamud_appcrash_.*\.(log)$/gui)) {
		needToRemoveAttachments = true;
		console.log(`Dalamud crash dump upload: ${attachment.attachment}`);
		// const response = await got(attachment.attachment);
		console.log(`Fetched custom channel to relay: ${relayChannel.name}`);
		const relayedMessage = await relayChannel.send({
			embeds: [
				{
					"description": `${mentionTag(author)} uploaded a crash log in ${sourceChannel} from **${sourceChannel.guild.name}**.`,
				},
			],
			files: [attachment],
		});

		const replymsg = await replyToSource(source, {
			embeds: [
				{
					"description": `${author}, Franzbot has relayed ${attachment.name} to a private channel in ${relayChannel.guild.name} for analysis.\n\nSupport staff can find it [here](${relayedMessage.url})\n\nThe attachment will be removed.${originalMessageBlock(source)}`
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
		return needToRemoveAttachments;
	}

	// relay dalamud.injector.log files from goatplace
	const DALAMUD_INJECTOR_RELAY_ENABLE = true;
	if (DALAMUD_INJECTOR_RELAY_ENABLE && attachment.name.match(/dalamud\.injector.*\.(log)$/gui)) {
		needToRemoveAttachments = true;
		console.log(`Dalamud injector log upload: ${attachment.attachment}`);
		// const response = await got(attachment.attachment);
		console.log(`Fetched custom channel to relay: ${relayChannel.name}`);
		const relayedMessage = await relayChannel.send({
			embeds: [
				{
					"description": `${mentionTag(author)} uploaded a dalamud.injector log in ${sourceChannel} from **${sourceChannel.guild.name}**.`,
				},
			],
			files: [attachment],
		});

		// Binding not kept: the receipt is sent for its side effect. The old
		// "Original post: <replymsg.url>" follow-up to the relay channel was
		// already commented out below.
		await replyToSource(source, {
			embeds: [
				{
					"description": `${author}, Franzbot has relayed this log to a private channel in ${relayChannel.guild.name} for analysis.\n\nSupport staff can find it [here](${relayedMessage.url})${originalMessageBlock(source)}`,
				},
			],
			allowedMentions: {
				repliedUser: false,
			},
		});

		// injector log no longer has the thing unless it's debug.
		// TODO: parse injector log and verbose xlcore logs and strip that out.
		// await message.removeAttachments().catch(console.error);
		return needToRemoveAttachments;
	}

	// logger.cmd(`We probably didn't relay. Need for ${attachment.name}: ${needToRemoveAttachments}`);
	return needToRemoveAttachments;
};
