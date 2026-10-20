// The server-selector modal opened by the DM flow's single relay button
// (buttons/dmRelay.js, which shares this file's dispatch key on purpose: the
// button's customId carries the pending token, and the modal's customId carries
// it onward — both dispatch to their own collection by `customId.split(':')[0]`).
//
// The file to relay and any parsed embeds are NOT chosen here — they are the
// pending record the token stands for (modules/dmRelayStore.js), since a modal
// file field cannot be prefilled with an attachment that already arrived.

const {
	ModalBuilder, LabelBuilder, StringSelectMenuBuilder,
} = require('@discordjs/builders');
const {
	ActionRowBuilder, ButtonBuilder, ButtonStyle, MessageFlags,
} = require('discord.js');
const dmRelayStore = require('../modules/dmRelayStore');
const {
	failAfterDefer,
} = require('../modules/respond');

const DM_RELAY_MODAL_ID = 'dmRelay';
const SERVER_FIELD_ID = 'dm_relay_server';

/**
 * The button label and this modal's title/copy say "plugin support server":
 * that is what the listed servers are to a DM user, even though the config
 * calls them relayable servers. Takes the already-resolved relayable list so
 * the button's click-time read is the exact one this modal serialises.
 */
function buildDmRelayServerModal(token, servers) {
	const select = new StringSelectMenuBuilder()
		.setCustomId(SERVER_FIELD_ID)
		.setPlaceholder('Choose a server…')
		.setMinValues(1)
		.setMaxValues(1)
		.setRequired(true);
	// The button is only ever offered when this list is non-empty
	// (modules/dmRelay.js offerRelay), so the select always has options.
	for (const server of servers) {
		select.addOptions({
			label: server.label,
			value: server.key,
		});
	}

	return new ModalBuilder()
		.setCustomId(`${DM_RELAY_MODAL_ID}:${token}`)
		.setTitle('Relay to a support server')
		.addLabelComponents(
			new LabelBuilder()
				.setLabel('Support server')
				.setDescription('Where should this be relayed? Only servers Franzbot relays for are listed.')
				.setStringSelectMenuComponent(select)
		);
}

/**
 * Best-effort: turn the offer message's button into a disabled "Relayed" one,
 * so the only path to a double relay (a second submit of the same offer) is
 * visibly closed. The token itself is already consumed, so a failure here is
 * cosmetic and must not fail the relay that did happen.
 */
async function disableOfferButton(interaction, record) {
	if (!record?.offerMessageId || !interaction.channel) {
		return;
	}
	const offerMessage = await interaction.channel.messages
		.fetch(record.offerMessageId)
		.catch(() => null);
	if (!offerMessage) {
		return;
	}
	await offerMessage.edit({
		components: [
			new ActionRowBuilder().addComponents(
				new ButtonBuilder()
					.setCustomId(`${DM_RELAY_MODAL_ID}:consumed`)
					// Keep the file name so multi-file DMs stay traceable after
					// the fact, same as the offer button.
					.setLabel(dmRelayStore.buttonLabel('Relayed: ', record.attachment?.name ?? ''))
					.setStyle(ButtonStyle.Secondary)
					.setDisabled(true)
			),
		],
	});
}

async function handleRelaySubmit(client, interaction) {
	// getStringSelectValues has no required-flag overload — it always returns an
	// array, so emptiness is checked here. With setRequired(true) this should
	// never fire, but the check is cheap and the alternative is a crash.
	const selected = interaction.fields.getStringSelectValues(SERVER_FIELD_ID);
	if (selected.length === 0) {
		await interaction.reply({
			content: 'No server was selected. Click the relay button again and choose one from the list.',
			flags: MessageFlags.Ephemeral,
		});
		return;
	}

	await interaction.deferReply({
		flags: MessageFlags.Ephemeral,
	});

	try {
		const result = await dmRelayStore.relayPendingToServer(client, interaction.customId.split(':')[1], selected[0]);

		if (result.ok) {
			await interaction.editReply({
				content: `Relayed to **${result.server.label}**.`,
			});
			await disableOfferButton(interaction, result.record);
			return;
		}

		// Expired offer, a server that is no longer configured, or a channel that
		// went away — the shared copy distinguishes all three.
		await interaction.editReply({
			content: dmRelayStore.relayFailureNotice(result.reason, result.serverLabel),
		});
	}
	catch (e) {
		await failAfterDefer(interaction, e, 'There was a problem relaying your log.');
	}
}

module.exports = {
	buildDmRelayServerModal,
	modalData: () => ({
		name: DM_RELAY_MODAL_ID,
		description: 'Choose the server to relay a DM upload to.',
	}),
	run: async (client, interaction) => {
		await handleRelaySubmit(client, interaction);
	},
};
