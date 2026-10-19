const {
	ship,
} = require('../modules/fun/ship.js');

const {
	SlashCommandBuilder,
} = require('@discordjs/builders');

exports.run = async (client, interaction) => {
	const text = interaction.options.getString("text");
	const user1 = interaction.options.getUser("user1");
	const user2 = interaction.options.getUser("user2");

	// Match the text command, which joins its arguments with " and ". Each user
	// option is turned back into a mention so the shared module can resolve it.
	const parts = [text];
	if (user1) {
		parts.push(`<@${user1.id}>`);
	}
	if (user2) {
		parts.push(`<@${user2.id}>`);
	}

	return interaction.reply(await ship(client, parts.filter(Boolean).join(" and "), interaction.guild));
};

exports.commandData = () => new SlashCommandBuilder()
	.setName('ship')
	.setDescription('Checks the compatibility of two people. Franzbot is biased.')
	.addStringOption(option => option
		.setName('text')
		.setDescription('Anything else to ship, if you are not using the user options.')
		.setRequired(false))
	.addUserOption(option => option
		.setName('user1')
		.setDescription('The first person to ship.')
		.setRequired(false))
	.addUserOption(option => option
		.setName('user2')
		.setDescription('The second person to ship.')
		.setRequired(false));
