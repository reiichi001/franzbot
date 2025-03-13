exports.answer = async client => ({
	title: `FFXIV Error 16a`,
	description: `FFXIV Error 16a means that the game config files are not readable. `
		+ `There are multple causes for this issue.\n\n`
		+ ``
		+ `### File Permission Issues\n`
		+ `**If you've been running FFXIV as admin, DON'T!\n\n`
		+ ``
		+ `Running FFXIV as admin can result in broken file permissions due to `
		+ `a bug in FFXIV that will replace file and folder ownership. This `
		+ `is not easily reversible. You will be responsible for fixing this on your own.\n\n`
		+ ``
		+ `### OneDrive sync issues\n`
		+ `OneDrive may be trying to make your game config "online only," `
		+ `which is not something that FFXIV knows how to handle correctly. `
		+ `This can cause the game to crash.\n\n`
		+ ``
		+ `Please configure your FFXIV config folder to be available offline.\n`
		+ `1. Go to your Documents folder.\n`
		+ `2. Right-click the \`My Games\` folder.\n`
		+ `3. Select the option for "Always keep on this device" or "Make available offline."\n`
		+ `4. Wait a few minutes in case OneDrive has to redownload the files.\n`
		+ `5. Try launching the game.`,
	color: client.configdb.get("EMBED_NORMAL_COLOR"),
	image: {
		"url": "https://cdn.discordapp.com/attachments/687530726756712478/1349530670031962172/image.png",
	},
	footer: {
		"text": client.configdb.get("FRANZBOT_VERSION"),
	},
});

exports.info = {
	name: "error16a",
	category: "help",
	aliases: [
		"16a",
		"16aerror",
		"onedrive",
	],
};
