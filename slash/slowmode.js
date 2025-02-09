/* eslint-disable no-return-await */


const {
	setSlowmode,
} = require("../modules/slowmode.js");

const {
	SlashCommandBuilder,
} = require('@discordjs/builders');

const {
	MessageFlags,
} = require('discord.js');

exports.run = async (client, interaction) => {
	try {
		await interaction.deferReply({
			flags: MessageFlags.Ephemeral,
		});

		// handle any incoming options
		const channel = interaction.options.getChannel("channel") ?? interaction.channel;
		const time = interaction.options.getString("time") ?? "1";
		const reason = interaction.options.getString("reason") ?? null;
		// client.logger.debug(`User: ${user}\nreason: ${reason}`);

		const success = await setSlowmode(interaction.member, channel, interaction.channel, time, reason);

		if (success) {
			let nicetime;

			if (time.toLowerCase().endsWith("s")) {
				nicetime = `${parseInt(time, 10)} seconds`;
			}
			else if (time.toLowerCase().endsWith("h")) {
				// time in hours, convert to seconds
				nicetime = `${parseInt(time, 10)} hour`;
				if (parseInt(time, 10) !== 1) {
					nicetime = `${nicetime}s`;
				}
			}
			else if (time == "0" || time.toLowerCase() == "off") {
				// time in hours, convert to seconds
				nicetime = 0;
			}
			else {
				// time in minutes, convert to seconds
				nicetime = `${parseInt(time, 10)} minute`;
				if (parseInt(time, 10) !== 1) {
					nicetime = `${nicetime}s`;
				}
			}

			const replymsg = nicetime === 0
				? `Slowmode has been turned off for ${channel}.`
				: `Setting ${channel} to a slowmode of one message per user every ${nicetime}.`;

			channel.send(replymsg)
				.then(msg => {
					setTimeout(() => msg.delete(), 5 * 60 * 60);
				});

			return await interaction.editReply({
				content: replymsg,
				flags: MessageFlags.Ephemeral,
			});
		}

		return await interaction.editReply(`There was a problem with your request.`);
	}
	catch (e) {
		console.log(e);
		return await interaction.editReply(`There was a problem with your request.\n\`\`\`${e.message}\`\`\``);
	}
};

exports.commandData = (client, message) => {
	const commandinfo = new SlashCommandBuilder()
		.setName('slowmode')
		.setDescription('Enable/Disable slowmode on a channel. Requires appropriate permissions.');

	commandinfo
		.addChannelOption(channel => channel
			.setName("channel")
			.setDescription("Which channel to slowmode. If unset, this channel will be slowed.")
			.setRequired(false))
		.addStringOption(option => option
			.setName('time')
			.setDescription('Set the slowmode interval. If unset, defaults to 1 minute.')
			.addChoices(
				{
					name: "Off",
					value: "off",
				},
				{
					name: "5 Seconds",
					value: "5s",
				},
				{
					name: "10 Seconds",
					value: "10s",
				},
				{
					name: "15 Seconds",
					value: "15s",
				},
				{
					name: "30 Seconds",
					value: "30s",
				},
				{
					name: "1 Minute",
					value: "1m",
				},
				{
					name: "2 Minutes",
					value: "2m",
				},
				{
					name: "5 Minutes",
					value: "5m",
				},
				{
					name: "10 Minutes",
					value: "10m",
				},
				{
					name: "15 Minutes",
					value: "15m",
				},
				{
					name: "30 Minutes",
					value: "30m",
				},
				{
					name: "1 Hour",
					value: "1h",
				}
			)
			.setRequired(false))
		.addStringOption(option => option
			.setName('reason')
			.setDescription('Set the reason for enabling/disabling slowmode. If unset, Franzbot will still know it was you.')
			.setRequired(false));

	return commandinfo;
};

// Set this to false if you want it to be global.
exports.guildOnly = true;
