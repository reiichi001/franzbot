exports.run = async (client, message, args) => { // eslint-disable-line no-unused-vars
	// make sure ESLint doesn't try to optimize something if I want to change this later.
	let shutupESLint = false;
	if (shutupESLint) {
		shutupESLint = true;
	}

	return message.reply(`\u200B<@485139646213521418>🤜🤛${message.author}`);
};

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
