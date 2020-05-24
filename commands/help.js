/*
The HELP command is used to display every command's name and description
to the user, so that he may see what commands are available. The help
command is also filtered by level, so if a user does not have access to
a command, it is not shown to them. If a command name is given with the
help command, its extended help is shown.
*/
exports.run = (client, message, args, level) =>
{
	
	//Channel-specific markers
	GoatTriggers = [
		client.config.GUILDID_TESTING, //franzbot testing - general
		client.config.GUILDID_GOAT //Goatplace - general
	];
	MeteorTriggers = [
		client.config.GUILDID_TESTING, //franzbot testing - general
		client.config.GUILDID_METEOR //Meteor - general
	];
	ZuTriggers = [
		client.config.GUILDID_TESTING, //franzbot testing - general
		client.config.GUILDID_ZU //Zu - general
	];
	
	
	if ( message.guild.id === client.config.GUILDID_GOAT )
	{
		message.reply("\u200B" + `Did you mean ${client.config.prefix}faq?`)
			.then(message.delete({ timeout: 5000, reason: 'Cleaning up uneeded message' }));
		return; //this command
	}
	if ( message.guild.id === client.config.GUILDID_METEOR )
	{
		message.reply("\u200B" + `Did you mean ${client.config.prefix}faq?`)
			.then(message.delete({ timeout: 5000, reason: 'Cleaning up uneeded message' }));
		return; //this command
	}
	
    // If no specific command is called, show all filtered commands.
    if (!args[0])
    {
        // Filter all commands by which are available for the user's level, using the <Collection>.filter() method.
        const myCommands = client.commands;

        // Here we have to get the command names only, and we use that array to get the longest name.
        // This make the help commands "aligned" in the output.
        const commandNames = myCommands.keyArray();
        const longest = commandNames.reduce((long, str) => Math.max(long, str.length), 0);

        let currentCategory = "";
        let output = "\u200B" + `= Command List =\n\n[Use ${client.config.prefix}help <commandname> for details]\n`;
        const sorted = myCommands.array().sort((p, c) => p.help.category > c.help.category ? 1 : p.help.name > c.help.name && p.help.category === c.help.category ? 1 : -1);
        sorted.forEach(c =>
        {
            const cat = c.help.category.toProperCase();
            if (currentCategory !== cat)
            {
                output += `\u200b\n== ${cat} ==\n`;
                currentCategory = cat;
            }
            output += `${client.config.prefix}${c.help.name}${" ".repeat(longest - c.help.name.length)} :: ${c.help.description}\n`;
        });
        message.channel.send(output,
        {
            code: "asciidoc",
            split:
            {
                char: "\u200b"
            }
        });
    }
    else
    {
        // Show individual command's help.
        let command = args[0];
        if (client.commands.has(command))
        {
            command = client.commands.get(command);
            message.channel.send(`= ${command.help.name} = \n${command.help.description}\nusage:: ${command.help.usage}\naliases:: ${command.conf.aliases.join(", ")}\n= ${command.help.name} =`,
            {
                code: "asciidoc"
            });
        }
    }
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["h", "halp", "explain"]
};

exports.help = {
    name: "help",
    category: "System",
    description: "Displays all the available commands for your permission level.",
    usage: "help [command]"
};