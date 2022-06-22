exports.answer = async client => ({
	title: `Tearing after upgrading XOM to 4.0? Use this dxvk.conf file!`,
	description: `A change in XOM 4.0 had the unintended affect of causing graphics tearing on some machines`
        + `\n\nThe dxvk.conf file linked below will resolve it`
        + `\n\nWith XIV On Mac focused hit cmd+i or go to file -> Open install location`
        + `\n\nand place the .conf file in wineprefix/drive_c`
				+ `\n\nThis will resolve the tearing`
        + `\n\nClick the link below to download it! `
        + `[HERE](https://cdn.discordapp.com/attachments/915963559928811600/987158689574182982/dxvk.conf)`,

	color: client.config.EMBED_NORMAL_COLOR,

	footer: {
		"text": client.config.FRANZBOT_VERSION,
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
