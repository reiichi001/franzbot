const responses = [
	`$8.`,
	`A small API change had massive ramifications.`,
	`Absolutely.`,
	`Certainly worth further investigation.`,
	`Concerning.`,
	`Extremely concerning.`,
	`I'm not cis, you are.`,
	`Interesting.`,
	`It's approved, you go ahead.`,
	`Literally roflmao…`,
	`Looking into it.`,
	'Please comment on this matter',
	`Messed up.`,
	`Mostly accurate tbh.`,
	`Not awesome imo.`,
	`Something is wrong.`,
	`That is extremely concerning.`,
	`They're fired.`,
	`Troublesome.`,
	`USER found at 127.0.0.1\nUSER deleted rm -rf`,
	`Vox populi, vox dei.`,
	`What work have you been doing?`,
	`Will ultimately need a complete rewrite.`,
	`Works for me.`,
	`You have committed a crime.`,
	`!!`,
	`🤣🤣🤣`,
	`🤣`,
	`.`,
];

exports.run = async (client, message, args) => {
	let shutupESLint = false;
	if (shutupESLint) {
		shutupESLint = true;
	}

	return message.channel.send(`\u200B${responses[Math.floor(responses.length * Math.random())].replaceAll("USER", message.author.displayName)}`);
};


exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases: [
		"elon",
		"elonmusk",
		"felonmusk",
	],
};

exports.help = {
	name: "felon",
	category: "Fun",
	description: "Franzbot is fired.",
	usage: "felon",
};
