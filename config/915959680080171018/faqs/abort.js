exports.answer = async client => ({
	title: `Visual C++ Runtime error on exit?`,
	description: `Ignore the error about Dalamud and abort() `
		+ `was called. it's a Dalamud bug and is harmless.`
		+ ` Just click Abort and the game will close as normal.`
		+ ` There is a fix pending for Dalamud that will be integrated soon.`,
	color: client.configdb.get("EMBED_NORMAL_COLOR"),
	image: {
		"url": 'https://i.imgur.com/JJJkU7u.png',
	},
	footer: {
		"text": client.configdb.get("FRANZBOT_VERSION"),
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
