export const answer = async client => ({
	title: `WTFast Configuration for XIVLauncher`,
	description: `You can find details on how to configure WTFast to work with XIVLauncher `
		+ `[HERE](https://goatcorp.github.io/faq/xl_troubleshooting#q-wtfast-config)`,
	color: client.configdb.get("EMBED_NORMAL_COLOR"),
	footer: {
		"text": client.configdb.get("FRANZBOT_VERSION"),
	},
});

export const info = {
	name: "wtfast",
	category: "help",
	aliases: [],
};
