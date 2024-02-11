export const answer = async client => ({
	title: `XIV on Mac Saved Credentials`,
	description: `Having an issue with saved credentials on your FFXIV Account?`
		+ `Credentials are saved in macOS's keychain application (keychain-access in /Applications/Utilities)`,
	color: client.configdb.get("EMBED_NORMAL_COLOR"),
	footer: {
		"text": client.configdb.get("FRANZBOT_VERSION"),
	},
});

export const info = {
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
