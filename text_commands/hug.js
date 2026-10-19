const {
	hug,
} = require('../modules/fun/hug');

exports.run = async (client, message, args) => message.channel.send(hug(args.join(" ")));
exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases: [],
};

exports.help = {
	name: "hug",
	category: "Fun",
	description: "Sends virtual hug. Can send many hugs.",
	usage: "hug @usermention",
};
