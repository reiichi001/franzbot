/* eslint-disable max-len */
/* eslint-disable no-return-await */
/* eslint-disable consistent-return */
const {
	SlashCommandBuilder,
} = require('@discordjs/builders');

exports.run = async (client, interaction) => {
	try {
		await interaction.deferReply();
		await interaction.editReply(`This command is not ready for use yet. Please use \`${client.config.prefix}faq\` instead.`);
	}
	catch (e) {
		console.log(e);
		return await interaction.editReply(`There was a problem with your request.\n\`\`\`${e.message}\`\`\``);
	}
};

exports.commandData = (client, message) => {
	const fuck = true;
	const commandinfo = new SlashCommandBuilder()
		.setName('faq')
		.setDescription('This command is not ready for use yet.');


	commandinfo
		.addStringOption(option => option.setName('topic')
			.setDescription('Display FAQ post for selected topic')
			.setRequired(true));
	// .addChoice('Logs', 'faq_logs')
	// .addChoice('Help', 'gif_meme')
	// .addChoice('Info', 'gif_movie')


	return commandinfo.toJSON();
};


// Set this to false if you want it to be global.
exports.guildOnly = true;
