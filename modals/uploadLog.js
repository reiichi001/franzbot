// The FAQ "Upload Log" modal: its definition, and what happens when it is
// submitted. Self-contained — the button that opens it lives in
// buttons/uploadLog.js and only needs buildUploadLogModal().
//
// Everything is validated BEFORE the interaction is deferred, so rejections can
// be ephemeral and leave nothing public behind.

const {
	ModalBuilder, LabelBuilder, FileUploadBuilder,
	RadioGroupBuilder, RadioGroupOptionBuilder, ChannelSelectMenuBuilder,
} = require('@discordjs/builders');
// @discordjs/builders doesn't re-export ChannelType, so the enum comes from
// discord.js (same values — both trace back to discord-api-types).
const {
	ChannelType, PermissionFlagsBits,
} = require('discord.js');
const {
	checkUpload, isSpecialRelayAttachment, maxUploadBytesForTier,
} = require('../modules/processAttachment');
const {
	relayFile,
} = require('../modules/relayFile');
const {
	parseLog,
} = require('../modules/parseLog');
const {
	failAfterDefer, mentionTag,
} = require('../modules/respond');

// Component ids. The modal shares the button's id so modal submits dispatch to
// `client.modalcmds.get('uploadLog')` exactly like buttons do.
const UPLOAD_LOG_MODAL_ID = 'uploadLog';
const FILE_FIELD_ID = 'log_file';
const MODE_FIELD_ID = 'log_mode';
const CHANNEL_FIELD_ID = 'log_channel';

// Handling modes, in display order. The FIRST option is what Discord's radio
// group shows preselected, so `public` leads — it is the default behavior.
const MODE_PUBLIC = 'public';
const MODE_PRIVATE = 'private';
const MODE_RELAY = 'relay';
const MODE_PRIVATE_RELAY = 'private_relay';

const MODE_OPTIONS = [
	{
		label: 'Post publicly (default)',
		value: MODE_PUBLIC,
		description: 'Parse the log and post the results in this channel.',
	},
	{
		label: 'Post privately',
		value: MODE_PRIVATE,
		description: 'Parse the log; only you can see the results.',
	},
	{
		label: 'Relay to a channel',
		value: MODE_RELAY,
		description: 'Send the log and results to a channel you choose.',
	},
	{
		label: 'Relay privately',
		value: MODE_PRIVATE_RELAY,
		description: "Send the log and results to this server's relay channel.",
	},
];

// Modes that post somewhere other than the channel the button was used in.
const RELAY_MODES = [
	MODE_RELAY,
	MODE_PRIVATE_RELAY,
];

const VALID_MODES = new Set(MODE_OPTIONS.map(o => o.value));

/**
 * Modes offered in the current context. In a DM there is no guild to relay
 * into and no per-server config, so only the two in-place modes apply.
 */
function availableModes(inGuild) {
	if (!inGuild) {
		return MODE_OPTIONS.filter(o => !RELAY_MODES.includes(o.value));
	}
	return MODE_OPTIONS;
}

/**
 * Build the modal for an interaction context (`interaction.inGuild()`).
 */
function buildUploadLogModal(inGuild) {
	const modal = new ModalBuilder()
		.setCustomId(UPLOAD_LOG_MODAL_ID)
		.setTitle('Upload a log for analysis');

	// Exactly one file. The accepted extensions are enforced on submit — a
	// Discord file-upload component cannot restrict file types itself.
	modal.addLabelComponents(
		new LabelBuilder()
			.setLabel('Log file')
			.setDescription('Accepted: .log, .txt, .tspack or .evtx — up to 10 MB')
			.setFileUploadComponent(
				new FileUploadBuilder()
					.setCustomId(FILE_FIELD_ID)
					.setMinValues(1)
					.setMaxValues(1)
					.setRequired(true)
			)
	);

	const radio = new RadioGroupBuilder().setCustomId(MODE_FIELD_ID);
	for (const option of availableModes(inGuild)) {
		radio.addOptions(
			new RadioGroupOptionBuilder()
				.setLabel(option.label)
				.setValue(option.value)
				.setDescription(option.description)
		);
	}
	// Required so a log can never land somewhere the uploader didn't choose;
	// the handler still falls back to `public` if the value is ever absent.
	radio.setRequired(true);

	modal.addLabelComponents(
		new LabelBuilder()
			.setLabel('How should Franzbot handle it?')
			.setRadioGroupComponent(radio)
	);

	// Only meaningful for "Relay to a channel", and only inside a guild. Kept
	// optional because the other three modes ignore it. Threads are left out on
	// purpose: permission checks on threads are subtler than on plain channels.
	if (inGuild) {
		modal.addLabelComponents(
			new LabelBuilder()
				.setLabel('Relay destination')
				.setDescription('Only used by "Relay to a channel". Channels you can post and attach files in.')
				.setChannelSelectMenuComponent(
					new ChannelSelectMenuBuilder()
						.setCustomId(CHANNEL_FIELD_ID)
						.setChannelTypes(
							ChannelType.GuildText,
							ChannelType.GuildAnnouncement
						)
						.setRequired(false)
				)
		);
	}

	return modal;
}

