exports.run = async (client, message, args) =>
{ // eslint-disable-line no-unused-vars
    const msg = await message.channel.send("\u200B" + (args.join(" ") || "This requires an argument."));
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: []
};

exports.help = {
    name: "tester",
    category: "Tool",
    description: "Tries to trigger other bots",
    usage: "tester <some other prefix>"
};