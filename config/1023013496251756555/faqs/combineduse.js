import {
	EmbedBuilder,
} from 'discord.js';
/* eslint-disable max-len */
export const answer = async client => new EmbedBuilder()
	.setTitle("Combined Usage of Penumbra and Textools is Unsupported")
	.setDescription(`Usage of Penumbra and Textools to load mods simultaneously is unsupported. `
			+ `While you may have not had issues with it in the past, it generally will cause serious issues down the line. \n\n`
			+ `This occurs because Textools by design changes your indexes to the modded file. `
			+ `This corrupts your indexes and damages your game. Penumbra depends on these indexes to not be corrupted in order to function. \n\n`
			+ `Essentially, if we are assisting you in troubleshooting an issue, and you provide that you use both, `
			+ `we would be unable to assist any further until you repair your game using the XIVLauncher Repair tool, `
			+ `or download index backups and Start Over in Textools.\n\n`
			+ `See \`${client.configdb.get("prefix")}faq repair\` for more info.`)
	.setColor(client.configdb.get("EMBED_NORMAL_COLOR"))
	.setImage("https://cdn.discordapp.com/attachments/586272168741044226/948933649296924722/unknown.png")
	.setFooter({
		text: client.configdb.get("FRANZBOT_VERSION"),
	});

export const info = {
	name: "combineduse",
	category: "help",
	aliases: [
		"textools",
		"penumbraandtextools",
		"alsotextools",
	],
};
