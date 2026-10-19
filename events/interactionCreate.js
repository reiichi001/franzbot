const {
	Events,
} = require('discord.js');
const logger = require("../modules/Logger.js");

module.exports = {
	name: Events.InteractionCreate,
	async execute(client, interaction) {
		/*
		BigInt.prototype.toJSON = function () {
			return this.toString();
		};
		client.logger.debug(JSON.stringify(interaction));
		*/
		// Handle Application Commands (aka slash commands)
		if (interaction.isCommand()) {
			// Grab the command data from the slash command collections.
			// A guild-scoped command shadows the global one of the same name inside
			// the guild it was deployed to, and it is the ONLY copy the client can
			// invoke there — the global declarations are context-scoped out of
			// servers. So the guild set is consulted first when the interaction is
			// in a guild, and the global set first in DMs, where no guild command
			// exists. Both then fall through to the other set, which keeps any
			// non-whitelisted guild on the global copy.
			const cmd = (interaction.inGuild() ? client.guildSlashcmds.get(interaction.commandName) : null)
				|| client.slashcmds.get(interaction.commandName)
				|| client.guildSlashcmds.get(interaction.commandName);
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

		// Handle autocomplete interactions
		if (interaction.isAutocomplete()) {
			// Same dispatch rule as commands: the guild copy wins in a guild, since
			// that is the declaration the options being completed came from.
			const cmd = (interaction.inGuild() ? client.guildSlashcmds.get(interaction.commandName) : null)
				|| client.slashcmds.get(interaction.commandName)
				|| client.guildSlashcmds.get(interaction.commandName);
			if (!cmd || !cmd.handleAutocomplete) {
				return;
			}
			try {
				await cmd.handleAutocomplete(client, interaction);
			}
			catch (e) {
				console.error('Autocomplete error:', e);
			}
			return;
		}

		// Handle modal submit interactions here
		if (interaction.isModalSubmit()) {
			// Same dispatch rule as buttons: split on ':' so a dynamic
			// `name:<token>` modal resolves to its one registered handler.
			const key = interaction.customId.split(':')[0];
			const cmd = client.modalcmds?.get(key);
			// If that modal handler doesn't exist, silently exit and do nothing
			if (!cmd) {
				return;
			}
			// Run the handler
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
			return;
		}

		// Handle buttonm interactions here
		if (interaction.isButton()) {
			// Grab the command data from the client.slashcmds Collection.
			// Split on ':' so dynamic `dmrelay:<token>:<server>` buttons resolve to
			// the one registered dmRelay button, while static ids (no ':') are
			// unchanged.
			const key = interaction.customId.split(':')[0];
			const cmd = client.buttoncmds.get(key);
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
	},
};
