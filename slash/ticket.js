/* eslint-disable no-return-await */
/* eslint-disable consistent-return */

const {
	createChannel,
} = require("../modules/createTicketChannel");

const {
	SlashCommandBuilder,
} = require('@discordjs/builders');

exports.run = async (client, interaction) => {
	try {
		await interaction.deferReply({
			ephemeral: true,
		});

		// handle any incoming options
		let  user = interaction.options.getUser("user") ?? interaction.user;
		const  reason = interaction.options.getString("reason");
		// client.logger.debug(`User: ${user}\nreason: ${reason}`);

		user = await interaction.guild.members.fetch(user) ?? interaction.member;

		const newchannel = await createChannel(interaction.guild, user, reason);

		await interaction.editReply({
			content: `Ticket Created: ${newchannel}`,
			ephemeral: true,
		});


		/*
		// try making a new channel
		const UID = `Help-${await interaction.member.displayName}`;
		const category = await interaction.guild.channels.fetch("724832111466512396");
		const newchannel = await interaction.guild.channels.create(UID, {
			type: "text",
			topic: interaction.user.id,
			parent: category,
			permissionOverwrites: category.permissionOverwrites.cache,
		});

		// await newchannel.setParent(category.id);
		await newchannel.lockPermissions();
		await newchannel.permissionOverwrites.edit(interaction.user, {
			'VIEW_CHANNEL': true,
			'SEND_MESSAGES': true,
			'ATTACH_FILES': true,
		});


		const embed = {
			"description": "Please send a message in this channel to describe your problem.\n\n"
				+ "Please make sure to include possible error messages, or screenshots clarifying your description.\n\n"
				+ "To close this channel, please click 🔒",
			"color": 2216816,
			"footer": {
				"icon_url": "https://raw.githubusercontent.com/goatcorp/FFXIVQuickLauncher/master/src/XIVLauncher/Resources/logo.png",
				"text": "XIVLauncher",
			},
		};
		const row = new MessageActionRow()
			.addComponents(
				new MessageButton()
					.setCustomId("ticketClose")
					.setEmoji("🔒")
					.setLabel('Close')
					.setStyle('SECONDARY')
			);

		newchannel.send({
			content: `${interaction.user}`,
			embeds: [embed],
			components: [row],
		});
		*/
	}
	catch (e) {
		console.log(e);
		return await interaction.editReply(`There was a problem with your request.\n\`\`\`${e.message}\`\`\``);
	}
};

/*
exports.commandData = () => ({
	name: "ticket",
	description: "Creates a help ticket.",
	options: [],
	defaultPermission: true,
});
*/
exports.commandData = (client, message) => {
	const commandinfo = new SlashCommandBuilder()
		.setName('ticket')
		.setDescription('Creates a help ticket.');

	commandinfo
		.addUserOption(option => option
			.setName('user')
			.setDescription('The user')
			.setRequired(false))
		.addStringOption(option => option
			.setName('reason')
			.setDescription('Specify a reason for this ticket')
			.setRequired(false));
	return commandinfo.toJSON();
};

// Set this to false if you want it to be global.
exports.guildOnly = false;
