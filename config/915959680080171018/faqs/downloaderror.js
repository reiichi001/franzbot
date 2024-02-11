export const answer = async client => ({
	"title": `Download Error downloading the base game archive? Try a VPN`,
	"description": 'Some ISPs block the servers SquareEnix uses for downloading the game, \n'
    + 'Using a VPN will get the game to download, most free trials will work. \n'
		+ "This is something between your ISP and SE's servers, not XIV on Mac",

	"color": client.configdb.get("EMBED_NORMAL_COLOR"),
	"footer": {
		"text": client.configdb.get("FRANZBOT_VERSION"),
	},
	"image": {
		"url": "https://i.imgur.com/PoAqDsX.png",
	},
});

export const info = {
	name: "downloaderror",
	category: "help",
	aliases: [
		"basegame",
		"downloaderror",
		"downloade",
		"vpn",
	],
};
