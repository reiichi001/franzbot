/* eslint-disable max-len */
exports.answer = async client => ({
	title: `This server is not a place to ask where you can find mods.`,
	description: `You are seeing this embed because you asked a question about finding (a) mod(s).\n\n`
		+ `Information about specific mods can be found in many and more places, but this server is not one of them.\n\n`
		+ `For browsing & installing more new mods, please use online repository websites such as the XIVModArchive, HelioSphere or The Glamour Dresser.\n\n`
		+ `XMA : <https://www.xivmodarchive.com/>\n`
		+ `Helio : <https://heliosphere.app/>\n`
		+ `TGD : <https://www.glamourdresser.com/>\n\n`
		+ `For finding or identifying a specific mod you struggle to find, please use the WCIF (Where Can I Find) and Catalogue discords, or ask within PKEmporium discord's Find A Mod channel.\n\n`
		+ `WCIF : <https://discord.gg/3EhAa79btN>\n`
		+ `PKE : <https://discord.gg/pkemporium>\n`
		+ `Catalogue : <https://discord.gg/thecatalogue>`,
	color: client.configdb.get("EMBED_NORMAL_COLOR"),
	image: {
		"url": "https://cdn.discordapp.com/attachments/984798693096046642/1289552815999418401/image.png",
	},
	footer: {
		"text": client.configdb.get("FRANZBOT_VERSION"),
	},
});

exports.info = {
	name: "wcif",
	category: "help",
	aliases: [],
};
