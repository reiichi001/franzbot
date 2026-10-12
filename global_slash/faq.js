const {
	SlashCommandBuilder, InteractionContextType,
} = require('discord.js');

const {
	run, handleAutocomplete,
} = require('../modules/faqCommand');

/**
 * Global /faq — carries the `server` option because it serves DMs, where the bot
 * can't auto-detect the guild. It is DM-ONLY (never appears in servers) so users
 * can't load another server's FAQs in a guild. Whitelisted guilds get their own
 * guild-scoped /faq (no `server` option) via guild_slash.
 */
exports.commandData = () => {
	const cmd = new SlashCommandBuilder()
		.setName('faq')
		.setDescription('Search FAQ topics or look up a specific topic.')
		// Hide from every server; keep it reachable only in direct messages
		// (bot DMs + private channels).
		.setContexts(
			InteractionContextType.BotDM,
			InteractionContextType.PrivateChannel
		);

	// `topic` is required — Discord demands required options come before
	// optional ones, so it must be declared first.
	cmd.addStringOption(option => option
		.setName('topic')
		.setDescription('The FAQ topic to look up')
		.setRequired(true)
		.setAutocomplete(true));

	cmd.addStringOption(option => option
		.setName('server')
		.setDescription('The server to look FAQs up in (auto-detected in guild)')
		.setRequired(false)
		.setAutocomplete(true));

	return cmd.toJSON();
};

// Shared handler — source-agnostic; tolerates a missing `server` option.
exports.run = run;
exports.handleAutocomplete = handleAutocomplete;
