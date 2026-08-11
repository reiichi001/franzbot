

const {
	SlashCommandBuilder,
} = require('@discordjs/builders');

const {
	getTopicsForServer, resolveTopic,
} = require('../modules/faqHelpers');

/**
 * Build the slash command data — always defines both options so it works
 * in guilds and DMs without needing separate deployments.
 */
exports.commandData = () => {
	const cmd = new SlashCommandBuilder()
		.setName('faq')
		.setDescription('Search FAQ topics or look up a specific topic.');

	cmd.addStringOption(option => option
		.setName('server')
		.setDescription('The server to look FAQs up in (auto-detected in guild)')
		.setRequired(false)
		.setAutocomplete(true));

	cmd.addStringOption(option => option
		.setName('topic')
		.setDescription('The FAQ topic to look up, or leave blank for help.')
		.setRequired(false)
		.setAutocomplete(true));

	return cmd.toJSON();
};

/**
 * Handle autocomplete interactions.
 */
exports.handleAutocomplete = async (client, interaction) => {
	const focusedName = interaction.options.getFocused(true).name;
	const focusedValue = interaction.options.getFocused().toLowerCase();
	let choices;

	if (focusedName === 'server') {
		// Show all servers with FAQs, filter by display name
		const allServers = require('../modules/faqHelpers').getAvailableServers(client);
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

		choices = getTopicsForServer(client, serverKey)
			.filter(c => c.name.toLowerCase().includes(focusedValue))
			.slice(0, 25);
	}

	await await interaction.respond(choices).catch(err => {
		// Silently ignore if interaction was already responded to
	});
};

/**
 * Handle the slash command execution.
 */
exports.run = async (client, interaction) => {
	try {
		await interaction.deferReply({
			ephemeral: true,
		});

		const topicInput = interaction.options.getString('topic');
		let serverKey = interaction.options.getString('server');

		// Determine server context
		if (!serverKey) {
			if (interaction.guild) {
				serverKey = interaction.guild.id;
			}
			else {
				// DMs with no server selected — show available servers list
				const servers = require('../modules/faqHelpers').getAvailableServers(client);
				const names = servers.map(s => `\`${s.name}\``).join(', ');
				await interaction.editReply({
					content: `No server selected. Available FAQ sources:\n\`${names}\``,
					ephemeral: true,
				});
				return;
			}
		}

		// Resolve the topic
		let resolvedName = 'help'; // default to help when no topic specified
		if (!topicInput) {
			resolvedName = 'help';
		}
		else {
			resolvedName = topicInput;
		}

		const result = resolveTopic(client, serverKey, resolvedName);

		if (!result) {
			await interaction.editReply({
				content: `No FAQ found for "${resolvedName}" in this source.`,
				ephemeral: true,
			});
			return;
		}

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
			await interaction.editReply({
				content: `FAQ returned no response.`,
				ephemeral: true,
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
		};

		await interaction.editReply({
			content: response.content || null,
			embeds: [embedData],
			files: response.files || undefined,
		});
	}
	catch (e) {
		console.error(e);
		const errorMsg = `There was a problem with your request.\n\`\`\`${e.message}\`\`\``;
		if (interaction.replied) {
			await interaction.followUp({
				content: errorMsg,
				ephemeral: true,
			});
		}
		else {
			await interaction.editReply({
				content: errorMsg,
				ephemeral: true,
			});
		}
	}
};

exports.guildOnly = false; // Works in both guilds and DMs
