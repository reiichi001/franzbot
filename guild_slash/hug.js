const {
	hug,
} = require('../modules/fun/hug.js');

const {
	SlashCommandBuilder,
} = require('@discordjs/builders');

exports.run = async (client, interaction) => {
	const text = interaction.options.getString("text") ?? "";
	return interaction.reply(hug(text));
};

exports.commandData = () => new SlashCommandBuilder()
	.setName('hug')
	.setDescription('Sends virtual hugs. Can hug many people.')
	.addStringOption(option => option
		.setName('text')
		.setDescription('Mention the people to hug.')
		.setRequired(false));
