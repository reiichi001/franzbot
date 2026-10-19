const {
	verdict,
} = require('../modules/fun/felon.js');

const {
	SlashCommandBuilder,
} = require('@discordjs/builders');

exports.run = async (client, interaction) => {
	const displayName = interaction.member?.displayName ?? interaction.user.displayName;
	return interaction.reply(verdict(displayName));
};

exports.commandData = () => new SlashCommandBuilder()
	.setName('felon')
	.setDescription('Franzbot is fired.');
