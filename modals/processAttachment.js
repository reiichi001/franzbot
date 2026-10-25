// The "Process log with Franzbot" message-command modal: a copy of the FAQ
// upload modal's handling choices, minus the file field.
//
// There is no file component because there is nothing to upload: the target
// message's files were validated by application_commands/processlog.js and parked in
// modules/pendingAttachmentStore.js, keyed by the token in this modal's
// customId. Every parked file is processed with the one handling mode chosen
// here.
//
// Attribution: the invoking moderator is not the person who uploaded anything —
// they are only asking Franzbot to process (or relay) someone else's logs. Relay
// posts and special-file receipts therefore name the original message's author
// (the pending record's authorId), not the moderator.
//
// Everything is validated BEFORE the interaction is deferred, so rejections can
// be ephemeral and leave nothing public behind.

const {
	ModalBuilder, LabelBuilder, TextDisplayBuilder,
	RadioGroupBuilder, RadioGroupOptionBuilder,
} = require('@discordjs/builders');
const {
	PermissionFlagsBits, MessageFlags,
} = require('discord.js');
const {
	isSpecialRelayAttachment,
} = require('../modules/processAttachment');
const {
	uploadTspackToS3,
} = require('../modules/tspackLoggy');
const {
	relayFile,
} = require('../modules/relayFile');
const {
	parseLog,
} = require('../modules/parseLog');
const {
	failAfterDefer, mentionTag,
} = require('../modules/respond');
const {
	resolve: resolvePending, deletePending,
} = require('../modules/pendingAttachmentStore');

// The customId is `processAttachment:<token>`; interactionCreate splits on ':'
// and dispatches to this file's one handler.
const MODAL_PREFIX = 'processAttachment';
const MODE_FIELD_ID = 'log_mode';

// Handling modes, in display order. The FIRST option is what Discord's radio
// group shows preselected, so `public` leads — it is the default behavior.
// "Post privately" exists only in this moderator flow: regular users' guild
// uploads (modals/uploadLog.js) no longer offer it.
const MODE_PUBLIC = 'public';
const MODE_PRIVATE = 'private';
const MODE_PRIVATE_RELAY = 'private_relay';

const MODE_OPTIONS = [
	{
		label: 'Post publicly (default)',
		value: MODE_PUBLIC,
		description: 'Parse the logs and post the results in this channel.',
	},
	{
		label: 'Post privately',
		value: MODE_PRIVATE,
		description: 'Parse the logs; only you can see the results.',
	},
	{
		label: 'Relay privately',
		value: MODE_PRIVATE_RELAY,
		description: "Send the logs and results to this server's relay channel.",
	},
];

const VALID_MODES = new Set(MODE_OPTIONS.map(o => o.value));

// A tspack is the one "special" file with a parse-mode answer: it cannot produce
// troubleshooting embeds, but its S3 copy is what Loggy reads, so a parse mode
// can hand back a Loggy link without relaying anything.
const TSPACK_NAME = /.*\.(tspack)$/iu;
function isTspackAttachment(name) {
	return TSPACK_NAME.test(name);
}

/**
 * Build the modal. `attachments` is only used to name the files being acted on
 * — they are re-read from the pending record on submit, not from the modal.
 */
