
exports.answer = async client => ({
	title: `Modern Nvidia GPU Troubleshooting`,
	description: ``
		+ `### Nvidia RTX 40/50-series Cards\n`
		+ `Recent RTX GPUs have a feature called "Smooth Motion" that can cause assorted issues.\n`
		+ `- Crashing the game on launch\n`
		+ `- Hanging on a black screen when the game launches\n`
		+ `- Distorted or Flickering Dalamud/Plugin UI Windows\n`
		+ `\n`
		+ `It's recommended to turn this feature off for FFXIV using the Nvidia App. `
		+ `We are looking into methods to get it to work correctly.`
		+ ``,
	color: client.configdb.get("EMBED_NORMAL_COLOR"),
	footer: {
		"text": client.configdb.get("FRANZBOT_VERSION"),
	},
});

exports.info = {
	name: "smoothmotion",
	category: "help",
	aliases: [
		"rtx40",
		"rtx50",
		"nvidiaapp",
	],
};
