exports.answer = async client => ({
	title: `Please don't ask to ask a question`,
	description: `Please don't ask to ask a question. Please just ask the question directly.\n\n`
		+ ``
		+ `If in doubt or if you're unsure where best to direct your question, we'll help you out! `
		+ `The channel names and categories are also your friend! Please check that you're in the appropriate `
		+ `section before posting a question so that we can ensure that the right people see it and that `
		+ `we can better track repeat questions/issues/requests.`,
	color: client.configdb.get("EMBED_NORMAL_COLOR"),
	footer: {
		"text": client.configdb.get("FRANZBOT_VERSION"),
	},
});

exports.info = {
	name: "ask",
	category: "info",
	aliases: [],
};
