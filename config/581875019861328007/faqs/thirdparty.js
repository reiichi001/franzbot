import * as customRepoPluginAnswer from '../../../modules/parse/customrepoplugin.js';
export const answer = async client => customRepoPluginAnswer.replyMessage(client);

export const info = {
	name: "thirdparty",
	category: "help",
	aliases: [
		"3",
		"3p",
		"3pp",
		"3party",
		"3rdparty",
	],
};