/**
 * Ephemeral rejection. Only valid before the interaction is deferred.
 */
function reject(interaction, content) {
	return interaction.reply({
		content,
		ephemeral: true,
	});
}

/**
 * How a relayed message names where the upload came from. A channel stringifies
 * to its own mention (`#name`), which is what the support team needs to get back
 * to the conversation; a DM has nothing to point at, so it is named outright.
 */
function describeSource(interaction) {
	if (interaction.channel?.isDMBased?.()) {
		return 'Direct Messages';
	}
	return interaction.channel ? `${interaction.channel}` : 'an unknown channel';
}

/**
 * Whether the uploader can normally type in the channel where the modal was
 * opened. A slash command can still be usable in a read-only channel, so this
 * is separate from whether the interaction itself can be answered.
 */
function canUserTypeInSource(interaction) {
	const perms = interaction.channel?.permissionsFor?.(interaction.member);
	return Boolean(perms?.has(PermissionFlagsBits.SendMessages));
}

/**
 * The per-server configured relay channel for a guild, or null when the guild
 * has no configuration. Deliberately does NOT fall back to the legacy
 * CHANNELID_RELAY_* config keys used by relayFile.js — private relay is
 * offered as "this server's relay channel", so an unconfigured server must be
 * refused rather than quietly redirected somewhere the user didn't choose.
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
 * Whether `member` can relay a log into `channel`: they must be able to post
 * there AND attach the file themselves. Discord's modal channel select cannot
 * filter beyond View Channel, so it can still list channels where one of these
 * is missing; this check is what actually refuses them on submit.
 */
function memberCanRelayInto(member, channel) {
	const perms = channel.permissionsFor?.(member);
	return Boolean(perms?.has([
		PermissionFlagsBits.ViewChannel,
		PermissionFlagsBits.SendMessages,
		PermissionFlagsBits.AttachFiles,
	]));
}

/**
 * Whether Franzbot can post the log (message + attachment + embed) in `channel`.
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
 * Resolve where the upload should go, or reject and return undefined.
 * Returns { destination, privateResponse, relay }:
 *   destination     - channel to post the log into, or null to answer in place
 *   privateResponse - the uploader's own reply is ephemeral. Only "Post
 *                     privately" is: it exists so someone can run a parse for
 *                     themselves. Everything else — including both relay modes —
 *                     answers in the open, because the point of relaying is that
 *                     the support team can see the upload happened and find it.
 *   relay           - the log is posted to `destination` as its own message and
 *                     the uploader gets a public receipt linking to it, instead
 *                     of the log going into the uploader's reply
 */
