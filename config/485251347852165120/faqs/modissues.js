const modSupportAnswer = require("../embeds/modsupport");
exports.answer = async client => modSupportAnswer.replyMessage(client);

exports.info = {
	name: "modsupport",
	category: "info",
	aliases: [
		"first",
		"modissues",
		"support", // only on the penumbra server
		"initialsupport",
	],
};
