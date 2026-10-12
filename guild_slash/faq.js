const {
	SlashCommandBuilder,
} = require('@discordjs/builders');

const {
	run, handleAutocomplete,
} = require('../modules/faqCommand');

/**
 * Guild-scoped /faq override — no `server` option (in a guild the bot already
 * knows which server to search). Shadows the global /faq in whitelisted guilds;
 * DMs keep the global copy with the `server` picker.
 */
exports.commandData = () => {
	const cmd = new SlashCommandBuilder()
		.setName('faq')
		.setDescription('Search FAQ topics or look up a specific topic.');

	cmd.addStringOption(option => option
		.setName('topic')
		.setDescription('The FAQ topic to look up')
		.setRequired(true)
		.setAutocomplete(true));

	return cmd.toJSON();
};

// Shared handler — source-agnostic; auto-detects the guild.
exports.run = run;
exports.handleAutocomplete = handleAutocomplete;
