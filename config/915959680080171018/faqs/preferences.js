exports.answer = async client => ({
	"title": `Need to get into XOM's Preferences?`,
	"description": "To get into XIV on Mac's preferences, with the app focused', \n"
    + 'Find the XIV on Mac menu option next to the Apple icon in the top menu click it and select preferences \n',

	"color": client.config.EMBED_NORMAL_COLOR,
	"footer": {
		"text": client.config.FRANZBOT_VERSION,
	},
	"image": {
		"url": "https://i.imgur.com/aU9IzVK.png",
	},
});

exports.info = {
	name: "preferences",
	category: "help",
	aliases: [
		"preferences",
		"xompreferences",
		"pref",
		"prefs",
		"recommended",
	],
};
