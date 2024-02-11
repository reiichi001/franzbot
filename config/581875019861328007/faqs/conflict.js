/* eslint-disable max-len */
export const answer = async client => ({
	title: `Plugin GUI does not load or Dalamud crashes on game start`,
	description: `Please check if you have other programs modifying FFXIV. More details `
		+ `[HERE](https://goatcorp.github.io/faq/xl_troubleshooting#q-how-come-the-in-game-addon-dalamud-doesnt-work-andor-plugins-dont-display)`,
	color: client.configdb.get("EMBED_NORMAL_COLOR"),
	footer: {
		"text": client.configdb.get("FRANZBOT_VERSION"),
	},
});

export const info = {
	name: "conflict",
	category: "debug",
	aliases: [
		"conflictapp",
		"afterburner",
		"msiafterburner",
		"rivatuner",
		"rtss",
		"mactype",
		"hookfail",
		"specialk",
		"ghub",
		"obs",
		"fraps",
	],
};
