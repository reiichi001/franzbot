/* eslint-disable max-len */
exports.answer = async client => ({
	title: `Is is safe to stream with plugins?`,
	description: `Generally, no. We highly advise that you disable all plugins or launch without plugins before streaming FFXIV.\n\n`
		+ `However, there are a few ways to minimize your risks if you're going to stream anyways.\n`
		+ `1. How are you recording? Are you capturing the entire screen or using a program that can capture only gameplay? `
			+ `Choose the option to only capture gameplay via DirectX recording if possible.\n`
		+ `2. If using OBS and similar, have you enabled "Hide Game UI" or related settings?\n`
		+ `3. Are you using any other graphics injectors like Reshade, GShade, RivaTuner, or SpecialK? These can cause conflicts with the setting above.\n`
		+ `\n`
		+ `However, even with all of the above, plugins that modify the native game interface cannot be hidden. `
		+ `You probably still don't want to stream with plugins enabled unless you're **absolutely** sure `
		+ `that you have nothing that modifies in-game elements as they will always show up on your stream.`,
	color: client.config.EMBED_NORMAL_COLOR,
	footer: {
		"text": client.config.FRANZBOT_VERSION,
	},
});

exports.info = {
	name: "stream",
	category: "info",
	aliases: [
		"streaming",
		"streammode",
		"streamermode",
	],
};

