/* eslint-disable max-len */
export const replyMessage = async client => ({
	title: `**Having mod issues?**`,
	description: `_Do **not** include any character names in screenshots._\n\n`
		+ `*Please provide the following:*\n`
		+ `> **What is your issue?**\n`
		+ `>   - More details the better.\n`
		+ `>   -  Provide clear screenshots.`
		+ `>   - Keep screenshots as SFW as possible. Spoiler anything risqué and refrain from posting explicit mods. `
		+ `Mild nudity from body mod previews are not an issue if it is spoilered.\n`
		+ `> \n`
		+ `> **What mods are you using?**\n`
		+ `>   - Provide links of possible.\n`
		+ `>   - Provide screenshots of the mod's settings.\n`
		+ `>   - Include what body mods you are using.\n`
		+ `> \n`
		+ `> **What gear are you wearing?**\n`
		+ `\n`
		+ `*We are unable to offer support on IVCS.*\n`
		+ `\n`
		+ `*Common issues below*:\n`
		+ `\n`
		+ `**Are no mods showing on your character?**\n`
		+ `> - Make sure your mods are enabled in a collection that is active on your character. `
		+ `Collections are assigned in the collections tab.\n`
		+ `> - Make sure mods are enabled on the main settings page.\n`
		+ `\n`
		+ `**Is your character skin invisible?**\n`
		+ `> - Make sure **all** options on your body mod is enabled.\n`
		+ `> - If skin on Bibo+ gear mods looks disfigured, go to \`Edit Mod\` > \`Update Bibo Material\`.\n`
		+ `\n`
		+ `**UI/VFX/SFX/BGM mods not working?**\n`
		+ `> - Make sure these are enabled in the Base Collection. `
		+ `Some might need to be in your character collection as well.\n`
		+ `\n`
		+ `Also include your Penumbra support info from the main settings tab.`,
	image: {
		"url": "https://cdn.discordapp.com/attachments/984798693096046642/1014744616815304794/unknown.png",
	},
	color: client.configdb.get("EMBED_NORMAL_COLOR"),
	footer: {
		"text": client.configdb.get("FRANZBOT_VERSION"),
	},
});
