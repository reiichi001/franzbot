const logger = require("../modules/Logger.js");
module.exports = async (client, interaction) => {
	/*
	BigInt.prototype.toJSON = function () {
		return this.toString();
	};
	client.logger.debug(JSON.stringify(interaction));
	*/
	// Handle Application Commands (aka slash commands)
	if (interaction.isCommand()) {
		// Grab the command data from the client.slashcmds Collection
		const cmd = client.slashcmds.get(interaction.commandName);
		// If that command doesn't exist, silently exit and do nothing
		if (!cmd) {
			return;
		}
		// Run the command
		try {
			await cmd.run(client, interaction);
			logger.log(`${interaction.user.id} ran slash command ${interaction.commandName}`, "cmd");
		}
		catch (e) {
			console.error(e);
			if (interaction.replied) {
				interaction.followUp({
					content: `There was a problem with your request.\n\`\`\`${e.message}\`\`\``,
					ephemeral: true,
				})
					.catch(err => console.error("An error occurred following up on an error", err));
			}
			else {
				interaction.reply({
					content: `There was a problem with your request.\n\`\`\`${e.message}\`\`\``,
					ephemeral: true,
				})
					.catch(err => console.error("An error occurred replying on an error", err));
			}
		}
	}

	// Handle buttonm interactions here
	if (interaction.isButton()) {
		// Grab the command data from the client.slashcmds Collection
		const cmd = client.buttoncmds.get(interaction.customId);
		// If that command doesn't exist, silently exit and do nothing
		if (!cmd) {
			return;
		}
		// Run the command
		try {
			await cmd.run(client, interaction);
		}
		catch (e) {
			console.error(e);
			if (interaction.replied) {
				interaction.followUp({
					content: `There was a problem with your request.\n\`\`\`${e.message}\`\`\``,
					ephemeral: true,
				})
					.catch(err => console.error("An error occurred following up on an error", err));
			}
			else {
				interaction.reply({
					content: `There was a problem with your request.\n\`\`\`${e.message}\`\`\``,
					ephemeral: true,
				})
					.catch(err => console.error("An error occurred replying on an error", err));
			}
		}
	}
};
