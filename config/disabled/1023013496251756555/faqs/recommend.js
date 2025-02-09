exports.answer = async client => ({
	title: `It is impossible for us to give plugin recommendations`,
	description: `It is impossible for us to give plugin recommendations.\n\n`
		+ ``
		+ `While we'd like to be able to help you improve your FFXIV gaming experience in every way possible, `
		+ `it's impossible for us to give you specific plugin recommendations without knowing what you're `
		+ `looking for.\n\n`
		+ ``
		+ `- Are you looking for combat-related plugins?\n`
		+ `- Or perhaps you're looking for some chat/RP tools?\n`
		+ `- UI/overlay style plugins?\n`
		+ `- General tweaks to the game?\n`
		+ ``
		+ `If you can give us some additional context, we can give you some better answers!`
		+ ``,
	color: client.configdb.get("EMBED_NORMAL_COLOR"),
	footer: {
		"text": client.configdb.get("FRANZBOT_VERSION"),
	},
});

exports.info = {
	name: "recommend",
	category: "info",
	aliases: [
		"recommends",
		"recommendation",
		"recommendations",
	],
};
