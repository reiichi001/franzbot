// The DM /uploadlog modal: its definition, and what happens when it is
// submitted. Opened by global_slash/uploadlog.js when no file came attached —
// the DM counterpart of modals/uploadLog.js, which is styled after it.
//
// Everything is validated BEFORE the interaction is deferred, so rejections can
// be ephemeral and leave nothing public behind. The modal's components are
// static at open time, which shapes two things:
//   * the file's extension cannot disable the relay options — a .dmp is caught
//     by checkUpload on submit instead; and
//   * when NO relayable server is configured the server select is omitted, and
//     a relay mode submitted without one is refused on submit — the radio
//     CANNOT collapse to parse-only, because Discord requires a radio group to
//     have at least two options.

const {
	ModalBuilder, LabelBuilder, FileUploadBuilder,
	RadioGroupBuilder, RadioGroupOptionBuilder, StringSelectMenuBuilder,
} = require('@discordjs/builders');
const {
	checkUpload, isRelayOnlyAttachment, maxUploadBytesForTier, MAX_UPLOAD_BYTES,
} = require('../modules/processAttachment');
const {
	parseLog,
} = require('../modules/parseLog');
const {
	failAfterDefer, noticeAfterDefer, noParseableData,
} = require('../modules/respond');
const {
	uploadTspackToS3,
} = require('../modules/tspackLoggy');
const dmRelayStore = require('../modules/dmRelayStore');

const UPLOAD_LOG_DM_MODAL_ID = 'uploadLogDm';
const FILE_FIELD_ID = 'log_file';
const MODE_FIELD_ID = 'dm_mode';
const SERVER_FIELD_ID = 'dm_server';

// Handling modes, in display order. The FIRST option is what Discord's radio
// group shows preselected, so parse-only leads — nothing leaves the DMs unless
// the uploader explicitly picks a relay.
const MODE_PARSE_ONLY = 'parse_only';
const MODE_RELAY = 'relay';
const MODE_PARSE_RELAY = 'parse_relay';

const MODE_OPTIONS = [
	{
		label: 'Parse only (default)',
		value: MODE_PARSE_ONLY,
		description: 'Parse the log and show the results here in the DMs.',
	},
	{
		label: 'Relay',
		value: MODE_RELAY,
		description: "Send the file to a support server's private relay channel, without parsing.",
	},
	{
		label: 'Parse and relay',
		value: MODE_PARSE_RELAY,
		description: "Parse the log and send it with its results to a support server's relay channel.",
	},
];

const VALID_MODES = new Set(MODE_OPTIONS.map(o => o.value));

// Tspacks are not parseable (a zip), so their "parse" is the Loggy link.
// The dmp check lives in checkUpload — it is refused before the mode is read.
const TSPACK_REGEX = /\.(tspack)$/i;

/**
 * Build the modal. Needs the client for the relayable-server list, which is
 * read live (and access-checked) at open time. Async for that list.
 */
