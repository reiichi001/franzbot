
exports.answer = async client => ({
	title: `Are donations accepted?`,
	description: `Franz still has to write this.`,
	color: client.configdb.get("EMBED_NORMAL_COLOR"),
	footer: {
		"text": client.configdb.get("FRANZBOT_VERSION"),
	},
});

exports.info = {
	name: "donate",
	category: "info",
	aliases: [
		"money",
		"gimmemoney",
		"patreon",
	],
};
