exports.run = async (client, message, args) =>
{ // eslint-disable-line no-unused-vars
    const msg = await message.channel.send("\u200B" + "Ping?");
    msg.edit("\u200B" + `Pong! Latency is ${msg.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(client.ping)}ms`);
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: []
};

exports.help = {
    name: "ping",
    category: "Tool",
    description: "Replies back with pong.",
    usage: "ping"
};