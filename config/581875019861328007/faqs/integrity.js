/* eslint-disable max-len */
exports.answer = async client => ({
	title: `XIVLauncher integrity check`,
	description: `The integrity check feature supports up to patch 5.45 Hotfix.\n\n`
		+ `To run the check, open XIVLauncher, click the settings cog ⚙️, and select the Game tab. It will have a button.\n\n`
		+ `You'll find the integrity report in your \`%appdata%\\xivlauncher\` folder. Please upload it for review.`
		+ `__If your client has been modded via TexTools, the integrity check will always fail.__`,
	image: {
		"url": "https://cdn.discordapp.com/attachments/687530726756712478/828741457862197278/HvFDn.png",
	},
	color: client.config.EMBED_NORMAL_COLOR,
	footer: {
		"text": client.config.FRANZBOT_VERSION,
	},
});

exports.info = {
	name: "integrity",
	category: "info",
	aliases: ["integritycheck"],
};
