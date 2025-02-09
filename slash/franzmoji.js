/* eslint-disable no-return-await */
/* eslint-disable consistent-return */
const {
	SlashCommandBuilder,
} = require('discord.js');

const {
	existsSync,
	readdirSync,
} = require("fs");

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

exports.commandData = (client = null, message = null) => {
	const commandinfo = new SlashCommandBuilder()
		.setName('franzmoji')
		.setDescription('Posts a franzmoji into the current channel');

	const franzmojiFiles = readdirSync("./assets/franzmoji").filter(file => file.endsWith(".png"));
	for (const file of franzmojiFiles) {
		const filename = file.slice(0, -4);
		commandinfo.addSubcommand(subcommand =>
			subcommand
				.setName(filename)
		);
	}

	return commandinfo;
}

// Set this to false if you want it to be global.
exports.guildOnly = true;
