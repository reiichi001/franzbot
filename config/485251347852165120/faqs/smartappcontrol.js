exports.answer = async client => ({
	title: `Turn off Smart App Control`,
	description: `Smart App Control is a newer feature introduced on Windows 10 `
		+ `and is on by default for any brand new Windows install as of Windows 11.\n\n`
		+ `Sometimes it can lead to blocking the XIVLauncher program/installer by asking you `
		+ `to "Search for an app in the Store" to run XIVLauncher. (Which makes no sense given it's `
		+ `its own application!)\n\n`
		+ `**How to disable**\n`
		+ `1. Open Windows Security\n`
		+ `2. Go to "App & browser control\n`
		+ `3. Open "Smart App Controll settings"\n`
		+ `4. Switch it from "On" to "Evaluation" or "Off"\n\n`
		+ `NOTE: You cannot turn this feature back on afterwards. Don't do this on a work machine or other `
		+ `corporate/enterprise equipment or on a device you do not own/manage!`,
	color: client.configdb.get("EMBED_NORMAL_COLOR"),
	image: {
		"url": "https://cdn.discordapp.com/attachments/687530726756712478/1343066496712183860/e0dCR.png",
	},
	footer: {
		"text": client.configdb.get("FRANZBOT_VERSION"),
	},
});

exports.info = {
	name: "smartappcontrol",
	category: "help",
	aliases: [
		"sac",
		"smartapp",
	],
};
