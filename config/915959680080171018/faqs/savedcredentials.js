exports.answer = async client => ({
	title: `XIV on Mac Saved Credentials`,
	description: `Having an issue with saved credentials on your FFXIV Account?`
		+ `Credentials are saved in macOS's keychain application (keychain-access in /Applications/Utilities)`,
	color: client.config.EMBED_NORMAL_COLOR,
	footer: {
		"text": client.config.FRANZBOT_VERSION,
	},
});

exports.info = {
	name: "savedcredentials",
	category: "help",
	aliases: [
		"accountcreds",
		"creds",
		"credentials",
		"savedcreds",
		"savedcredentials",
		"account",
	],
};
