exports.answer = async client => ({
	title: `Visual C++ Runtime error on exit?`,
	description: `Ignore the error about Dalamud and abort() `
		+ `was called. it's a Dalamud bug and is harmless.`
		+ ` Just click Abort and the game will close as normal.`,
	color: client.config.EMBED_NORMAL_COLOR,
	image: {
		"url": 'https://i.imgur.com/JJJkU7u.png',
	},
	footer: {
		"text": client.config.FRANZBOT_VERSION,
	},
});

exports.info = {
	name: "abort",
	category: "info",
	aliases: [
		"abort", // only uncomment this for the xivonmac server
		"hookabort",
		"dalamudAbort",
		"quitError",
	],
};
