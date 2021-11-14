/* eslint-disable max-len */
/* eslint-disable consistent-return */
const logger = require("../modules/Logger");

const {
	MessageActionRow, MessageButton,
} = require('discord.js');

exports.createChannel = async (guild, member, reason = null) => {
	logger.debug(`user: ${member}\nreason: ${reason}`);
	// process.exit(0);
	// member = guild.members.fetch(member.id);

	// try making a new channel
	const UID = `Help-${await member.displayName}`;
	const category = await guild.channels.fetch("724832111466512396");
	const newchannel = await guild.channels.create(UID, {
		type: "text",
		topic: member.id,
		parent: category,
		permissionOverwrites: category.permissionOverwrites.cache,
	});

	// await newchannel.setParent(category.id);
	await newchannel.lockPermissions();
	await newchannel.permissionOverwrites.edit(member, {
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

	await newchannel.send({
		content: `${member}`,
		embeds: [embed],
		components: [row],
	});

	return newchannel;
};
