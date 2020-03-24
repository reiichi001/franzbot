exports.run = (client, message, args) =>
{
    if (!args || args.length < 1) return message.reply("\u200B" + "Must provide a command name to reload.");
    const commandName = args[0];
    // Check if the command exists and is valid
    if (!client.commands.has(commandName))
    {
        return message.reply("\u200B" + "That command does not exist");
    }
    // the path is relative to the *current folder*, so just ./filename.js
    delete require.cache[require.resolve(`./${commandName}.js`)];
    // We also need to delete and reload the command from the client.commands Enmap
    client.commands.delete(commandName);
    const props = require(`./${commandName}.js`);
    client.commands.set(commandName, props);
    message.reply("\u200B" + `The command ${commandName} has been reloaded`).then(msg =>
    {
        msg.delete(5000)
    }).then(message.delete(5000));
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: []
};

exports.help = {
    name: "reload",
    category: "System",
    description: "Reloads a Franzbot command. Please don't unless you know what you're doing.",
    usage: "reload commandname"
};