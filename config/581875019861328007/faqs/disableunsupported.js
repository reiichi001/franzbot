/* eslint-disable max-len */
exports.answer = async client => ({
	title: `Please launch without unsupported plugins.`,
	description: `If you're trying to disable custom repository plugins, but your `
		+ `game is crashing before you can access the plugin installer, continue reading!\n\n`
		+ `When you right-click the "Log in" button in XIVLauncher, there is an option to start without custom repository plugins.\n\n`
		+ `If your launcher logs in automatically and you don't see this dialog, hold down the shift key when starting XIVLauncher to disable autologin.`,
	color: client.configdb.get("EMBED_NORMAL_COLOR"),
	image: {
		"url": "https://media.discordapp.net/attachments/687530726756712478/1196967126230118430/image.png",
	},
	footer: {
		"text": client.configdb.get("FRANZBOT_VERSION"),
	},
});

exports.info = {
	name: "disableunsupported",
	category: "help",
	aliases: [
		"dunsup",
		"fastcrash",
		"startno3pp",
	],
};

