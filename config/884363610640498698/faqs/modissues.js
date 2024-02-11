import modSupportAnswer from '../embeds/modsupport.js';
export const answer = async client => modSupportAnswer.replyMessage(client);

export const info = {
	name: "modsupport",
	category: "info",
	aliases: [
		"modissues",
		"support",
	],
};
