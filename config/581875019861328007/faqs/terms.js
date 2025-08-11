
exports.answer = async client => ({
	title: `Disambiguation - Terms`,
	description: `While many other game communities use "mod" as a generic catch-all `
		+ `to describe game changes, the majority of the FFXIV community splits the `
		+ `concept of a "mod" across a few separate definitions. The below terms are `
		+ `the most commonly used to describe the various components of the FFXIV `
		+ `custom modifications ecosystem.\n\n`
		+ `**ADDON**\n`
		+ `- an external application or tool that might inject or overlay onto the game. ACT, Dalamud, and ReShade are addons for FFXIV.\n`
		+ `- There is some limited support for ReShade, but for other addons, you are best going to their support servers or websites.\n`
		+ `\n`
		+ `**MOD**\n`
		+ `- A game asset replacement. These are often custom animations, models, textures, sounds, or vfx. \n`
		+ `- Check out the Penumbra server for more information regarding these.\n`
		+ `\n`
		+ `**PLUGIN**\n`
		+ `-  A mini-program loaded through Dalamud that changes or augments how the game behaves.\n`
		+ `- Plugins interface with the game directly, whether only to draw a custom overlay or to change how the game works in some manner.\n`
		+ `  - Plugins from the [Main Dalamud Plugin Repository](<https://tommadness.github.io/Plugin-Browser/>) (aka "main repo plugins")  `
		+ `will have a <:main_repo:1309368942925578372> icon by their names in the plugin installer.\n`
		+ `  - Plugins that are added from Custom Plugin Repositories (aka "custom repo plugins") `
		+ `will have a <:custom_repo:1309368924063924285> icon by their names in the plugin installer.\n`
		+ `  - We cannot provide support for custom repo plugins on this server.`
		+ `\n`
		+ `Please remember, the XIVLauncher and Dalamud server deals in plugins, `
		+ `but does not deal in mods or other addons. While plugins can exist `
		+ `to load mods or run other addons, this is outside the scope of our server.\n`
	+ `\n`,
	color: client.configdb.get("EMBED_NORMAL_COLOR"),
	footer: {
		"text": client.configdb.get("FRANZBOT_VERSION"),
	},
});

exports.info = {
	name: "terms",
	category: "help",
	aliases: [
		"modvplugin",
		"pluginvmod",
		"mvp",
	],
};
