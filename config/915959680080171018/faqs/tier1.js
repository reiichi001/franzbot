exports.answer = async client => ({
	title: `Tier 1 load error? Please adjust your injection delay!`,
	description: `Please open the preferences for XIV On Mac to adjust the Dalamud delay \n`
		+ `And lower the injection delay to between 1-3 seconds if you're on a M1 system `
		+ `or 7 seconds if on Intel`,
	color: client.config.EMBED_NORMAL_COLOR,
	image: {
		"url": 'https://i.imgur.com/TiGZIw9.png',
	},
	footer: {
		"text": client.config.FRANZBOT_VERSION,
	},
});

exports.info = {
	name: "tier1",
	category: "help",
	aliases: [
		"tier1", // only for XIV on Mac
		"dalamudt1",
		"DT1F",
		"injectiondelay",
		"dalamuddelay",
	],
};
