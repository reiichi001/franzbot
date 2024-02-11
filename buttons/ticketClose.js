/* eslint-disable no-return-await */
import logger from '../modules/logger.js';

import JSONdb from 'simple-json-db';
import {
	EmbedBuilder,
} from 'discord.js';

/* eslint-disable consistent-return */
export const run = async (client, interaction) => { // eslint-disable-line no-unused-vars
	try {
		const ticketdbpath = `${__dirname}/../config/${interaction.guild.id}/tickets.json`;
		const ticketdb = new JSONdb(ticketdbpath, {
			syncOnWrite: true,
			jsonSpaces: 4,
		});

		interaction.deferUpdate();
		logger.cmd(`${interaction.user.username} pushed a button in `
            + `#${interaction.channel.name} at ${interaction.guild.name}`);

		if (ticketdb.has("guildticketinfo")) {
			const guildTicketInfo = ticketdb.get("guildticketinfo");
			const thisTicket = guildTicketInfo.Tickets.get(`${interaction.channel.id}`);
			logger.debug(`Found ticket: ${thisTicket}`);
			process.exit(1);
		}
		else {
			throw new Error("Ticket Config for this server not found.");
		}

		const channel = interaction.channel;
		const newname = channel.name.replace("help-", "closed-");
		await interaction.channel.setName(newname);

		const ticketClosedMessage = new EmbedBuilder()
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

export const buttonData = () => ({
	name: "ticketClose",
	description: "Closes a support ticket channel.",
	options: [],
	defaultPermission: true,
});

// Set this to false if you want it to be global.
export const guildOnly = false;
