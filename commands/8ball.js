exports.run = async (client, message, args) => { // eslint-disable-line no-unused-vars
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
