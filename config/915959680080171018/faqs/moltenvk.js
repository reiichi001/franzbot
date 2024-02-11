export const answer = async client => ({
	"title": `Game Crashing in Azys Lla? Modern MoltenVK is your solution! `,
	"description": "In XIV on Mac's preferences, under Graphics check 'Modern MoltenVK'to aleviate the crashing.  \n"
    + 'please note that this can introduce some lighting issues, so you may want to uncheck it when you are done in the zone.',

	"color": client.configdb.get("EMBED_NORMAL_COLOR"),
	"footer": {
		"text": client.configdb.get("FRANZBOT_VERSION"),
	},
	"image": {
		"url": "https://i.imgur.com/I5Lo0P2.png",
	},
});

export const info = {
	name: "moltenvk",
	category: "info",
	aliases: [
		"modern",
		"azyscrash",
		"azys",

	],
};
