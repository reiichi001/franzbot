/*
The HELP command is used to display every command's name and description
to the user, so that he may see what commands are available. The help
command is also filtered by level, so if a user does not have access to
a command, it is not shown to them. If a command name is given with the
help command, its extended help is shown.

PRTFM NOTE - the level parameter was never actually used. Don't trust the docs, kids.
*/
exports.run = (client, message, args) => {
	if (message.guild.id === client.config.GUILDID_GOAT) {
		return message.reply(`\u200BDid you mean ${client.config.prefix}faq?`)
			.then(message.delete({
				timeout: 5000,
				reason: client.config.AUDITLOG_COMMON,
			}));
	}
	if (message.guild.id === client.config.GUILDID_METEOR) {
		return message.reply(`\u200BDid you mean ${client.config.prefix}faq?`)
			.then(message.delete({
				timeout: 5000,
				reason: client.config.AUDITLOG_COMMON,
			}));
	}
	if (message.guild.id === client.config.GUILDID_XIVONMAC) {
		return message.reply(`\u200BDid you mean ${client.config.prefix}faq?`)
			.then(message.delete({
				timeout: 5000,
				reason: client.config.AUDITLOG_COMMON,
			}));
	}

	// If no specific command is called, show all filtered commands.
	if (args[0]) {
		// Show individual command's help.
		let command = args[0];
		if (client.commands.has(command)) {
			command = client.commands.get(command);
			return message.channel.send(
				`= ${command.help.name} = \n${command.help.description}\n`
				+ `usage:: ${command.help.usage}\n`
				+ `aliases:: ${command.conf.aliases.join(", ")}\n= ${command.help.name} =`,
				{
					code: "asciidoc",
				}
			);
		}
		return message.channel.send("Unrecognised command");
	}

	// Filter all commands by which are available for the user's level, using the <Collection>.filter() method.
	const myCommands = client.commands;

	// Here we have to get the command names only, and we use that array to get the longest name.
	// This make the help commands "aligned" in the output.
	const commandNames = myCommands.keyArray();
	const longest = commandNames.reduce((long, str) => Math.max(long, str.length), 0);

	let currentCategory = "";
	let output = `\u200B= Command List =\n\n[Use ${client.config.prefix}help <commandname> for details]\n`;
	// eslint-disable-next-line max-len
	const sorted = myCommands.array().sort((p, c) => (p.help.category > c.help.category ? 1 : p.help.name > c.help.name && p.help.category === c.help.category ? 1 : -1));
	sorted.forEach(c => {
		const cat = c.help.category.toProperCase();
		if (currentCategory !== cat) {
			output += `\u200b\n== ${cat} ==\n`;
			currentCategory = cat;
		}
		output += `${client.config.prefix}${c.help.name}`
		+ `${" ".repeat(longest - c.help.name.length)} :: ${c.help.description}\n`;
	});
	return message.channel.send(
		output,
		{
			code: "asciidoc",
			split:
{
	char: "\u200b",
},
		}
	);
};

exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases: [
		"h",
		"halp",
		"explain",
	],
};

exports.help = {
	name: "help",
	category: "System",
	description: "Displays all the available commands for your permission level.",
	usage: "help [command]",
};
