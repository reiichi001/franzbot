/* eslint-disable no-return-await */
/* eslint-disable consistent-return */

const {
	hydrate,
} = require("../modules/hydrate");

exports.run = async (client, interaction) => {
	try {
		await hydrate(client, interaction.channel);
	}
	catch (e) {
		console.log(e);
		return await interaction.editReply(`There was a problem with your request.\n\`\`\`${e.message}\`\`\``);
	}
};

exports.commandData = () => ({
	name: "hydrate",
	description: "Remember to drink some water.",
	options: [],
	defaultPermission: true,
});

// Set this to false if you want it to be global.
exports.guildOnly = true;
