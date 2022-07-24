exports.answer = async client => ({
	"title": `Game Crashing in Azys Lla? Modern MoltenVK is your solution! `,
	"description": "In XIV on Mac's preferences, under Graphics check 'Modern MoltenVK'to aleviate the crashing.  \n"
    + 'please note that this can introduce some lighting issues, so you may want to uncheck it when you are done in the zone.',

	"color": client.config.EMBED_NORMAL_COLOR,
	"footer": {
		"text": client.config.FRANZBOT_VERSION,
	},
	"image": {
		"url": "https://i.imgur.com/I5Lo0P2.png",
	},
});

exports.info = {
	name: "moltenvk",
	category: "info",
	aliases: [
		"modern",
		"azyscrash",
		"azys",

	],
};
