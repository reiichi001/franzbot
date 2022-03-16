exports.answer = async client => ({
	title: `XIV On Mac setup guide!`,
	description: `Please check out our application setup guide for XIV On Mac [HERE](https://www.xivmac.com/launcher-setup-guide)! `
		+ `The video shows the steps to easily install, setup, and how to get into the game `,

	color: client.config.EMBED_NORMAL_COLOR,
	footer: {
		"text": client.config.FRANZBOT_VERSION
    },
    "image": {
      "url": "https://i.imgur.com/9qTtqFL.png",
    },
});

exports.info = {
	name: "XOMSetup",
	category: "info",
	aliases: [
		"setup",
		"xomsetup",
		"video",
		"setup",
	],
};
