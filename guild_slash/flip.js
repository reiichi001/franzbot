const {
	flip,
} = require('../modules/fun/flip.js');

const {
	SlashCommandBuilder,
} = require('@discordjs/builders');

exports.run = async (client, interaction) => {
	const text = interaction.options.getString("text") ?? "";
	return interaction.reply(await flip(client, text, interaction.guild));
};

exports.commandData = () => new SlashCommandBuilder()
	.setName('flip')
	.setDescription('Flips provided text. Franzbot is strong enough to flip multiple people.')
	.addStringOption(option => option
		.setName('text')
		.setDescription('Text to flip. Mention users to use their nicknames.')
		.setRequired(false));
