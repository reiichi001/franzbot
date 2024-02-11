export const answer = async client => ({
	"title": `Can't find character config data? We need permissions!`,
	"description": 'In Security and privacy in System preferences, grant XIV on Mac, \n'
    + 'permissions to your documents folder. This is what happens when you press \n'
		+ "no on the dialogue asking for permissons",

	"color": client.configdb.get("EMBED_NORMAL_COLOR"),
	"footer": {
		"text": client.configdb.get("FRANZBOT_VERSION"),
	},
	"image": {
		"url": "https://i.imgur.com/Eq8LlVZ.png",
	},
});

export const info = {
	name: "permissions",
	category: "help",
	aliases: [
		"permissions",
		"cantfindconfig",

	],
};
