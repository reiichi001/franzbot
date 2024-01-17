exports.answer = async client => ({
	title: `Can I repair my FFXIV installation?`,
	description: `To repair a broken FFXIV installation, right-click on the login button or use the advanced options button and select \`Repair Game Files\`.\n\n`
		+ `NOTE: Linux users will need to be using XIVLauncher.Core. If you're using a different launcher setup,`
		+ ` please migrate first.\n\n`
		+ `NOTE 2: All extra files that did not come with FFXIV will be moved to \`<gamepath>\\game\\repair_recycler\`.  `
		+ `This includes things like TexTools' mod db, Reshade files and presets, graphics injectors, etc. You `
		+ `will probably need to copy/move files back out or reinstall other addons again after repairing. `
		+ `More Info: [HERE](https://goatcorp.github.io/faq/xl_troubleshooting#q-can-i-repair-my-ffxiv-installation)`,
	color: client.config.EMBED_NORMAL_COLOR,
	image: {
		"url": "https://media.discordapp.net/attachments/687530726756712478/1196969123616403456/image.png",
	},
	footer: {
		"text": client.config.FRANZBOT_VERSION,
	},
});

exports.info = {
	name: "repair",
	category: "help",
	aliases: [
		"deleteffxiv",
		"repairffxiv",
		"deletegame",
		"repairgame",
	],
};
