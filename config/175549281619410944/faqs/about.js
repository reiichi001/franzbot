export const answer = async client => ({

	title: "Project Meteor Implementation Status",
	description: "Project Meteor is **not** a replacements fora FFXIV A Realm Reborn retail subscription. This is a project for the abandoned FFXIV 1.0 client/server and is not feature complete nor is the project expected to become feature-complete any time soon. See f!faq for a brief overview of implemented features.",
	color: client.configdb.get("EMBED_NORMAL_COLOR"),
	footer: {
		"text": client.configdb.get("FRANZBOT_VERSION"),
	},
});

export const info = {
	name: "about",
	category: "info",
	aliases: [
		"basic",
		"welcome",
		"duh",
		"new",
	],
};
