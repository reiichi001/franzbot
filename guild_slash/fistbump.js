const {
	bump,
} = require('../modules/fun/fistbump.js');

const {
	SlashCommandBuilder,
} = require('@discordjs/builders');

exports.run = async (client, interaction) => interaction.reply(bump(interaction.user.id));

exports.commandData = () => new SlashCommandBuilder()
	.setName('fistbump')
	.setDescription('Fistbump Franzbot.');
