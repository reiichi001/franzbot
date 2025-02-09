const {
	hydrate,
} = require("../modules/hydrate.js");

exports.run = async (client, message, args) => {
	 await hydrate(client, message.channel);
};

exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases: [],
};

exports.help = {
	name: "hydrate",
	category: "Fun",
	description: "Posts a picture reminding you to drink water.",
	usage: "hydrate",
};