function buildProcessAttachmentModal(token, attachments) {
	const modal = new ModalBuilder()
		.setCustomId(`${MODAL_PREFIX}:${token}`)
		.setTitle('Process log attachments');

	// Discord modals cannot pre-fill a file component, so the files are shown as
	// text instead. Discord caps a text display at 4000 characters; long lists
	// are truncated rather than failing the whole modal, and the names remain on
	// the source message anyway.
	const list = attachments
		.map(attachment => `• \`${attachment.name}\``)
		.join('\n');
	const heading = `${attachments.length} file${attachments.length === 1 ? '' : 's'} `
		+ 'from the selected message will be processed with the choice below:';
	modal.addTextDisplayComponents(
		new TextDisplayBuilder().setContent(`${heading}\n${list}`.slice(0, 4000))
	);

	const radio = new RadioGroupBuilder().setCustomId(MODE_FIELD_ID);
	for (const option of MODE_OPTIONS) {
		radio.addOptions(
			new RadioGroupOptionBuilder()
				.setLabel(option.label)
				.setValue(option.value)
				.setDescription(option.description)
		);
	}
	// Required so a log can never land somewhere the moderator didn't choose;
	// the handler still falls back to `public` if the value is ever absent.
	radio.setRequired(true);

	modal.addLabelComponents(
		new LabelBuilder()
			.setLabel('How should Franzbot handle them?')
			.setRadioGroupComponent(radio)
	);

	return modal;
}

/**
 * Ephemeral rejection. Only valid before the interaction is deferred.
 */
function reject(interaction, content) {
	return interaction.reply({
		content,
		flags: MessageFlags.Ephemeral,
	});
}

/**
 * How a relayed message names where the logs came from. A channel stringifies
 * to its own mention (`#name`), which is what the support team needs to get back
 * to the conversation.
 */
function describeSource(interaction) {
	return interaction.channel ? `${interaction.channel}` : 'an unknown channel';
}

/**
 * Whether the moderator can normally type in the channel where the command was
 * used. A context-menu command can still be usable in a read-only channel, so
 * this is separate from whether the interaction itself can be answered.
 */
function canUserTypeInSource(interaction) {
	const perms = interaction.channel?.permissionsFor?.(interaction.member);
	return Boolean(perms?.has(PermissionFlagsBits.SendMessages));
}

/**
 * The person relay posts and receipts should name: the original message's
 * author, not the moderator who invoked the command — the moderator uploaded
 * nothing. Falls back to a bare id stub when the fetch fails (mentionTag
 * renders `<@id> (**Unknown** (id))`, and relayFile interpolates `${author}`
 * inside embed descriptions, which never notify), and to the invoking moderator
 * only when the record carries no author id at all.
 */
async function resolveAttachmentOwner(client, record, interaction) {
	if (!record.authorId) {
		return interaction.user;
	}
	return client.users.fetch(record.authorId)
		.catch(() => ({
			id: record.authorId,
		}));
}

/**
 * Reproduce the old message-trigger processor's cleanup (the per-guild
 * triggers named processAttachment): a post carrying any special relay file
 * type never keeps sitting in a public channel. Once processing has succeeded,
 * the target message's text content is reposted here — so the conversation
 * context is not lost with the message — and the original is then deleted,
 * whatever handling mode was chosen. A post holding only ordinary log files is
 * left untouched, and a message that has already disappeared short-circuits
 * everything.
 */
async function repostAndRemoveOriginal(client, interaction, record, owner) {
	// The cleanup decision is type-based and re-checked here, so a call site can
	// run it unconditionally after a successful reply without reposting an
	// ordinary-log post by mistake.
	if (!record.attachments.some(attachment => isSpecialRelayAttachment(attachment.name))) {
		return;
	}
	const channel = interaction.channel
		?? await client.channels.fetch(record.channelId).catch(() => null);
	if (!channel) {
		return;
	}
	const original = await channel.messages.fetch(record.messageId).catch(() => null);
	if (!original) {
		// Already gone: nothing to preserve and nothing to remove.
		return;
	}
	const content = original.content?.trim();
	if (content) {
		// Capped to a normal message's length minus the preamble; the private
		// relay receipts already quote the full text for the support team.
		const preamble = `${mentionTag(owner)} posted:\n>>> `;
		await channel.send({
			content: `${preamble}${content.slice(0, 2000 - preamble.length - 4)}`,
			allowedMentions: {
				parse: [],
			},
		});
	}
	await original.delete().catch(console.error);
}

