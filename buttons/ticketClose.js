/* eslint-disable no-return-await */
const logger = require("../modules/Logger.js");

const {
	MessageEmbed,
} = require("discord.js");

/* eslint-disable consistent-return */
exports.run = async (client, interaction) => { // eslint-disable-line no-unused-vars
	try {
		interaction.deferUpdate();
		logger.cmd(`${interaction.user.username} pushed a button in `
            + `#${interaction.channel.name} on ${interaction.guild.name}`);
		const channel = interaction.channel;
		const newname = channel.name.replace("help-", "closed-");
		await interaction.channel.setName(newname);

		const ticketClosedMessage = new MessageEmbed()
			.setDescription(`This ticket has been closed by ${interaction.user}`);

		// this needs to be updated to the user who made the ticket.
		await interaction.channel.permissionOverwrites.delete(interaction.channel.topic);
		await interaction.channel.send({
			embeds: [ticketClosedMessage],
		});
		// interaction.deleteReply();
	}
	catch (e) {
		console.log(e);
		return await interaction.editReply(`There was a problem with your request.\n\`\`\`${e.message}\`\`\``);
	}
};

exports.buttonData = () => ({
	name: "ticketClose",
	description: "Closes a support ticket channel.",
	options: [],
	defaultPermission: true,
});

// Set this to false if you want it to be global.
exports.guildOnly = false;