async function buildUploadLogDmModal(client) {
	const servers = await dmRelayStore.getRelayableServers(client);

	const modal = new ModalBuilder()
		.setCustomId(UPLOAD_LOG_DM_MODAL_ID)
		.setTitle('Upload a log for analysis');

	// Exactly one file. The accepted extensions are enforced on submit — a
	// Discord file-upload component cannot restrict file types itself.
	modal.addLabelComponents(
		new LabelBuilder()
			.setLabel('Log file')
			.setDescription('Accepted: .log, .txt, .tspack or .evtx - up to 10 MB')
			.setFileUploadComponent(
				new FileUploadBuilder()
					.setCustomId(FILE_FIELD_ID)
					.setMinValues(1)
					.setMaxValues(1)
					.setRequired(true)
			)
	);

	// All three modes are always offered: a radio group needs at least two
	// options, so the relay modes cannot be dropped when no server is
	// relayable — that case is refused on submit instead.
	const radio = new RadioGroupBuilder().setCustomId(MODE_FIELD_ID);
	for (const option of MODE_OPTIONS) {
		radio.addOptions(
			new RadioGroupOptionBuilder()
				.setLabel(option.label)
				.setValue(option.value)
				.setDescription(option.description)
		);
	}
	// Required so a log can never land somewhere the uploader didn't choose;
	// the handler still falls back to parse-only if the value is ever absent.
	radio.setRequired(true);

	modal.addLabelComponents(
		new LabelBuilder()
			.setLabel('How should Franzbot handle it?')
			.setRadioGroupComponent(radio)
	);

	// Only meaningful for the two relay modes. Optional, because parse-only
	// ignores it — the handler rejects a relay mode submitted without one.
	if (servers.length) {
		const select = new StringSelectMenuBuilder()
			.setCustomId(SERVER_FIELD_ID)
			.setPlaceholder('Choose a server…')
			.setMinValues(1)
			.setMaxValues(1)
			.setRequired(false);
		for (const server of servers) {
			select.addOptions({
				label: server.label,
				value: server.key,
			});
		}
		modal.addLabelComponents(
			new LabelBuilder()
				.setLabel('Relay destination')
				.setDescription('Only used by the relay options. Servers Franzbot relays for.')
				.setStringSelectMenuComponent(select)
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
 * The "Read provided logs on Loggy" embed the dedicated tspack flow has always
 * attached to its links.
 */
function loggyEmbed(loggyUrl) {
	return {
		description: `Read provided logs on [Loggy](${loggyUrl})`,
	};
}

/**
 * Handle a submission. `interaction.fields` carries the file, the handling
 * mode, and (for the relay modes) the chosen server.
 */
async function handleUploadDm(client, interaction) {
	// --- File ---------------------------------------------------------------
	const attachment = interaction.fields
		.getUploadedFiles(FILE_FIELD_ID, false)
		?.first();
	if (!attachment) {
		await reject(interaction, 'No file was uploaded. Run "/uploadlog" again and attach a log file.');
		return;
	}
	// --- Handling mode ------------------------------------------------------
	// The radio group is required in the modal, but fall back to the documented
	// default (parse-only) rather than failing if the value ever comes back empty.
	// Read BEFORE the size check: the ceiling depends on the chosen destination.
	const mode = interaction.fields.getRadioGroup(MODE_FIELD_ID, false) ?? MODE_PARSE_ONLY;
	if (!VALID_MODES.has(mode)) {
		await reject(interaction, 'Unrecognised handling option. Please reopen the upload dialog and choose again.');
		return;
	}

	// --- Destination (relay modes only) --------------------------------------
	let serverKey = null;
	let relayServer = null;
	if (mode !== MODE_PARSE_ONLY) {
		const servers = await dmRelayStore.getRelayableServers(client);
		const selected = interaction.fields.getStringSelectValues(SERVER_FIELD_ID)[0];
		relayServer = servers.find(s => s.key === selected);
		if (!relayServer) {
			// Three ways to get here: no server picked, a picked server that has
			// since been unset, or the select never existed because no server is
			// relayable (the modal could not drop the relay modes — a radio
			// group needs two options — so this is the refusal instead).
			await reject(interaction, selected
				? 'That server is no longer set up to receive relayed logs. Please reopen the upload dialog and choose another.'
				: servers.length
					? 'No relay destination was selected. Pick a server in the "Relay destination" field, or choose "Parse only" instead.'
					: 'No support server is set up to receive relays right now, so the relay options are unavailable. Choose "Parse only" instead.');
			return;
		}
		serverKey = selected;
	}

	// --- File bounds ----------------------------------------------------------
	// Same accepted set as every other upload path (see checkUpload). The size
	// ceiling is the DESTINATION's, resolved above and validated before the
	// defer so a rejection is a cheap ephemeral reply: the bot re-uploads the
	// file into the chosen server, whose boost tier decides what it can accept —
	// a Nitro user may deliver far more than the advertised default. Parse-only
	// never re-uploads the file anywhere, so the advertised default applies.
	const maxBytes = relayServer
		? maxUploadBytesForTier(relayServer.tier)
		: MAX_UPLOAD_BYTES;
	const rejection = checkUpload(attachment.name, attachment.size, maxBytes);
	if (rejection) {
		await reject(interaction, rejection);
		return;
	}

	// Past this point every path answers the interaction. DM receipts are
	// ephemeral by nature — there is no channel to be public in.
	await interaction.deferReply({
		ephemeral: true,
	});

	try {
		// Tspacks are not parseable (a zip): their "parse" is the Loggy link,
		// produced by the S3 copy. Relay-only types (crash/injector/event logs)
		// can never yield results, so the parse pass is skipped. Everything else
		// goes through the parse pipeline; anyTextFile is the explicit-upload
		// opt-in, as in the guild modal.
		let loggyUrl = null;
		let embeds = [];
		if (TSPACK_REGEX.test(attachment.name)) {
			({
				loggyUrl,
			} = await uploadTspackToS3(client, attachment, interaction.user, 'directmessage'));
		}
		else if (isRelayOnlyAttachment(attachment.name)) {
			embeds = [];
		}
		else {
			embeds = await parseLog(client, attachment, {
				anyTextFile: true,
				guildId: interaction.guildId,
			}) ?? [];
		}

		// --- Parse only ---------------------------------------------------------
		if (mode === MODE_PARSE_ONLY) {
			if (loggyUrl) {
				await interaction.editReply({
					embeds: [loggyEmbed(loggyUrl)],
				});
			}
			else if (embeds.length > 0) {
				await interaction.editReply({
					embeds,
				});
			}
			else if (isRelayOnlyAttachment(attachment.name)) {
				// Crash/injector/event logs were never parsed, so the
				// "no troubleshooting data found" copy would be a lie — say
				// what is actually true and point at the relay option.
				await interaction.editReply({
					content: `\`${attachment.name}\` isn't a parseable log type, so there is nothing to analyze here.\n\n`
						+ 'It can be relayed to a support server for manual review (run "/uploadlog" again and choose a relay option).',
				});
			}
			else {
				await noParseableData(interaction, attachment.name);
			}
			return;
		}

		// --- Relay / parse and relay ---------------------------------------------
		const result = await dmRelayStore.sendRelayPayload(client, serverKey, {
			attachment,
			author: interaction.user,
			embeds,
			loggyUrl,
		});
		// The server was validated live before the defer, but its channel can
		// still go away in between — same three-way failure copy as every other
		// relay path, delivered ephemerally.
		if (!result.ok) {
			await noticeAfterDefer(interaction, dmRelayStore.relayFailureNotice(result.reason, result.serverLabel));
			return;
		}

		// Receipt. The relayed message already carries the file, any parsed
		// results, and the Loggy embed; this tells the uploader where it went.
		// "Parse and relay" also repeats the parsed results and Loggy link here,
		// so the uploader keeps a private copy of what was sent. A relay of an
		// unparseable file (relay-only types, or a parse that found nothing)
		// just says where it went — claiming results below would be a lie.
		const relayedBit = `Relayed \`${attachment.name}\` to **${result.server.label}**.`;
		if (mode === MODE_PARSE_RELAY && (embeds.length > 0 || loggyUrl)) {
			await interaction.editReply({
				content: loggyUrl
					? `${relayedBit}\n${loggyEmbed(loggyUrl).description}`
					: `${relayedBit}\nThe parsed results are below, and were relayed with the file.`,
				embeds,
			});
			return;
		}
		await interaction.editReply({
			content: relayedBit,
		});
	}
	catch (e) {
		// Nothing should be left behind by a failure: drop the reply and report
		// privately.
		await failAfterDefer(interaction, e, 'There was a problem with your upload.');
	}
}

module.exports = {
	buildUploadLogDmModal,
	modalData: () => ({
		name: UPLOAD_LOG_DM_MODAL_ID,
		description: 'Handle an uploaded log from the DM upload modal.',
	}),
	run: async (client, interaction) => {
		await handleUploadDm(client, interaction);
	},
};
