/* eslint-disable no-return-await */
/* eslint-disable consistent-return */

import {
	hydrate,
} from '../modules/hydrate.js';

export const run = async (client, interaction) => { // eslint-disable-line no-unused-vars
	try {
		await hydrate(client, interaction.channel);
	}
	catch (e) {
		console.log(e);
		return await interaction.editReply(`There was a problem with your request.\n\`\`\`${e.message}\`\`\``);
	}
};

export const commandData = () => ({
	name: "hydrate",
	description: "Remember to drink some water.",
	options: [],
	defaultPermission: true,
});

// Set this to false if you want it to be global.
export const guildOnly = true;
