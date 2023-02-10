const responses = [
	`$8`,
	`Absolutely`,
	`Certainly worth further investigation`,
	`Concerning`,
	`I'm not cis, you are`,
	`Interesting`,
	`Looking into it`,
	'Please comment on this matter',
	`Messed up`,
	`Mostly accurate tbh`,
	`Not awesome imo`,
	`Something is wrong`,
	`That is extremely concerning`,
	`They're fired`,
	`Troublesome`,
	`Vox populi, vox dei`,
	`Works for me`,
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

	return message.channel.send(`\u200B${responses[Math.floor(responses.length * Math.random())]}`);
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
