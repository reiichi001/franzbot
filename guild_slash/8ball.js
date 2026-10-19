const {
	roll,
} = require('../modules/fun/eightball.js');

const {
	SlashCommandBuilder,
} = require('@discordjs/builders');

exports.run = async (client, interaction) => interaction.reply(roll(interaction.options.getString("question")));

exports.commandData = () => new SlashCommandBuilder()
	.setName('8ball')
	.setDescription('Ask the magic 8-ball a question.')
	.addStringOption(option => option
		.setName('question')
		.setDescription('The question to ask. It will be repeated with the answer.')
		.setRequired(false));
