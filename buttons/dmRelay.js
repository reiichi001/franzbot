// The DM flow's single relay button. Clicking it opens the server-selector
// modal (modals/dmRelay.js) that relays the pending record the customId's token
// stands for.
//
// This folder owns the customId format on both sides: buildRelayButtonRow()
// writes it, run() parses it, and modals/dmRelay.js carries the token onward in
// its own customId. The button and the modal deliberately share the `dmRelay`
// dispatch key — they land in different collections (buttoncmds vs modalcmds)
// and are never confused by interactionCreate's split-on-':' dispatch.

const {
	ActionRowBuilder, ButtonBuilder, ButtonStyle, MessageFlags,
} = require('discord.js');
const dmRelayStore = require('../modules/dmRelayStore');
const {
	buildDmRelayServerModal,
} = require('../modals/dmRelay');

const DM_RELAY_BUTTON_ID = 'dmRelay';

/**
 * The one-button action row for a relay offer. One offer, one button — the
 * server choice happens inside the modal it opens. The label names the file
 * so its button stays identifiable when a DM carries several uploads at once.
 * (buttonLabel, shared with the disabled "Relayed" button, lives in the
 * cycle-free dmRelayStore.)
 */
function buildRelayButtonRow(token, attachmentName) {
	return [
		new ActionRowBuilder().addComponents(
			new ButtonBuilder()
				.setCustomId(`${DM_RELAY_BUTTON_ID}:${token}`)
				.setLabel(dmRelayStore.buttonLabel('Relay ', attachmentName, ' to a plugin support server?'))
				.setStyle(ButtonStyle.Primary)
		),
	];
}

exports.buttonData = () => ({
	name: 'dmRelay',
	description: 'Open the server selector for relaying a DM upload.',
	options: [],
	defaultPermission: true,
});

exports.run = async (client, interaction) => {
	const [
		, token,
	] = interaction.customId.split(':');
	// showModal must be the interaction's first and only response and cannot
	// follow a defer, so the token check is deliberately the synchronous Map
	// peek from the store: an expired click gets an ephemeral answer instead of
	// a modal that can only dead-end.
	if (!dmRelayStore.resolve(token)) {
		await interaction.reply({
			content: dmRelayStore.relayFailureNotice('expired'),
			flags: MessageFlags.Ephemeral,
		});
		return;
	}
	// The offer was only made when a server was relayable, but the list is read
	// live here — if the last one became unreachable in between, a select with
	// zero options is an invalid modal, so answer instead of throwing.
	const servers = await dmRelayStore.getRelayableServers(client);
	if (servers.length === 0) {
		await interaction.reply({
			content: dmRelayStore.relayFailureNotice('no-server'),
			flags: MessageFlags.Ephemeral,
		});
		return;
	}
	// The list read above is all cache lookups, so this await stays inside the
	// interaction's 3-second window and showModal remains the first response.
	await interaction.showModal(buildDmRelayServerModal(token, servers));
};

exports.buildRelayButtonRow = buildRelayButtonRow;
