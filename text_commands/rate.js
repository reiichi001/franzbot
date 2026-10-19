const {
	rate,
} = require('../modules/fun/rate');

exports.run = async (client, message, args) => message.channel.send(await rate(client, args.join(" "), message.guild));

exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases: [],
};

exports.help = {
	name: "rate",
	category: "Fun",
	description: "Franzbot is biased.",
	usage: "rate <input>",
};
