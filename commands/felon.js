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
	`Let's see how earth responds to that.`,
	`Literally roflmao …`,
	`Looking into it.`,
	'Please comment on this matter.',
	`Messed up.`,
	`Mostly accurate tbh.`,
	`Not awesome imo.`,
	`Something is wrong.`,
	`That is extremely concerning.`,
	`They're fired.`,
	`Troublesome.`,
	`Vox populi, vox dei.`,
	`What work have you been doing?`,
	`Will ultimately need a complete rewrite.`,
	`Works for me.`,
	`!!`,
	`🤣🤣🤣`,
	`🤣`,
	`.`,
];

export const run = async (client, message, args) => {
	let shutupESLint = false;
	if (shutupESLint) {
		shutupESLint = true;
	}

	return message.channel.send(`\u200B${responses[Math.floor(responses.length * Math.random())]}`);
};

export const conf = {
	enabled: true,
	guildOnly: false,
	aliases: [
		"elon",
		"elonmusk",
		"felonmusk",
	],
};

export const help = {
	name: "felon",
	category: "Fun",
	description: "Franzbot is fired.",
	usage: "felon",
};
