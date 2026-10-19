const {
	verdict,
} = require('../modules/fun/felon');

exports.run = async (client, message) => message.channel.send(verdict(message.author.displayName));

exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases: [
		"elon",
		"elonmusk",
		"felonmusk",
	],
};

exports.help = {
	name: "felon",
	category: "Fun",
	description: "Franzbot is fired.",
	usage: "felon",
};
