/* eslint-disable max-len */
exports.answer = async client => ({
	title: `Can't save graphic setting changes? Can't alt-tab? Switch to borderless window!`,
	description: `Fullscreen causes random problems with saving changed graphics settings \n `
		+ `or breaking alt-tab \n `
		+ `set the game to borderless window and they'll be resolved!`,
	color: client.config.EMBED_NORMAL_COLOR,
	footer: {
		"text": client.config.FRANZBOT_VERSION,
	},
});

exports.info = {
	name: "fullscreen",
	category: "info",
	aliases: [
		"fullscreen",
		"borderless",
		"graphicssaved",

	],
};
