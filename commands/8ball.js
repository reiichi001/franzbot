import predict from 'eightball';

export const run = async (client, message, args) => message.channel.send(`\u200B${predict()}`);
export const conf = {
	enabled: true,
	guildOnly: false,
	aliases: [],
};

export const help = {
	name: "8ball",
	category: "Fun",
	description: "Astrologians hate this one secret trick to telling the future.",
	usage: "8ball",
};
