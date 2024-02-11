export const answer = async client => ({
	"title": `XIV On Mac setup guide!`,
	"description": `Please check out our application setup guide for XIV On Mac [HERE](https://www.xivmac.com/launcher-setup-guide) \n `
		+ `The video shows the steps to easily install, setup, and how to get into the game `,

	"color": client.configdb.get("EMBED_NORMAL_COLOR"),
	"footer": {
		"text": client.configdb.get("FRANZBOT_VERSION"),
	},
	"image": {
		"url": "https://i.imgur.com/9qTtqFL.png",
	},
});

export const info = {
	name: "XOMSetup",
	category: "info",
	aliases: [
		"setup",
		"xomsetup",
		"video",
		"setup",
	],
};
