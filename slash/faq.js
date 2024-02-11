/* eslint-disable max-len */
/* eslint-disable no-return-await */
/* eslint-disable consistent-return */
import {
	SlashCommandBuilder,
} from '@discordjs/builders';

export const run = async (client, interaction) => { // eslint-disable-line no-unused-vars
	try {
		await interaction.deferReply();
		await interaction.editReply(`This command is not ready for use yet. Please use \`${client.configdb.get("prefix")}faq\` instead.`);
	}
	catch (e) {
		console.log(e);
		return await interaction.editReply(`There was a problem with your request.\n\`\`\`${e.message}\`\`\``);
	}
};

export const commandData = (client, message) => {
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
export const guildOnly = true;
