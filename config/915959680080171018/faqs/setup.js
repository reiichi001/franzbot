exports.answer = async client => ({
	title: `XIV On Mac setup guide!`,
	description: `Please check out our application setup guide for XIV On Mac Here!. `
		+ `The video shows the steps to easily install, setup, and get into the game `
		+ `[HERE](https://www.xivmac.com/launcher-setup-guide)`,
	color: client.config.EMBED_NORMAL_COLOR,
	footer: {
		"text": client.config.FRANZBOT_VERSION
    "image": {
      "url": "https://media.discordapp.net/attachments/915975769010876566/953738655745343488/lsg2.png?width=1547&height=870",
    },
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
