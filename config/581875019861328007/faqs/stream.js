/* eslint-disable max-len */
exports.answer = async client => ({
	title: `Is it safe to stream with plugins? Why do my plugins always show up?`,
	description: `Generally, no. We highly advise that you disable all plugins or launch without plugins before streaming FFXIV.\n`
		+ `\n`
		+ `**Is it still unsafe even if my capture software has a "Hide Game UI" feature?**\n`
		+ `Put shortly? Yes\n\n`
		+ `These features rely on caputuring from directx render layers using educated guesses about which layer is "before" game ui and other overlays. When you add additional layers on top of the game, like Dalamud, Reshade, etc, you introduce unexpected layers and it becoems more or less a gamble of whether it will work reliably or not.\n\n`
		+ `**You might be able to minimize your risks if you're going to stream anyways.**\n`
		+ `1. How are you recording? Are you capturing the entire screen or using a program that can capture only gameplay?\n`
		+ `2. If using OBS and similar, have you enabled "Hide Game UI" or related settings? (These may not work reliably, as noted)\n`
		+ `3. Other graphics injectors like Reshade, GShade, RivaTuner, SpecialK, or DLSSTweaks may conflict.\n`
		+ `\n`
		+ `Even with all of the above precautions, there are several plugins that modify the native game interface and cannot be hidden. `
		+ `as they modify in-game user interface elements and are very good at it. You may not even realize a feature `
		+ `is not actually part of the game because of this.\n\n`
		+ `__You probably still don't want to stream with plugins enabled.__`,
	color: client.configdb.get("EMBED_NORMAL_COLOR"),
	footer: {
		"text": client.configdb.get("FRANZBOT_VERSION"),
	},
});

exports.info = {
	name: "stream",
	category: "info",
	aliases: [
		"obs",
		"streaming",
		"streammode",
		"streamermode",
		"streamingmode",
	],
};

