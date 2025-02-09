exports.answer = async client => ({
	title: `Experiencing tearing? Use this dxvk.conf file!`,
	description: `Screen tearing is a relationship between framerate and display refresh where two different frames are being displayed. Any settings that manipulate that relationship could cause/resolve it - frame limiting/vsync are good examples`
		+ `\n\nThe dxvk.conf file linked below will force vsync and should resolve it`
		+ `\n\nWith XIV On Mac focused hit cmd+i or go to file -> Open install location`
		+ `\n\nand place the .conf file in wineprefix/drive_c`
		+ `\n\nThis will resolve the tearing`
		+ `\n\nClick the link here to download it! -->`
		+ `[HERE](https://cdn.discordapp.com/attachments/915963559928811600/987158689574182982/dxvk.conf)`,

	color: client.configdb.get("EMBED_NORMAL_COLOR"),

	footer: {
		"text": client.configdb.get("FRANZBOT_VERSION"),
	},
});

exports.info = {
	name: "dxvkconf",
	category: "help",
	aliases: [
		"stutter",
		"dxvkconf",
		"dxvk.conf",

	],
};
