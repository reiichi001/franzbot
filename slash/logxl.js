const {
	SlashCommandBuilder,
} = require('discord.js');

const {
	run,
} = require('../modules/runLogCommand');

/**
 * Build the slash command data — a required file attachment opens the
 * OS file picker on the client.
 */
exports.commandData = () => new SlashCommandBuilder()
	.setName('logxl')
	.setDescription('Parse an XIVLauncher log file.')
	.addAttachmentOption(o => o.setName('file').setDescription('The log file to parse')
		.setRequired(true))
	.toJSON();

exports.run = (client, interaction) => run(client, interaction);

exports.guildOnly = false; // deployed globally by clientReady; works in guilds AND DMs