/**
 * The per-server configured relay channel for a guild, or null when the guild
 * has no configuration. Deliberately does NOT fall back to the legacy
 * CHANNELID_RELAY_* config keys used by relayFile.js — private relay is
 * offered as "this server's relay channel", so an unconfigured server must be
 * refused rather than quietly redirected somewhere the moderator didn't choose.
 */
async function resolveConfiguredRelayChannel(client, guildId) {
	const relayChannelId = client.perserversettings
		?.get(`${guildId}-serversettings`)
		?.get('relayChannel');
	if (!relayChannelId) {
		return null;
	}
	return client.channels.fetch(relayChannelId)
		.catch(() => null);
}

/**
 * Whether Franzbot can post the logs (message + attachments + embeds) in
 * `channel`.
 */
function botCanPost(channel) {
	const botMember = channel.guild?.members?.me;
	if (!botMember) {
		return false;
	}
	const perms = channel.permissionsFor?.(botMember);
	return Boolean(perms?.has([
		PermissionFlagsBits.SendMessages,
		PermissionFlagsBits.AttachFiles,
		PermissionFlagsBits.EmbedLinks,
	]));
}

/**
 * Resolve where the upload should go, or reject and return undefined. Same
 * contract as the FAQ modal's resolver — see modals/uploadLog.js.
 */
async function resolveDestination(client, interaction, mode) {
	if (mode === MODE_PRIVATE) {
		return {
			destination: null,
			privateResponse: true,
			relay: false,
		};
	}

	if (mode === MODE_PUBLIC) {
		return {
			destination: interaction.channel,
			privateResponse: false,
			relay: false,
		};
	}

	// MODE_PRIVATE_RELAY — the server's configured relay channel, and nothing
	// else. It posts somewhere other than the channel the command was used in,
	// so the moderator gets a receipt back rather than the logs themselves.
	const destination = await resolveConfiguredRelayChannel(client, interaction.guildId);
	if (!destination) {
		await reject(interaction, 'This server has no relay channel configured, so the private relay option is unavailable. '
			+ 'Choose "Post publicly", "Post privately", or "Relay privately".');
		return undefined;
	}

	if (!botCanPost(destination)) {
		await reject(interaction, `Franzbot cannot post attachments in ${destination}. `
			+ 'Choose another destination, or ask an administrator to check the channel permissions.');
		return undefined;
	}

	// Public receipt, deliberately: the moderator's reply is what tells the
	// support team in THIS channel that logs were relayed and gives them the links.
	return {
		destination,
		privateResponse: false,
		relay: true,
	};
}

/**
 * Handle a submission. The files come from the pending record; `interaction.fields`
 * carries only the handling mode.
 */
