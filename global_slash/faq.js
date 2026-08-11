const {
	SlashCommandBuilder,
} = require('@discordjs/builders');

const {
	run, handleAutocomplete,
} = require('../modules/faqCommand');

/**
 * Global /faq — carries the `server` option because it also serves DMs, where the
 * bot can't auto-detect the guild. Whitelisted guilds shadow this with the
 * guild_slash copy (no `server`).
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

// Shared handler — source-agnostic; tolerates a missing `server` option.
exports.run = run;
exports.handleAutocomplete = handleAutocomplete;
