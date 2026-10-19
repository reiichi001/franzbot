const {
	flip,
} = require('../modules/fun/flip');

exports.run = async (client, message, args) => message.channel.send(await flip(client, args.join(" "), message.guild));

exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases: [],
};

exports.help = {
	name: "flip",
	category: "Fun",
	description: "Flips provided text. Franzbot is strong enough to flip multiple people.",
	usage: "flip this text",
};
