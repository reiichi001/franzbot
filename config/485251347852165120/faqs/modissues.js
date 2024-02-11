import * as modSupportAnswer from '../embeds/modsupport.js';
export const answer = async client => modSupportAnswer.replyMessage(client);

export const info = {
	name: "modsupport",
	category: "info",
	aliases: [
		"first",
		"modissues",
		"support", // only on the penumbra server
		"initialsupport",
	],
};