async function handleSubmission(client, interaction) {
	// Same permission gate as the command: permissions can change between the
	// modal opening and its submission.
	if (!interaction.memberPermissions?.has(PermissionFlagsBits.ManageMessages)) {
		await reject(interaction, 'Processing attachments is limited to moderators (Manage Messages).');
		return;
	}

	const token = interaction.customId.slice(MODAL_PREFIX.length + 1);
	const record = resolvePending(token);
	if (!record) {
		await reject(interaction, 'This processing request has expired. Right-click the message and run "Process log with Franzbot" again.');
		return;
	}
	// One-shot: the modal can only be submitted once, so the record is consumed
	// here even if processing fails below.
	deletePending(token);

	const attachments = record.attachments;

	// --- Handling mode ------------------------------------------------------
	const mode = interaction.fields.getRadioGroup(MODE_FIELD_ID, false) ?? MODE_PUBLIC;
	if (!VALID_MODES.has(mode)) {
		await reject(interaction, 'Unrecognised handling option. Please reopen the dialog and choose again.');
		return;
	}

	// --- Special files ------------------------------------------------------
	// tspack / appcrash / dalamud.injector logs have dedicated relay handling in
	// modules/relayFile.js and can never produce troubleshooting embeds. The
	// private relay mode sends all of them there. In the parse modes, appcrash and
	// injector logs keep that relay (except under "Post privately", where they
	// are answered with the file itself), while a tspack is processed below into
	// a Loggy link instead. (checkUpload already refused .dmp before the modal
	// opened.)
	const isRelayMode = mode === MODE_PRIVATE_RELAY;
	const relaySpecials = attachments.filter(attachment => {
		if (!isSpecialRelayAttachment(attachment.name)) {
			return false;
		}
		// tspack relays only when relaying was asked for; in a parse mode it
		// stays below and gets the Loggy link instead.
		if (isTspackAttachment(attachment.name)) {
			return isRelayMode;
		}
		// The other dedicated types (appcrash, injector) cannot produce anything,
		// so outside "Post privately" they keep their relay handling.
		return mode !== MODE_PRIVATE;
	});
	const parseable = attachments.filter(attachment => !relaySpecials.includes(attachment));

	// Whether the original post carries any file type the old message-trigger
	// processor always relayed and removed (tspack, dalamud appcrash,
	// dalamud.injector — .dmp is refused before the modal ever opens). When it
	// does, the submit handler reposts the message's text and deletes it once
	// processing has succeeded, whatever handling mode was chosen.
	const hasRemoveType = attachments.some(attachment => isSpecialRelayAttachment(attachment.name));

	// Resolve who the relay posts, receipts, and the cleanup repost name BEFORE
	// deferring — the owner is needed wherever relayFile runs (any special
	// file), for the relay post's attribution, and to credit the reposted text.
	// A plain public/private parse of ordinary logs never touches it, so no
	// fetch is spent on that path; the single users.fetch sits comfortably
	// inside the modal submit's 3-second window.
	const needsOwner = relaySpecials.length > 0 || mode === MODE_PRIVATE_RELAY || hasRemoveType;
	const owner = needsOwner
		? await resolveAttachmentOwner(client, record, interaction)
		: null;

	// Nothing but special files: relayFile resolves the server's own relay
	// channel and answers this interaction itself.
	if (parseable.length === 0) {
		await interaction.deferReply();
		try {
			for (const attachment of relaySpecials) {
				await relayFile(client, interaction, attachment, owner, interaction.channel, false);
			}
			// Cleanup only after every relay succeeded: a failure above leaves the
			// original (and its context) right where it was.
			await repostAndRemoveOriginal(client, interaction, record, owner);
		}
		catch (e) {
			await failAfterDefer(interaction, e, 'There was a problem processing those attachments.');
		}
		return;
	}

	// --- Destination --------------------------------------------------------
	// Resolved before the defer so its rejections can still be ephemeral replies.
	const target = await resolveDestination(client, interaction, mode);
	if (!target) {
		// resolveDestination already answered the interaction.
		return;
	}
	const {
		destination, privateResponse, relay,
	} = target;

	await interaction.deferReply(privateResponse
		? {
			flags: MessageFlags.Ephemeral,
		}
		: {});

	try {
		// Special files relay themselves first. relayFile answers through
		// editReply, so anything posted for the parseable files below uses a
		// follow-up to avoid overwriting the relay receipt.
		for (const attachment of relaySpecials) {
			await relayFile(client, interaction, attachment, owner, interaction.channel, false);
		}
		const answer = relaySpecials.length > 0
			? payload => interaction.followUp(payload)
			: payload => interaction.editReply(payload);

		// parseLog only returns embeds — this handler decides where they go.
		// A tspack has no parseable content, but its S3 copy backs a Loggy reader,
		// so that link stands in for the parse results.
		const embeds = [];
		for (const attachment of parseable) {
			if (isTspackAttachment(attachment.name)) {
				const {
					loggyUrl,
				} = await uploadTspackToS3(
					client,
					attachment,
					{
						id: record.authorId ?? interaction.user.id,
					},
					interaction.guildId
				);
				embeds.push({
					description: `Read provided logs on [Loggy](${loggyUrl})`,
				});
				continue;
			}
			const fileEmbeds = await parseLog(client, attachment, {
				anyTextFile: true,
				guildId: interaction.guildId,
			}) ?? [];
			embeds.push(...fileEmbeds);
		}

		const names = parseable
			.map(attachment => `\`${attachment.name}\``)
			.join(', ');
		const parsed = embeds.length > 0;
		// Name the Loggy link when every parseable file was a tspack; a mixed
		// selection still reads as parsed results.
		const allTspack = parseable.length > 0
			&& parseable.every(attachment => isTspackAttachment(attachment.name));
		const summary = parsed
			? `${allTspack ? 'Loggy link for' : 'Parsed results for'} ${names}:`
			: `No troubleshooting data (TROUBLESHOOTING / TROUBLESHXLTING / LASTEXCEPTION) was found in `
				+ `${names}, so there is nothing to analyze. The file${parseable.length === 1 ? ' is' : 's are'} attached.`;

		// Relay: the files and any results are posted to the destination as their
		// own message and the moderator gets a receipt linking to it. The relay
		// post names the OWNER of the files (see resolveAttachmentOwner); the
		// receipt below stays the moderator's interaction reply and names nobody.
		if (relay) {
			const sourceRef = describeSource(interaction);
			// Relaying is only offered inside a server, so a moderator who cannot
			// post in the channel they ran the command in is here by virtue of the
			// context menu rather than the conversation. The receipt below would
			// then be the only public thing they put in that channel, so it is
			// skipped, and the tag becomes a real mention instead: staff learn
			// about the upload in the relay channel, where they can page the
			// person who actually posted the logs.
			const canReplyHere = canUserTypeInSource(interaction);
			const posted = await destination.send({
				// Two attributions: when the moderator relays their own message's
				// files, the simple form stands; when they relay someone else's
				// (the usual case), name both who relayed and who uploaded.
				content: owner?.id === interaction.user.id
					? `${mentionTag(owner)} uploaded ${names} in ${sourceRef}, processed with Franzbot.`
					: `${mentionTag(interaction.user)} has relayed ${mentionTag(owner)}'s ${names} from ${sourceRef}.`,
				embeds,
				files: parseable,
				allowedMentions: {
					parse: canReplyHere ? [] : ['users'],
				},
			});
			if (!canReplyHere) {
				// Leave nothing public behind in a channel they can't write in.
				await interaction.deleteReply()
					.catch(() => null);
				// The relay post is already up, so the cleanup still happens.
				await repostAndRemoveOriginal(client, interaction, record, owner)
					.catch(console.error);
				return;
			}
			const relayedSummary = `${parsed ? 'The logs and their parsed results have' : 'The logs have'} been relayed`;
			await answer({
				content: `${relayedSummary} to this server's relay channel. It is private and only visible to the support team.\n`
					+ `Staff can find it [here](${posted.url})`,
			});
			await repostAndRemoveOriginal(client, interaction, record, owner)
				.catch(console.error);
			return;
		}

		await answer({
			content: summary,
			embeds,
			files: parseable,
		});
		// Cleanup runs only after the reply landed; anything relayed above has
		// long since been posted. A repost/delete failure is logged, not raised:
		// the interaction is already answered and the results are delivered.
		await repostAndRemoveOriginal(client, interaction, record, owner)
			.catch(console.error);
	}
	catch (e) {
		// Nothing public should be left behind by a failure: drop the reply and
		// report privately.
		await failAfterDefer(interaction, e, 'There was a problem processing those attachments.');
	}
}

module.exports = {
	MODAL_PREFIX,
	buildProcessAttachmentModal,
	handleSubmission,
	modalData: () => ({
		name: MODAL_PREFIX,
		description: 'Handle log attachments picked from a message context menu.',
	}),
	run: async (client, interaction) => {
		await handleSubmission(client, interaction);
	},
};
