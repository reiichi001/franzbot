export const run = async (client, message, args) => { // eslint-disable-line no-unused-vars
	const msg = await message.channel.send("\u200BPing?");
	msg.edit(`\u200BPong! Latency is ${msg.createdTimestamp - message.createdTimestamp}ms. `
	+ `API Latency is ${Math.round(client.ws.ping)}ms`);
	return msg;
};

export const conf = {
	enabled: true,
	guildOnly: false,
	aliases: [],
};

export const help = {
	name: "ping",
	category: "Tool",
	description: "Replies back with pong.",
	usage: "ping",
};
