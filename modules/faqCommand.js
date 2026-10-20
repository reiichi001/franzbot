const {
	getAvailableServers, getTopicsForServer, resolveTopic,
} = require('./faqHelpers');
// The Upload Log button owns its own row + opt-in gate; FAQ delivery only
// renders it. See buttons/uploadLog.js.
const {
	getFaqComponents,
} = require('../buttons/uploadLog');
const {
	failAfterDefer,
} = require('./respond');
const {
	MessageFlags,
} = require('discord.js');

// Topics promoted to the TOP of the autocomplete list for servers that have
// them (by name or alias). Priority: server's faqSuggestions per-server key,
// then the global FAQ_SUGGESTIONS in config.json, then the defaults.
const DEFAULT_SUGGESTED_TOPICS = [
	'logxl',
	'logd',
	'tspack',
	'antivirus',
];

function suggestedTopics(client, serverKey) {
	const perServer = client.perserversettings?.get(`${serverKey}-serversettings`)?.get('faqSuggestions');
	if (Array.isArray(perServer) && perServer.length > 0) {
		return perServer;
	}
	const fromConfig = client.configdb?.get('FAQ_SUGGESTIONS');
	return Array.isArray(fromConfig) && fromConfig.length > 0
		? fromConfig
		: DEFAULT_SUGGESTED_TOPICS;
}

/**
 * Handle autocomplete interactions.
 */
exports.handleAutocomplete = async (client, interaction) => {
	const focusedName = interaction.options.getFocused(true).name;
	const focusedValue = interaction.options.getFocused().toLowerCase();
	let choices;

	if (focusedName === 'server') {
		// Show all servers with FAQs, filter by display name
		const allServers = getAvailableServers(client);
		choices = allServers
			.filter(s => s.name.toLowerCase().includes(focusedValue) || s.key.includes(focusedValue))
			.map(s => ({
				name: s.name,
				value: s.key,
			}))
			.slice(0, 25);
	}
	else {
		// Show topics for the selected server (or default to directmessage if none selected)
		let serverKey = 'directmessage';
		const serverOption = interaction.options.getString('server');
		if (serverOption) {
			serverKey = serverOption;
		}
		else if (interaction.guild) {
			// In a guild context, default to the current guild's key
			serverKey = interaction.guild.id;
		}

		const allTopics = getTopicsForServer(client, serverKey);
		// Promote configured suggestions the server actually has (by name or
		// alias), so logxl/logd/tspack/... lead the list on servers that carry them.
		const suggested = suggestedTopics(client, serverKey)
			.map(s => allTopics.find(t => t.value === s))
			.filter(Boolean)
			.filter(c => c.name.toLowerCase().includes(focusedValue));
		const suggestedValues = new Set(suggested.map(c => c.value));

		choices = [
			...suggested,
			...allTopics
				.filter(c => !suggestedValues.has(c.value))
				.filter(c => c.name.toLowerCase().includes(focusedValue)),
		].slice(0, 25);
	}

	await interaction.respond(choices).catch(err => {
		// Silently ignore if interaction was already responded to
	});
};

/**
 * Handle the slash command execution.
 */
exports.run = async (client, interaction) => {
	const topicInput = interaction.options.getString('topic');
	let serverKey = interaction.options.getString('server');

	// Determine server context
	if (!serverKey) {
		if (interaction.guild) {
			serverKey = interaction.guild.id;
		}
		else {
			// DMs with no server selected — error ephemerally BEFORE deferring.
			const servers = getAvailableServers(client);
			const names = servers.map(s => `\`${s.name}\``).join(', ');
			await interaction.reply({
				content: `No server selected. Available FAQ sources:\n\`${names}\``,
				flags: MessageFlags.Ephemeral,
			});
			return;
		}
	}

	// Resolve the topic against the chosen server.
	const result = resolveTopic(client, serverKey, topicInput);

	if (!result) {
		// Nonexistent FAQ: reply ephemerally, no public message left behind.
		await interaction.reply({
			content: `No FAQ found for "${topicInput}" in this source.`,
			flags: MessageFlags.Ephemeral,
		});
		return;
	}

	// Topic is valid — defer PUBLICLY so the answer is visible to everyone.
	await interaction.deferReply();

	try {
		const {
			faq, resolvedName: finalName,
		} = result;

		let response;
		if (finalName === 'help') {
			response = await faq.answer(client, interaction.guild);
		}
		else {
			response = await faq.answer(client);
		}

		if (!response) {
			await interaction.deleteReply();
			await interaction.followUp({
				content: `FAQ returned no response.`,
				flags: MessageFlags.Ephemeral,
			});
			return;
		}

		// Handle various response formats from FAQ entries
		if (Array.isArray(response)) {
			await interaction.editReply({
				content: null,
				embeds: response,
			});
			return;
		}

		const embedData = {
			title: response.title || undefined,
			description: response.description || undefined,
			color: response.color || client.configdb.get('EMBED_NORMAL_COLOR'),
			fields: response.fields || undefined,
			footer: response.footer || undefined,
			image: response.image || undefined,
			thumbnail: response.thumbnail || undefined,
		};

		await interaction.editReply({
			content: response.content || null,
			embeds: [embedData],
			files: response.files || undefined,
			components: getFaqComponents(faq, response.components),
		});
	}
	catch (e) {
		// Delete the public "thinking" message and surface the error ephemerally.
		await failAfterDefer(interaction, e);
	}
};
