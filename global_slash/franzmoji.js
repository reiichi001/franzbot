/* eslint-disable no-unused-vars */
/* eslint-disable no-return-await */
const {
	SlashCommandBuilder,
	AttachmentBuilder,
} = require('discord.js');

const {
	existsSync,
	readdirSync,
} = require("fs");
const {
	join,
} = require("path");

exports.run = async (client, interaction) => {
	try {
		// The chosen option value matches a file in assets/franzmoji.
		const filename = `${interaction.options.getString("franzmoji")}.png`;
		const filePath = join(__dirname, '..', 'assets', 'franzmoji', filename);

		if (!existsSync(filePath)) {
			return await interaction.reply(`Sorry, I couldn't find that franzmoji.`);
		}

		// Attach the image rather than pinging back.
		return await interaction.reply({
			files: [new AttachmentBuilder(filePath)],
		});
	}
	catch (e) {
		console.log(e);
		return await interaction.reply(`There was a problem with your request.\n\`\`\`${e.message}\`\`\``);
	}
};

exports.commandData = (client = null, message = null) => {
	const commandinfo = new SlashCommandBuilder()
		.setName('franzmoji')
		.setDescription('Posts a franzmoji into the current channel');

	// One string option listing every asset as a choice; Discord shows the
	// names as a dropdown so a single /franzmoji works.
	const franzmojiFiles = readdirSync("./assets/franzmoji").filter(file => file.endsWith(".png"));
	commandinfo.addStringOption(option => {
		option.setName("franzmoji")
			.setDescription("Which franzmoji to post")
			.setRequired(true);
		for (const file of franzmojiFiles) {
			const filename = file.slice(0, -4);
			option.addChoices(
				{
					name: filename,
					value: filename,
				}
			);
		}
		return option;
	});

	return commandinfo.toJSON();
};
