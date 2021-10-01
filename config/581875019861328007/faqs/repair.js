exports.answer = async client => ({
	title: `Can I repair my FFXIV installation?`,
	description: `Yes, in the sense that you can reinstall the game. `
		+ `But it can be reinstalled selectively to help cut down on download/install time if needed.\n\n`
		+ `More Info: [HERE](https://goatcorp.github.io/faq/xl_troubleshooting#q-can-i-repair-my-ffxiv-installation)`,
	color: client.config.EMBED_NORMAL_COLOR,
	footer: {
		"text": client.config.FRANZBOT_VERSION,
	},
});

exports.info = {
	name: "repair",
	category: "help",
	aliases: [
		"deleteffxiv",
		"repairffxiv",
		"deletegame",
		"repairgame",
	],
};
