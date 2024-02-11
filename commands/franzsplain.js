export const run = (client, message, args) => message.channel
	.send(`\u200Bhttps://google.com/search?q=${args.join("+")}`)
	.catch(console.error);

export const conf = {
	enabled: true,
	guildOnly: false,
	aliases: [
		"mishsplain",
		"google",
		"search",
	],
};

export const help = {
	name: "franzsplain",
	category: "Tool",
	description: "Googles that text for you. How oppressive.",
	usage: "franzsplain text here",
};
