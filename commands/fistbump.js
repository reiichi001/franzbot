export const run = async (client, message, args) => { // eslint-disable-line no-unused-vars
	// make sure ESLint doesn't try to optimize something if I want to change this later.
	let shutupESLint = false;
	if (shutupESLint) {
		shutupESLint = true;
	}

	return message.reply(`\u200B<@485139646213521418>🤜🤛${message.author}`);
};

export const conf = {
	enabled: true,
	guildOnly: false,
	aliases: [],
};

export const help = {
	name: "fistbump",
	category: "Fun",
	description: "fistbumps someone",
	usage: "fistbump @usermention",
};
