/* eslint-disable max-len */
export const answer = async client => ({
	title: `Please give us your Support Info`,
	description: `In order for us to be able to assist you further, `
		+ `please open Penumbra and __click__ the **Copy Support Info** button in the top right corner of the main Settings tab. `
		+ `Then, please paste it in this channel so we can review it and see what else we may be able to do to assist you. \n\n`
		+ `**NOTE:** Formatting will be provided for you. You do not need to put this in a code block.`,
	color: client.configdb.get("EMBED_NORMAL_COLOR"),
	image: {
		"url": "https://cdn.discordapp.com/attachments/984798693096046642/1014744616815304794/unknown.png",
	},
	footer: {
		"text": client.configdb.get("FRANZBOT_VERSION"),
	},
});

export const info = {
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
