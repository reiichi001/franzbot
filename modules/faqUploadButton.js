const {
	ActionRowBuilder,
	ButtonBuilder,
	ButtonStyle,
} = require('discord.js');

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
 * Build the action row used by the FAQ response. The button handler is
 * registered separately; rendering it here keeps FAQ delivery free of
 * per-platform component logic.
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

module.exports = {
	UPLOAD_LOG_BUTTON_ID,
	buildUploadLogActionRow,
	getFaqComponents,
	isUploadLogFaq,
};
