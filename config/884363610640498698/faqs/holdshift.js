/* eslint-disable max-len */
exports.answer = async client => ({
	title: `How to disable autologin`,
	description: `Keep the shift key held down while you open XIVLauncher. Please keep it held down as the program opens.\n\n`
		+ `__You should have also gotten a popup telling you this when you first enabled it.__`,
	color: client.config.EMBED_NORMAL_COLOR,
	footer: {
		"text": client.config.FRANZBOT_VERSION,
	},
});

exports.info = {
	name: "holdshift",
	category: "help",
	aliases: [
		"shift",
		"disableautologin",
		"stopautologin",
		"autologin",
	],
};
