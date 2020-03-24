exports.run = async (client, message, args) =>
{ // eslint-disable-line no-unused-vars
    const msg = await message.channel.send(message.mentions.users.first() ? "\u200B" + "(っ´▽｀)っ" + message.mentions.users.array().join(" ") : "\u200B" + "I don't know who to hug. >_>");
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: []
};

exports.help = {
    name: "hug",
    category: "Fun",
    description: "Sends virtual hug. Can send many hugs.",
    usage: "hug @usermention"
};