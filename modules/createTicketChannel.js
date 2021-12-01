/* eslint-disable max-len */
/* eslint-disable consistent-return */
const fs = require('fs');
const path = require('path');
const logger = require("../modules/Logger");
const JSONdb = require('simple-json-db');

const {
	MessageActionRow, MessageButton, Collection,
} = require('discord.js');

exports.createChannel = async (guild, member, reason = null) => {
	logger.debug(`user: ${member}\nreason: ${reason}`);
	// process.exit(0);
	// member = guild.members.fetch(member.id);

	// fetch or create a config blob for this guild
	const ticketdbpath = `${__dirname}/../config/${guild.id}/tickets.json`;
	let  ticketdb = new JSONdb(ticketdbpath, {
		syncOnWrite: true,
		jsonSpaces: 4,
	});
	let guildTicketInfo;

	try {
		let createNewDB = true;
		if (fs.existsSync(ticketdbpath)) {
			logger.debug("File exists.");
			if (ticketdb?.has("guildticketinfo")) {
				guildTicketInfo = ticketdb.get("guildticketinfo");
				createNewDB = false;
				logger.debug("Loaded a tickets.json file");
				if (typeof guildTicketInfo.Tickets === "undefined") {
					guildTicketInfo.Tickets = new Map();
				}
				logger.debug(`Number of loaded tickets: ${guildTicketInfo.Tickets.size}`);
			}
		}
		if (createNewDB) {
			logger.error("No file exists.");
			// fs.appendFileSync(ticketdbpath, "{}");
			fs.mkdirSync(path.dirname(ticketdbpath), {
				recursive: true,
			});
			fs.closeSync(fs.openSync(ticketdbpath, 'a'));
			logger.debug("Created a new tickets.json file");

			ticketdb = new JSONdb(ticketdbpath, {
				syncOnWrite: true,
				jsonSpaces: 4,
			});

			guildTicketInfo = {
				GuildID: guild.id,
				TicketCategoryID: "724832111466512396",
				Admins: new Map(),
				Tickets: new Map(),
			};
			ticketdb.set("guildticketinfo", guildTicketInfo);
			logger.debug(`Number of tickets: ${guildTicketInfo.Tickets.size}`);
		}

		await ticketdb.sync();
	}
	catch (err) {
		console.error(err);
		// process.exit(1);
	}

	// try making a new channel
	const UID = `Help-${await member.displayName}`;
	const category = await guild.channels.fetch(guildTicketInfo.TicketCategoryID);
	const newchannel = await guild.channels.create(UID, {
		type: "text",
		// topic: member.id,
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

	// create a new ticketinfo
	const ticketInfo = {
		"id": `${newchannel.id}`,
		"user": `${member.id}`,
		reason,
		"isOpen": true,
	};


	logger.debug(`Number of tickets: ${guildTicketInfo.Tickets.size}`);
	guildTicketInfo.Tickets.set(`${ticketInfo.id}`, ticketInfo);
	logger.debug(`Number of tickets: ${guildTicketInfo.Tickets.size}`);
	ticketdb.set("guildticketinfo", guildTicketInfo);
	ticketdb.sync();

	return newchannel;
};
