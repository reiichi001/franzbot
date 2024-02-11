/* eslint-disable max-len */
export const answer = async client => ({
	title: `How do I uninstall XIVLauncher?`,
	description: `Instructions can be found [HERE](https://goatcorp.github.io/faq/xl_troubleshooting#q-how-do-i-uninstall-xiv-launcher)`,
	color: client.configdb.get("EMBED_NORMAL_COLOR"),
	footer: {
		"text": client.configdb.get("FRANZBOT_VERSION"),
	},
});

export const info = {
	name: "uninstall",
	category: "help",
	aliases: [
		"removexl",
		"reinstall",
		"cleaninstall",
	],
};
