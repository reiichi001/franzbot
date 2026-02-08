
exports.answer = async client => ({
	title: `Legacy Nvidia GPU Troubleshooting`,
	description: ``
		+ `### Nvidia GTX 800/900/1000-series Cards\n`
		+ `As of Nvidia RTX Driver Release 590 (December 2025), `
		+ `Nvidia has marked GTX 800/900/1000 series GPUs as legacy. `
		+ `They will not receive driver updates or support past Nvidia Driver `
		+ `Release 580 versions.\n`
		+ `\n`
		+ ``
		+ `**GeForce Security Update Driver 582.28** has known issues that can cause game crashes.\n`
		+ `\n`
		+ `It is recommended to roll back to a prior version, such as [**Game Ready Driver 581.80**]`
		+ `(https://www.nvidia.com/en-us/geforce/drivers/results/257496/).\n`
		+ `\n`
		+ `[Display Driver Uninstaller (DDU)](https://www.wagnardsoft.com/display-driver-uninstaller-ddu) `
		+ `can be used to remove the current driver if you are having trouble rolling back.\n`
		+ ``,
	color: client.configdb.get("EMBED_NORMAL_COLOR"),
	footer: {
		"text": client.configdb.get("FRANZBOT_VERSION"),
	},
});

exports.info = {
	name: "legacynvidia",
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
		"nvidia800",
		"nvidia900",
		"nvidia980",
		"nvidia10",
		"nvidia1000",
		"nvidia1050",
		"nvidia1060",
		"nvidia1070",
		"nvidia1080",
		"nvidialegacy",
	],
};
