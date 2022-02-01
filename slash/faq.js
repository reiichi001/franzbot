/* eslint-disable no-return-await */
/* eslint-disable consistent-return */
const {
	SlashCommandBuilder,
} = require('@discordjs/builders');

exports.run = async (client, interaction) => { // eslint-disable-line no-unused-vars
	try {
		await interaction.deferReply();
		const reply = await interaction.editReply("Ping?");
		await interaction.editReply(`Pong! Latency is ${reply.createdTimestamp - interaction.createdTimestamp}ms.`
			+ ` API Latency is ${Math.round(client.ws.ping)}ms.`);
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
		.setDescription('Get info about a user or a server!');

	commandinfo
		.addStringOption(option => option.setName('category')
			.setDescription('The gif category')
			.setRequired(false)
			.addChoice('Funny', 'gif_funny')
			.addChoice('Meme', 'gif_meme')
			.addChoice('Movie', 'gif_movie'));
	return commandinfo.toJSON();
};


// Set this to false if you want it to be global.
exports.guildOnly = true;
