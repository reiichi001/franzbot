import {
	hydrate,
} from '../modules/hydrate.js';

export const run = async (client, message, args) => {
	// eslint-disable-line no-unused-vars
	 await hydrate(client, message.channel);
};

export const conf = {
	enabled: true,
	guildOnly: false,
	aliases: [],
};

export const help = {
	name: "hydrate",
	category: "Fun",
	description: "Posts a picture reminding you to drink water.",
	usage: "hydrate",
};