async function resolveDestination(client, interaction, mode) {
	const inGuild = interaction.inGuild();

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

	// Both relay modes post somewhere other than the channel the button was used
	// in, so the uploader gets a receipt back rather than the log itself.
	if (!inGuild) {
		await reject(interaction, 'Relaying is only available inside a server. Choose "Post publicly" or "Post privately" instead.');
		return undefined;
	}

	let destination;

	if (mode === MODE_RELAY) {
		const selected = interaction.fields.getSelectedChannels(CHANNEL_FIELD_ID, false, [
			ChannelType.GuildText,
			ChannelType.GuildAnnouncement,
		]);
		const chosen = selected?.first();
		if (!chosen) {
			await reject(interaction, 'No relay destination was selected. Pick a channel in the '
				+ '"Relay destination" field, or choose a different handling option.');
			return undefined;
		}
		// Re-fetch so we hold a full channel object (permission helpers need it)
		// rather than the partial one resolved from the modal's payload.
		destination = await client.channels.fetch(chosen.id).catch(() => null);
		if (!destination) {
			await reject(interaction, 'That relay destination is no longer available. Please pick another channel.');
			return undefined;
		}
		// Only channels the uploader can already post in are acceptable, so the
		// relay can never be used to carry a log into a channel they can't read.
		if (!memberCanRelayInto(interaction.member, destination)) {
			await reject(interaction, `You do not have permission to post and attach files in ${destination}. `
				+ 'Choose a channel where you can send messages and attach files.');
			return undefined;
		}
	}
	else {
		// MODE_PRIVATE_RELAY — the server's configured relay channel, and nothing else.
		destination = await resolveConfiguredRelayChannel(client, interaction.guildId);
		if (!destination) {
			await reject(interaction, 'This server has no relay channel configured, so the private relay option is unavailable. '
				+ 'Choose "Post publicly", "Post privately", or "Relay to a channel".');
			return undefined;
		}
	}

	if (!botCanPost(destination)) {
		await reject(interaction, `Franzbot cannot post attachments in ${destination}. `
			+ 'Choose another destination, or ask an administrator to check the channel permissions.');
		return undefined;
	}

	// Public receipt, deliberately: the uploader's reply is what tells the support
	// team in THIS channel that a log was relayed and gives them the link to it.
	return {
		destination,
		privateResponse: false,
		relay: true,
	};
}

/**
 * Handle a submission. `interaction.fields` carries the file, the handling
 * mode, and (for relay) the chosen destination.
 */
