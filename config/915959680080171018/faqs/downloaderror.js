exports.answer = async client => ({
	title: `Download Error downloading the base game archive? Try a VPN`,
	description: 'Some ISPs block the servers SquareEnix uses for downloading the game", \n'
    + 'Using a VPN will get the game to download, most free trials will work. \n'
		+ "This is something between your ISP and SE's servers, not XIV on Mac",

	color: client.config.EMBED_NORMAL_COLOR,
	footer: {
		"text": client.config.FRANZBOT_VERSION
    },
    "image": {
      "url": "https://i.imgur.com/PoAqDsX.png",
    },
  });

exports.info = {
	name: "downloaderror",
	category: "help",
	aliases: [
		"basegame",
		"downloaderror",
		"downloade",
		"vpn",
	],
};
