/* eslint-disable max-len */
exports.answer = async client => ({
	title: `Please check if you have the Experimental UID Cache option enabled`,
	description: `If you're able to launch, but receiving an authentication error in the 5000 range, `
		+ `it could be due to an invalid UID Cache.\n\n`
		+ `If you've enabled the setting to have XIVLauncher save your login session for reuse, `
		+ `it may have expired already as XIVLauncher has no way of checking this.\n\n`
		+ `Please try disabling it from XIVLauncher's settings -> About tab and login again. `
		+ `Or hold down the Control key while opening XIVLauncher to reset the cache.`
		+ ``,
	image: {
		"url": "https://cdn.discordapp.com/attachments/687530726756712478/1015727025941647430/unknown.png",
	},
	color: client.config.EMBED_NORMAL_COLOR,
	footer: {
		"text": client.config.FRANZBOT_VERSION,
	},
});

exports.info = {
	name: "uidcache",
	category: "help",
	aliases: [
		"uid",
		"5003",
		"5006",
		"autherror",
		"experimentaluid",
		"experimentaluidcache",
	],
};
