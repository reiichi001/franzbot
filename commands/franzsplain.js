exports.run = (client, message, args) => message.channel.send(`\u200Bhttps://google.com/search?q=${args.join("+")}`).catch(console.error);

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
