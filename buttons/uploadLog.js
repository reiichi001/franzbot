// The "Upload Log" button: its definition, the action row it is rendered in,
// and the gate that decides which FAQ posts carry it. Clicking it opens the
// modal in modals/uploadLog.js, which shares this customId.
//
// The row and the gate live here (rather than in modules/) because they ARE the
// button — FAQ delivery only renders what this file defines.

const {
	ActionRowBuilder, ButtonBuilder, ButtonStyle,
} = require('discord.js');
const {
	buildUploadLogModal,
} = require('../modals/uploadLog');

const UPLOAD_LOG_BUTTON_ID = 'uploadLog';

/**
 * Whether an FAQ opts into the Upload Log action row. Each FAQ declares this
 * itself via `info.uploadButton`, so the decision lives next to the answer text
 * that asks the user for a file (logs, tspack, event viewer, integrity, ...).
 */
function isUploadLogFaq(faq) {
	return faq?.info?.uploadButton === true;
}

/**
 * Build the action row used by the FAQ response.
 */
function buildUploadLogActionRow() {
	return new ActionRowBuilder().addComponents(
		new ButtonBuilder()
			.setCustomId(UPLOAD_LOG_BUTTON_ID)
			.setLabel('Upload Log')
			.setStyle(ButtonStyle.Secondary)
	);
}

/**
 * Preserve any FAQ-provided components while adding one uploader row.
 */
function getFaqComponents(faq, components = []) {
	const existing = Array.isArray(components) ? components : [];
	if (!isUploadLogFaq(faq)) {
		return existing;
	}

	return [
		...existing,
		buildUploadLogActionRow(),
	];
}

exports.buttonData = () => ({
	name: UPLOAD_LOG_BUTTON_ID,
	description: 'Open the log upload modal from a FAQ post.',
	options: [],
	defaultPermission: true,
});

exports.run = async (client, interaction) => {
	// showModal must happen within 3s of the click and cannot follow a defer,
	// so nothing else may run first here.
	await interaction.showModal(buildUploadLogModal(interaction.inGuild()));
};

exports.UPLOAD_LOG_BUTTON_ID = UPLOAD_LOG_BUTTON_ID;
exports.buildUploadLogActionRow = buildUploadLogActionRow;
exports.getFaqComponents = getFaqComponents;
exports.isUploadLogFaq = isUploadLogFaq;
