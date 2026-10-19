/* eslint-disable no-unused-vars */

const {
	Events, ChannelType,
} = require('discord.js');
// const got = require('got');

const logger = require("../modules/Logger");

const {
	SECOND, MINUTE, timeoutSet, timeoutEnded, resetTimeout,
} = require("../modules/triggerTimeoutManager");


// The MESSAGE event runs anytime a message is received
// Note that due to the binding of client to every event, every event
// goes `client, other, args` when this function is run.
module.exports = {
	name: Events.MessageCreate,
	async execute(client, message) {
		// It's good practice to ignore other bots. This also makes your bot ignore itself
		// and not get into a spam loop (we call that "botception").
		// unless it's an announcement channel, since we want to publish posts...
		if (message.partial) {
			message = await message.fetch()
				.catch(error => {
					console.log('Something went wrong when fetching the message: ', error);
				});
		}

		// client.debug(`Message type: ${message.channel.type}`);

		// I swear to god if the channel type enum changes again, I'll scream. This should work. For now.
		// (message.channel.type === 'GUILD_NEWS' || message.channel.type.match(/news/gui))

		if (message.channel.type !== ChannelType.GuildAnnouncement && message.author.bot) {
			return;
		}

		// Franzbot should ignore webhooks too, unless it's an announcement channel
		if (message.channel.type !== ChannelType.GuildAnnouncement && message.webhookID) {
			return;
		}

		const isDirectMessage = message.channel.type == ChannelType.DM || message.channel.type == ChannelType.GroupDM;

		// execute server-specific triggers
		if (isDirectMessage) {
			console.log(`Received a DM from ${message.author.username}.`);
			client.perserversettings?.get(`directmessage-triggers`)?.forEach(trigger => {
				logger.debug(`Processing trigger: ${trigger.info.name}`);
				trigger.execute(client, message);
			});
		}
		else {
			// console.log(`GUILD: ${message.guild.name} ${message.guild?.id ?? "Not a guild"}`);
			// console.log(`CHANNEL: ${message.channel.name} ${message.channel?.id ?? "Not a channel"}`);
			client.perserversettings?.get(`${message.guild.id}-triggers`)?.forEach(async trigger => {
				// logger.debug(`Processing trigger: ${trigger.info.name}`);
				if (trigger.info.name !== "announcement publisher" && (message.author.bot || message.webhookID)) {
					// don't run triggers on bots or webhooks, unless it's to publish
					return;
				}
				await trigger.execute(client, message);
			});
		}

		// we don't want to deal with any other DMs.
		if (isDirectMessage) {
			return;
		}

		// Without MESSAGE_CONTENT, guild content only arrives when the bot is
		// mentioned (or replied to). Treat a leading mention as the command prefix.
		// Anything that does not start with the mention is not a command.
		const mentionPrefix = new RegExp(`^\\s*<@!?${client.user.id}>\\s*`, 'u');
		const mentionMatch = message.content.match(mentionPrefix);
		if (!mentionMatch) {
			return;
		}

		// Here we separate our "command" name, and our "arguments" for the command.
		// e.g. if we have the message "@Franzbot say Is this the real life?" , we'll get the following:
		// command = say
		// args = ["Is", "this", "the", "real", "life?"]
		const args = message
			.content
			.slice(mentionMatch[0].length)
			.trim()
			.split(/\s+/u)
			.filter(Boolean);

		// A bare mention gets a hint instead of an empty command. Skip the hint
		// when an attachment came along: the triggers above already handled it.
		if (args.length === 0) {
			if (message.attachments.size === 0) {
				message.channel.send(
					`You can use legacy text commands like \`@${client.user.username} help\`.\n`
					+ `To parse a log file the old way, mention \`@${client.user.username}\` `
					+ `and attach the file. But you should use \`/uploadlog\` instead.`
				);
			}
			return;
		}

		const command = args.shift().toLowerCase();

		// If the member on a guild is invisible or not cached, fetch them. The v12
		// Guild#fetchMember this replaced no longer exists in v14; fetching one
		// member by ID needs no privileged intent (only the full list does), and a
		// failure (e.g. they left) just leaves message.member unset.
		if (message.guild && !message.member) {
			await message.guild.members.fetch(message.author).catch(() => null);
		}

		// If the member was added to a server's ignorelist, don't process the command
		logger.debug(`loading ${message.guild.id}-ignoredUsers`);
		const ignoredUsers = client.perserversettings?.get(`${message.guild.id}-serversettings`)?.get("ignoredUsers");
		// const ignoredUsers = client.perserversettings.get(`${message.guild.id}-ignoredUsers`);
		logger.debug(`checking ignored users: ${ignoredUsers}`);
		if (ignoredUsers?.includes(message.author.id)) {
			message.reply("You can't use that command.")
				.then(msg => {
					setTimeout(() => msg.delete(), 5 * SECOND);
				})
				.then(
					// only works if Franzbot is allowed to manage messages.
					setTimeout(() => message.delete(), 5 * SECOND)
				);
			return;
		}

		// Check whether the command, or alias, exist in the collections defined
		// in app.js.
		const textcmd = client.commands.get(command) || client.commands.get(client.aliases.get(command));
		if (!textcmd) {
			return;
		}

		// Some commands may not be useable in DMs. This check prevents those commands from running
		// and return a friendly error message.
		if (textcmd && !message.guild && textcmd.conf.guildOnly) {
			message.channel.send("This command is unavailable via private message. Please run this command in a guild.");
			return;
		}

		message.flags = [];
		while (args[0] && args[0][0] === "-") {
			message.flags.push(args.shift().slice(1));
		}
		logger.debug(`Going to run command: ${textcmd.help.name}`);
		textcmd.run(client, message, args);
	},
};
