const {
	ship,
} = require('../modules/fun/ship');

exports.run = async (client, message, args) => message.channel.send(await ship(client, args.join(" and "), message.guild));

exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases: [],
};

exports.help = {
	name: "ship",
	category: "Fun",
	description: "Franzbot is biased.",
	usage: "ship @person1 @person2",
};
