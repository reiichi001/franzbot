const {
	explain,
} = require('../modules/fun/franzsplain');

exports.run = (client, message, args) => message.channel
	.send(explain(args.join(" ")))
	.catch(console.error);

exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases: [
		"mishsplain",
		"google",
		"search",
	],
};

exports.help = {
	name: "franzsplain",
	category: "Tool",
	description: "Googles that text for you. How oppressive.",
	usage: "franzsplain text here",
};
