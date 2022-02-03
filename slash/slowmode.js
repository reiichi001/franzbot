/* eslint-disable no-return-await */
/* eslint-disable consistent-return */

const {
	setSlowmode,
} = require("../modules/slowmode.js");

const {
	SlashCommandBuilder,
} = require('@discordjs/builders');

exports.run = async (client, interaction) => { // eslint-disable-line no-unused-vars
	try {
		await interaction.deferReply({
			ephemeral: true,
		});

		// handle any incoming options
		const channel = interaction.options.getChannel("channel") ?? interaction.channel;
		const time = interaction.options.getString("time") ?? "1";
		const reason = interaction.options.getString("reason") ?? null;
		// client.logger.debug(`User: ${user}\nreason: ${reason}`);

		const success = await setSlowmode(interaction.member, channel, interaction.channel, time, reason);

		if (success) {
			return await interaction.editReply({
				content: `Setting ${channel} to a slowmode of one message per user every ${time} minutes.`,
				ephemeral: true,
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
			.addChoice("5 Seconds", "5s")
			.addChoice("10 Seconds", "10s")
			.addChoice("15 Seconds", "15s")
			.addChoice("30 Seconds", "30s")
			.addChoice("1 Minute", "1m")
			.addChoice("2 Minutes", "2m")
			.addChoice("5 Minutes", "5m")
			.addChoice("10 Minutes", "10m")
			.addChoice("15 Minutes", "15m")
			.addChoice("30 Minutes", "30m")
			.addChoice("1 Hour", "1h")
			.setRequired(false))
		.addStringOption(option => option
			.setName('reason')
			.setDescription('Set the reason for enabling/disabling slowmode. If unset, Franzbot will still know it was you.')
			.setRequired(false));
	return commandinfo.toJSON();
};

// Set this to false if you want it to be global.
exports.guildOnly = true;
