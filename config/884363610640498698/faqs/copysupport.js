/* eslint-disable max-len */
exports.answer = async client => ({
	title: `Please give us your Support Info`,
	description: `In order for us to be able to assist you further, `
		+ `please open Penumbra and __click__ the **Copy Support Info** button in the top right corner of the main Settings tab. `
		+ `Then, please paste it in this channel so we can review it and see what else we may be able to do to assist you. \n\n`
		+ `**NOTE:** Formatting will be provided for you. You do not need to put this in a code block.`,
	color: client.config.EMBED_NORMAL_COLOR,
	image: {
		"url": "https://media.discordapp.net/attachments/968591485060677653/983117209494765648/unknown.png",
	},
	footer: {
		"text": client.config.FRANZBOT_VERSION,
	},
});

exports.info = {
	name: "copysupport",
	category: "logs",
	aliases: [
		"csupport",
		"copysupportinfo",
		"csupportinfo",
		"psupport",
		"penumbrasupport",
		"psupportinfo",
		"penumbrasupportinfo",
		"supportinfo",
	],
};