async function handleUpload(client, interaction) {
	// --- File ---------------------------------------------------------------
	const attachment = interaction.fields
		.getUploadedFiles(FILE_FIELD_ID, false)
		?.first();
	if (!attachment) {
		await reject(interaction, 'No file was uploaded. Click "Upload Log" again and attach a log file.');
		return;
	}
	// Same accepted set as /uploadlog (see checkUpload): the user has declared
	// this is a log, so content decides what gets parsed. The size ceiling is
	// quietly this server's own upload limit rather than the advertised default:
	// every handling mode posts the file back inside THIS guild, so its boost
	// tier is exactly what the bot's re-upload is allowed to carry. Warnings
	// still quote the default — a boosted server just doesn't refuse what it
	// could legally accept.
	const rejection = checkUpload(
		attachment.name,
		attachment.size,
		maxUploadBytesForTier(interaction.guild?.premiumTier)
	);
	if (rejection) {
		await reject(interaction, rejection);
		return;
	}

	// --- Handling mode ------------------------------------------------------
	// The radio group is required in the modal, but fall back to the documented
	// default (public) rather than failing if the value ever comes back empty.
	const mode = interaction.fields.getRadioGroup(MODE_FIELD_ID, false) ?? MODE_PUBLIC;
	if (!VALID_MODES.has(mode)) {
		await reject(interaction, 'Unrecognised handling option. Please reopen the upload dialog and choose again.');
		return;
	}

	// --- Special files ------------------------------------------------------
	// tspack / appcrash / dalamud.injector logs have dedicated relay handling in
	// modules/relayFile.js (a tspack additionally gets its Loggy link) and can
	// never produce parse results, so every mode except "Post privately" diverts
	// to it BEFORE destination resolution — relayFile resolves the server's own
	// relay channel and answers this same deferred reply itself, so we must
	// return immediately after calling it. (.dmp never reaches this point:
	// checkUpload refused it above, and "Post privately" keeps its ordinary
	// parse attempt, which for these file types just reports no parseable data
	// and hands the file back ephemerally.)
	if (mode !== MODE_PRIVATE && isSpecialRelayAttachment(attachment.name)) {
		await interaction.deferReply();
		try {
			await relayFile(client, interaction, attachment, interaction.user, interaction.channel, false);
		}
		catch (e) {
			// relayFile answers its own failures; this catch only covers anything
			// thrown before its first reply lands, leaving the deferred reply to
			// drop cleanly and report privately.
			await failAfterDefer(interaction, e, 'There was a problem with your upload.');
		}
		return;
	}

	// --- Destination --------------------------------------------------------
	const target = await resolveDestination(client, interaction, mode);
	if (!target) {
		// resolveDestination already answered the interaction.
		return;
	}
	const {
		destination, privateResponse, relay,
	} = target;

	// Past this point every path answers the interaction, so the public
	// "thinking" message of a public upload (or an ephemeral one) is safe.
	await interaction.deferReply(privateResponse
		? {
			ephemeral: true,
		}
		: {});

	try {
		// parseLog only returns embeds — the modal decides where the results go,
		// which may be a different channel from the button's.
		const embeds = await parseLog(client, attachment, {
			anyTextFile: true,
			guildId: interaction.guildId,
		}) ?? [];

		const parsed = embeds.length > 0;
		const summary = parsed
			? `Parsed results for \`${attachment.name}\`:`
			: `No troubleshooting data (TROUBLESHOOTING / TROUBLESHXLTING / LASTEXCEPTION) was found in `
				+ `\`${attachment.name}\`, so there is nothing to analyze. The file itself is attached.`;

		// Relay: the file and any results are posted to the destination as their
		// own message and the uploader gets a receipt linking to it. This also
		// covers relaying into the channel the button was used in — there the log
		// goes out as a normal message rather than into a reply, which is what the
		// uploader asked for.
		if (relay) {
			const sourceRef = describeSource(interaction);
			// Relaying is only offered inside a server, so an uploader who cannot
			// post in the channel they uploaded from is here by virtue of the slash
			// command rather than the conversation. The receipt below would then be
			// the only public thing they put in that channel, so it is skipped, and
			// the tag becomes a real mention instead: staff learn about the upload
			// in the relay channel, where they can page the user in.
			const canReplyHere = canUserTypeInSource(interaction);
			const posted = await destination.send({
				// Attribution, so the support team reading the relay channel knows
				// who to ask and where the conversation is. Normally this is a
				// "no-mention" tag — copyable for a ping later without notifying the
				// uploader now. `parse: []` also keeps a mention that happens to
				// appear inside the file's name from firing.
				content: `${mentionTag(interaction.user)} uploaded `
					+ `\`${attachment.name}\` from ${sourceRef} with Franzbot.`,
				embeds,
				files: [attachment],
				allowedMentions: {
					parse: canReplyHere ? [] : ['users'],
				},
			});
			if (!canReplyHere) {
				// Leave nothing public behind in a channel they can't write in.
				await interaction.deleteReply()
					.catch(() => null);
				return;
			}
			// Public receipt. "Relay to a channel" names the destination and links
			// straight to it, since that channel is one the uploader picked and can
			// normally reach. "Relay privately" only says it went to a staff-only
			// channel: where it is would be a misdirection when they may not be able
			// to read it, but staff still get the link.
			const relayedSummary = `${parsed ? 'The log and its parsed results have' : 'The log has'} been relayed`;
			await interaction.editReply({
				content: mode === MODE_PRIVATE_RELAY
					? `${relayedSummary} to this server's relay channel. It is private and only visible to the support team.\n`
						+ `Staff can find it [here](${posted.url})`
					: `${relayedSummary} to ${destination}.\n`
						+ `The relayed message is [here](${posted.url})`,
			});
			return;
		}

		await interaction.editReply({
			content: summary,
			embeds,
			files: [attachment],
		});
	}
	catch (e) {
		// Nothing public should be left behind by a failure: drop the reply and
		// report privately.
		await failAfterDefer(interaction, e, 'There was a problem with your upload.');
	}
}

module.exports = {
	UPLOAD_LOG_MODAL_ID,
	FILE_FIELD_ID,
	MODE_FIELD_ID,
	CHANNEL_FIELD_ID,
	MODE_PUBLIC,
	MODE_PRIVATE,
	MODE_RELAY,
	MODE_PRIVATE_RELAY,
	buildUploadLogModal,
	handleUpload,
	modalData: () => ({
		name: UPLOAD_LOG_MODAL_ID,
		description: 'Handle an uploaded log from the FAQ upload modal.',
	}),
	run: async (client, interaction) => {
		await handleUpload(client, interaction);
	},
};
