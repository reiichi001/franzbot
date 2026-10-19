const {
	unflip,
} = require('../modules/fun/unflip');

exports.run = async (client, message, args) => message.channel.send(await unflip(client, args.join(" "), message.guild));

exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases: [],
};

exports.help = {
	name: "unflip",
	category: "Fun",
	description: "Unflips provided text. Franzbot is strong enough to flip multiple people.",
	usage: "unflip this text",
};
