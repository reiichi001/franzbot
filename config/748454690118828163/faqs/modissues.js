const modSupportAnswer = require("../embeds/modsupport");
exports.answer = async client => modSupportAnswer.replyMessage(client, "modsupport");

exports.info = {
	name: "modsupport",
	category: "info",
	aliases: [
		"modissues",
		"support",
	],
};
