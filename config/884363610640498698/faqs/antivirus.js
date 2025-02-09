/* eslint-disable max-len */
exports.answer = async client => ({
	title: `Please whitelist or make AV exceptions for XIVLauncher`,
	description: `Details can be found `
		+ `[HERE](https://goatcorp.github.io/faq/xl_troubleshooting#q-how-do-i-whitelist-xivlauncher-and-dalamud-so-my-antivirus-leaves-them-alone)`,
	color: client.configdb.get("EMBED_NORMAL_COLOR"),
	footer: {
		"text": client.configdb.get("FRANZBOT_VERSION"),
	},
});

exports.info = {
	name: "antivirus",
	category: "help",
	aliases: [
		"av",
		"anti-virus",
		"defender",
		"avast",
		"avg",
		"bitdefender",
		"kaspersky",
		"mcafee",
		"norton",
		"eset",
	],
};

