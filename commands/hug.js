exports.run = async (client, message, args) =>
{ // eslint-disable-line no-unused-vars

	ZuTriggers = [
			client.config.GUILDID_TESTING, //franzbot testing - general
			client.config.GUILDID_ZU //Zu - general
		];
		if ( !ZuTriggers.includes(message.guild.id ) )
		{
			message.reply("\u200B" + `this command doesn't work here.`)
				.then(message.delete({ timeout: 5000, reason: 'Cleaning up uneeded message' }));
			return; //this command
		}
		
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