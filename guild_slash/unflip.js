const {
	unflip,
} = require('../modules/fun/unflip.js');

const {
	SlashCommandBuilder,
} = require('@discordjs/builders');

exports.run = async (client, interaction) => {
	const text = interaction.options.getString("text") ?? "";
	return interaction.reply(await unflip(client, text, interaction.guild));
};

exports.commandData = () => new SlashCommandBuilder()
	.setName('unflip')
	.setDescription('Unflips provided text.')
	.addStringOption(option => option
		.setName('text')
		.setDescription('Text to unflip. Mention users to use their nicknames.')
		.setRequired(false));
