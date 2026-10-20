// Message context-menu command: right-click a message, Apps → "Process log
// with Franzbot".
//
// The command itself only validates the target message's attachments and opens
// the handling modal (modals/processAttachment.js). Discord modals cannot be
// pre-filled with a file, and a context menu cannot supply a fresh upload, so
// the files stay on the target message: they are parked in
// modules/pendingAttachmentStore.js under a token that travels in the modal's
// customId, and every file is then processed with the one choice the moderator
// makes. Nothing is re-uploaded before the modal.
//
// Moderator-only: Discord hides it behind Manage Messages, and the runtime
// check below covers the administrators who always see it.

const {
	ContextMenuCommandBuilder, ApplicationCommandType, PermissionFlagsBits, MessageFlags,
} = require('discord.js');
const {
	randomUUID,
} = require('crypto');
const {
	checkUpload, isUploadableAttachment, maxUploadBytesForTier,
} = require('../modules/processAttachment');
const {
	createPending,
} = require('../modules/pendingAttachmentStore');
const {
	buildProcessAttachmentModal,
} = require('../modals/processAttachment');

exports.commandData = () => new ContextMenuCommandBuilder()
	.setName('Process log with Franzbot')
	.setType(ApplicationCommandType.Message)
	.setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages)
	.toJSON();

exports.run = async (client, interaction) => {
	// setDefaultMemberPermissions only hides the command; administrators still
	// see it, so the permission is enforced again here.
	if (!interaction.memberPermissions?.has(PermissionFlagsBits.ManageMessages)) {
		await interaction.reply({
			content: 'Processing attachments is limited to moderators (Manage Messages).',
			flags: MessageFlags.Ephemeral,
		});
		return;
	}

	// Every file the moderator is acting on, in message order. DMPs and
	// non-log files are not candidates at all: a DMP is refused everywhere
	// (checkUpload's message) and the modal has no way to attach something
	// else, so silently omitting them would hide the refusal. Filtering first
	// also means an image-heavy message with one log still works.
	const target = interaction.targetMessage;
	const candidates = [...target.attachments.values()]
		.filter(attachment => isUploadableAttachment(attachment.name));

	if (candidates.length === 0) {
		await interaction.reply({
			content: 'That message has no supported log files. Supported: any .log/.txt plain text file, .tspack, or .evtx.',
			flags: MessageFlags.Ephemeral,
		});
		return;
	}

	// Validate them all now: showModal must be the interaction's first and only
	// response, so there is no second chance to refuse a bad file afterwards.
	// One refusal aborts the whole thing rather than processing part of the set,
	// since the moderator chose a single handling mode for all of them.
	const maxBytes = maxUploadBytesForTier(interaction.guild?.premiumTier);
	for (const attachment of candidates) {
		const rejection = checkUpload(attachment.name, attachment.size, maxBytes);
		if (rejection) {
			await interaction.reply({
				content: rejection,
				flags: MessageFlags.Ephemeral,
			});
			return;
		}
	}

	// The record is consumed by the modal submit handler; the TTL sweep drops it
	// if the moderator never submits.
	const token = randomUUID();
	createPending(token, {
		attachments: candidates,
		// The original uploader, so a parse-mode tspack's S3 copy is tagged with
		// the person who provided it rather than the moderator handling it.
		authorId: target.author?.id,
		guildId: interaction.guildId,
		channelId: interaction.channelId,
		messageUrl: target.url,
		createdAt: Date.now(),
	});

	await interaction.showModal(buildProcessAttachmentModal(token, candidates));
};
