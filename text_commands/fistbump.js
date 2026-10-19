const {
	bump,
} = require('../modules/fun/fistbump');

exports.run = async (client, message) => message.reply(bump(message.author.id));

exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases: [],
};

exports.help = {
	name: "fistbump",
	category: "Fun",
	description: "fistbumps someone",
	usage: "fistbump @usermention",
};
