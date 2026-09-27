/* eslint-disable max-len */
exports.answer = async client => ({
	title: `What is Material Assignment?`,
	description: `What you are describing is called Material Reassignment.\n\n`
		+ `While Textools may have a feature to auto assign, Penumbra does not. That is due to only being able to use one body mod in Textools, so it only has one body mod to use. As Penumbra can have any/all body mods imported, it will require you to manually assign it.\n\n`
		+ `In order to know more about body layers and different body mods, please check out <@94553384434008064>' addition to the guide called Skin in the Game. It goes over the different female body mods, and common mistakes. For information on how to complete Material Reassignment, please check the Material Reassignment section of the guide.\n\n`
		+ `For Aleks "Skin in the Game" information: [Click Here](https://reniguide.info/#skininthegame)\n`
		+ `For instructions on material reassignment: [Click here](https://reniguide.info/#matassigninstruct)`,
	color: client.configdb.get("EMBED_NORMAL_COLOR"),
	footer: {
		"text": client.configdb.get("FRANZBOT_VERSION"),
	},
});

exports.info = {
	name: "matassign",
	category: "help",
	aliases: [
		"matassignment",
		"materialassign",
		"materialassignment",
	],
};
