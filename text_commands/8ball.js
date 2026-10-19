const {
	roll,
} = require('../modules/fun/eightball');

exports.run = async (client, message, args) => message.channel.send(roll(args.join(" ")));

exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases: [],
};

exports.help = {
	name: "8ball",
	category: "Fun",
	description: "Astrologians hate this one secret trick to telling the future.",
	usage: "8ball [question]",
};
