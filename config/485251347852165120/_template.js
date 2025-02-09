exports.answer = async client => ({
	title: `TITLE`,
	description: `DESC`,
	color: client.configdb.get("EMBED_NORMAL_COLOR"),
	footer: {
		"text": client.configdb.get("FRANZBOT_VERSION"),
	},
});

exports.info = {
	name: "template",
	category: "debug",
	aliases: ["testy"],
};
