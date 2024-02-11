export const run = async (client, message, args) => message.channel
	.send(`\u200B${args.join(" ") || "This requires an argument."}`);

export const conf = {
	enabled: true,
	guildOnly: false,
	aliases: [],
};

export const help = {
	name: "tester",
	category: "Tool",
	description: "Tries to trigger other bots",
	usage: "tester <some other prefix>",
};
