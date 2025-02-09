exports.answer = async client => ({
	title: `XL Saved Credentials`,
	description: `Having an issue with saved credentials or your FFXIV Account? See `
		+ `[HERE](https://goatcorp.github.io/faq/xl_troubleshooting#q-xiv-isnt-saving-my-new-password--how-do-i-clear-my-saved-password)`,
	color: client.configdb.get("EMBED_NORMAL_COLOR"),
	footer: {
		"text": client.configdb.get("FRANZBOT_VERSION"),
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
