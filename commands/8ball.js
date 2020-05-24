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
		
    var predict = require('eightball');
    const msg = await message.channel.send("\u200B" + predict());
};


exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: []
};

exports.help = {
    name: "8ball",
    category: "Fun",
    description: "Astrologians hate this one secret trick to telling the future.",
    usage: "8ball"
};