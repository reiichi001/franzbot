/* eslint-disable max-len */
exports.answer = async client => ({
	title: `Combined Usage of Penumbra and Textools is Unsupported`,
	description: `Usage of Penumbra and Textools to load mods simultaneously is unsupported. `
		+ `While you may have not had issues with it in the past, it generally will cause serious issues down the line. \n\n`
		+ `This occurs because Textools by design changes your indexes to the modded file. `
		+ `This corrupts your indexes and damages your game. Penumbra depends on these indexes to not be corrupted in order to function. \n\n`
		+ `Essentially, if we are assisting you in troubleshooting an issue, and you provide that you use both, `
		+ `we would be unable to assist any further until you repair your game using the XIV Launcher Repair tool, `
		+ `or download index backups and Start Over in Textools.\n\n`
		+ `See \`${client.config.prefix}repair\` for more info.`,
	color: client.config.EMBED_NORMAL_COLOR,
	image: {
		"url": "https://cdn.discordapp.com/attachments/586272168741044226/948933649296924722/unknown.png",
	},
	footer: {
		"text": client.config.FRANZBOT_VERSION,
	},
});

exports.info = {
	name: "combineduse",
	category: "help",
	aliases: [
		"textools",
		"penumbraandtextools",
		"alsotextools",
	],
};
