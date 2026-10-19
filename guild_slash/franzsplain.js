const {
	explain,
} = require('../modules/fun/franzsplain.js');

const {
	SlashCommandBuilder,
} = require('@discordjs/builders');

exports.run = async (client, interaction) => {
	const query = interaction.options.getString("query");
	return interaction.reply(explain(query));
};

exports.commandData = () => new SlashCommandBuilder()
	.setName('franzsplain')
	.setDescription('Googles that text for you. How oppressive.')
	.addStringOption(option => option
		.setName('query')
		.setDescription('What should Franzbot search for?')
		.setRequired(true));
