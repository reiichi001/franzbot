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

// Pick a verdict and drop the invoking user's display name into it.
function verdict(displayName) {
	return `\u200B${responses[Math.floor(responses.length * Math.random())].replaceAll("USER", displayName)}`;
}

module.exports = {
	verdict,
};
