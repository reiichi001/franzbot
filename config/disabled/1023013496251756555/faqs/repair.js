exports.answer = async client => ({
	title: `Can I repair my FFXIV installation?`,
	description: `Yes, starting in XIVLauncher 6.2.0, there is a repair game function. `
		+ `To repair a broken FFXIV installation, right-click on the login button and select \`Repair Game Files\`.\n\n`
		+ `NOTE: Linux users will need to be using a prefix with Wine 7 or later. If you're on an older build,`
		+ ` please make a new prefix and migrate first.\n\n`
		+ `NOTE 2: All extra files that did not come with FFXIV will be moved to \`<gamepath>\\game\\repair_recycle\`.  `
		+ `This includes things like TexTools' mod db, GShade files and presets, graphics injectors, etc. You `
		+ `will probably need to copy/move files back out or reinstall other addons again after repairing. `
		+ `More Info: [HERE](https://goatcorp.github.io/faq/xl_troubleshooting#q-can-i-repair-my-ffxiv-installation)`,
	color: client.configdb.get("EMBED_NORMAL_COLOR"),
	image: {
		"url": "https://cdn.discordapp.com/attachments/586272168741044226/948933649296924722/unknown.png",
	},
	footer: {
		"text": client.configdb.get("FRANZBOT_VERSION"),
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
