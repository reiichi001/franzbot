export const answer = async client => ({
	title: `Please wait for Dalamud and Plugin updates after a patch`,
	description: ``,
	color: client.configdb.get("EMBED_NORMAL_COLOR"),
	footer: {
		"text": client.configdb.get("FRANZBOT_VERSION"),
	},
});

export const info = {
	name: "maintenance",
	category: "info",
	aliases: ["maint"],
};
