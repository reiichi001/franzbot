const customRepoPluginAnswer = require("../../../modules/parse/customrepoplugin");
exports.answer = async client => customRepoPluginAnswer.replyMessage(client);

exports.info = {
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
