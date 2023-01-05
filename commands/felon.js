const responses = [
	`$8`,
	`absolutely`,
	`certainly worth further investigation`,
	`concerning`,
	`i'm not cis, you are`,
	`interesting`,
	`looking into it`,
	'please comment on this matter',
	`messed up`,
	`mostly accurate tbh`,
	`not awesome imo`,
	`that is extremely concerning`,
	`they're fired`,
	`troublesome`,
	`vox populi, vox dei`,
	`works for me`,
	`!!`,
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
