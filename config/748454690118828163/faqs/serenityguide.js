/* eslint-disable max-len */
exports.answer = async client => ({
	title: `Please review the guide!`,
	description: `A good starting place for information is the Guide to Penumbra made by <@858401899439194133>. \n\n`
		+ `It has easily digestible information for everything from how to install Penumbra, to collections, to material assignment, and more. `
		+ `If you have additional questions after reviewing the guide, feel free to ask for more assistance or clarification on the guide. \n\n`
		+ `If you have any feedback for additional content for the guide, please DM Serenity directly.\n\n`
		+ `**Guide URL:** <https://reniguide.info/>`,
	color: client.configdb.get("EMBED_NORMAL_COLOR"),
	footer: {
		"text": client.configdb.get("FRANZBOT_VERSION"),
	},
});

exports.info = {
	name: "serenityguide",
	category: "help",
	aliases: [
		"reni",
		"reniguide",
		"penumbraguide",
		"justreadthispleasebeforeasking",
	],
};
