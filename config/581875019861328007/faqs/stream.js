/* eslint-disable max-len */
exports.answer = async client => ({
	title: `Is it safe to stream with plugins? How can I prevent plugins from showing up on a Discord stream?`,
	description: `We highly advise that you disable all plugins or launch without plugins before streaming FFXIV.\n`
		+ `This includes both public website streaming as well as private Discord calls (or similar).\n`
		+ `\n`
		+ `You may potentially be able to minimize the risks but there is no guarantee:\n`
		+ `1. Are you capturing the entire screen or using a program that can capture only gameplay?\n`
		+ `2. If using OBS and similar, have you tried enabling "Hide Game UI" or related settings?\n`
		+ `3. Are you using other graphics injectors like Reshade, GShade, RivaTuner, SpecialK, or DLSSTweaks? They may cause conflicts if present.\n`
		+ `\n`
		+ `**We have no control over whether or not they will appear, even if it worked in a prior version/update.**\n`
		+ `\n`
		+ `Additionally, there are several plugins that modify the native game interface, or are designed to mimic the look and feel of the native game UI, and cannot be hidden. `
		+ `You may not even realize a feature is not actually part of the game because of this.\n`
		+ `\n`
		+ `__*We cannot endorse nor recommend you record or stream with plugins enabled in any context.*__`,
	color: client.configdb.get("EMBED_NORMAL_COLOR"),
	footer: {
		"text": `\`/faq stream\` · ${client.configdb.get("FRANZBOT_VERSION")}`,
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

