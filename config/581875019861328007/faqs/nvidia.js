
exports.answer = async client => ({
	title: `Nvidia GPU Troubleshooting`,
	description: ``
		+ `### Nvidia GTX 800/900/1000-series Cards\n`
		+ `As of Nvidia RTX Driver Release 590 (December 2025), `
		+ `Nvidia has marked GTX 800/900/1000 series GPUs as legacy. `
		+ `They will not receive driver updates or support past Nvidia Driver `
		+ `Release 580 versions.\n`
		+ `\n`
		+ ``
		+ `**GeForce Security Update Driver 582.28** has known issues that can game crashes.\n`
		+ `\n`
		+ `It is recommended to roll back to a prior version, such as [**Game Ready Driver 581.80**]`
		+ `(https://www.nvidia.com/en-us/geforce/drivers/results/257496/).\n`
		+ `\n`
		+ `[Display Driver Uninstaller (DDU)](https://www.wagnardsoft.com/display-driver-uninstaller-ddu) `
		+ `can be used to remove the current driver if you are having trouble rolling back.\n`
		+ `\n`
		+ `### Nvidia RTX 40/50-series Cards\n`
		+ `Recent RTX GPUs have a feature called "Smooth Motion" that cause cause assorted issues.\n`
		+ `- Crashing the game on launch\n`
		+ `- Hanging on a black screen when the game launches\n`
		+ `- Distored Dalamud/Plugin UI Windows\n`
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
	name: "nvidia",
	category: "help",
	aliases: [
		"gtx800",
		"gtx900",
		"gtx980",
		"gtx1000",
		"gtx1050",
		"gtx1060",
		"gtx1070",
		"gtx1080",
		"rtx40",
		"rtx50",
		"smoothmotion",
		"legacynvidia",
		"nvidialegacy",
		"nvidiadriver",
	],
};
