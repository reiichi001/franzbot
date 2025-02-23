
exports.answer = async client => ({
	title: `Is XIV On Mac, Dalamud, and Dalamud Plugins safe to use?`,
	description: `For the most part, yes, this should be safe to use. We've taken steps to `
		+ `ensure that using XIV On Mac, Dalamud, and **officially supported** `
		+ `Dalamud Plugins should not result in invalid or unexpected behavior.`
		+ `\n\nLike other game modifictions, you shouldn't talk about using it in-game and should exercise `
		+ `caution over which plugins you use. XIV On Mac and Dalamud are not designed `
		+ `for game exploitation, automation, or botting.`
		+ `\n\nTo the best of our knowledge, SE does not check for or prevent the usage of `
		+ `third party tools, but they are against the terms of service.`
		+ `\n\nPlease note that we cannot vouch for the safety of custom repository plugins.`
		+ `\n\nIf you'd like more information, please see the <#916158828670754887> channel and our FAQ post `
		+ `[HERE](https://discord.com/channels/915959680080171018/916158828670754887/973286339959222312)`,
	color: client.configdb.get("EMBED_NORMAL_COLOR"),
	footer: {
		"text": client.configdb.get("FRANZBOT_VERSION"),
	},
});

exports.info = {
	name: "safety",
	category: "info",
	aliases: [
		"security",
		"safe",
		"safeness",
		"secure",
	],
};
