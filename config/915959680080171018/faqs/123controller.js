/* eslint-disable max-len */
exports.answer = async client => ({
	title: `Updated to macOS 12.3 and now your controller is acting weird?`,
	description: `Due to a regression in macOS 12.3 controllers may not function as expected, or not be useable at all. \n `
		+ `This is due to a bug with macOS 12.3 and not with XIV on Mac. You can try running it plugged in (no bluetooth), or rebooting \n `
		+ `your computer as this works for some players. Unfortunately we have to wait for a software update from Apple to resolve this`,
	color: client.config.EMBED_NORMAL_COLOR,
	footer: {
		"text": client.config.FRANZBOT_VERSION,
	},
});

exports.info = {
	name: "123controller",
	category: "info",
	aliases: [
		"controller",
		"12.3controller",
		"ps4",
		"controllerregression",
		"xboxone",
	],
};
