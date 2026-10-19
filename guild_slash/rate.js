const {
	rate,
} = require('../modules/fun/rate.js');

const {
	SlashCommandBuilder,
} = require('@discordjs/builders');

exports.run = async (client, interaction) => {
	const text = interaction.options.getString("text") ?? "";
	return interaction.reply(await rate(client, text, interaction.guild));
};

exports.commandData = () => new SlashCommandBuilder()
	.setName('rate')
	.setDescription('Franzbot rates something out of ten.')
	.addStringOption(option => option
		.setName('text')
		.setDescription('What should Franzbot rate?')
		.setRequired(false));
