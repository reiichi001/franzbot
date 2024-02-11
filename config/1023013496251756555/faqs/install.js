/* eslint-disable max-len */
export const answer = async client => ({
	title: `How to install XIVLauncher, Dalamud, or Plugins?`,
	description: `For the Most up to date practices, please consult <https://goatcorp.github.io/> or <#866796481754562571>`,
	color: client.configdb.get("EMBED_NORMAL_COLOR"),
	footer: {
		"text": client.configdb.get("FRANZBOT_VERSION"),
	},
	fields: [
		{
			name: "XIVLauncher",
			value: "You can get the latest installer from GitHub [here](https://github.com/goatcorp/FFXIVQuickLauncher/releases/latest)",
		},
		{
			name: "Dalamud",
			value: "You do not need to manually install Dalamud. Please make sure that the `in-game addon` feature is enabled in XIVLauncher.\n\n"
				+ "You should then see a message in your chatbox that Dalamud has loaded. If not, please proceed to <#584827243617058816> for troubleshooting.",
		},
		{
			name: "Plugins",
			value: "Open the system menu in-game by pressing escape, and then select `Dalamud Plugins` from there.\n\n"
				+ "You can also type `/xlplugins` as a chat command too.",
		},
		{
			name: "Third Party Plugins",
			value: "We are unable to provide support for third party plugins or other third party tools here. Please consult the developers of those plugins/tools instead.",
		},
	],
});

export const info = {
	name: "install",
	category: "info",
	aliases: [],
};
