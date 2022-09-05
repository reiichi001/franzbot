/* eslint-disable max-len */
exports.answer = async client => ({
	title: `Do you have a DDS/PNG, and want to use it with Penumbra?`,
	description: `You can do that in Penumbra, but it is not an automatic thing. `
		+ `As part of the guide made by <@858401899439194133>, you can follow the steps <@94553384434008064> `
		+ `provided to make a mod out of the DDS or PNG files you have available. `
		+ `To do so, please follow the steps at <https://reniguide.info/#loosefiles> and if you `
		+ `have any questions after doing so, come ask us for more assistance.\n\n`
		+ `Please note that if you can see the texture, and it is not a complete picture, `
		+ `but simply an overlay, the guide instructions may not assist you as it was made for users `
		+ `that have a complete texture. For further assistance, please ask us and we will be here to assist. `,
	color: client.config.EMBED_NORMAL_COLOR,
	footer: {
		"text": client.config.FRANZBOT_VERSION,
	},
});

exports.info = {
	name: "loosefiles",
	category: "help",
	aliases: [
		"loosefile",
		"dds",
		"png",
	],
};
