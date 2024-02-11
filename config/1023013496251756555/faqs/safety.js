/* eslint-disable max-len */
export const answer = async client => ({
	title: `Are XIVLauncher, Dalamud, and Dalamud Plugins safe to use?`,
	description: `For the most part, yes, this should be safe to use. We've taken steps to `
		+ `ensure that using XIVLauncher, Dalamud, and **officially supported** `
		+ `Dalamud Plugins should not result in invalid or unexpected behavior.`
		+ `\n\nLike other game modifictions, you shouldn't talk about using it in-game and should exercise `
		+ `caution over which plugins you use. XIVLauncher and Dalamud are not designed `
		+ `for game exploitation, automation, or botting.`
		+ `\n\nTo the best of our knowledge, SE does not check for or prevent the usage of `
		+ `third party tools, but they are against the terms of service.`
		+ `\n\nPlease note that we cannot vouch for the safety of third party plugins.`
		+ `\n\nIf you'd like more information, please see the <#585958820061249537> channel and our FAQ post `
		+ `[HERE](https://goatcorp.github.io/faq/xl_troubleshooting#q-are-xivlauncher-dalamud-and-dalamud-plugins-safe-to-use)`,
	color: client.configdb.get("EMBED_NORMAL_COLOR"),
	footer: {
		"text": client.configdb.get("FRANZBOT_VERSION"),
	},
});

export const info = {
	name: "safety",
	category: "info",
	aliases: [
		"security",
		"safe",
		"safeness",
		"secure",
	],
};

