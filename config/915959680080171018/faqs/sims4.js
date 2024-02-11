export const answer = async client => ({
	title: `Trying to use GShade with The Sims 4?`,
	description: `To use GShade with The Sims 4 you must:  `
        + `\n\nInstall (and purchase if your trial is over) [Crossover](https://www.codeweavers.com/crossover)`
        + `\n\nand install the WINDOWS version of the game.`
        + `\n\nThe Mac version cannot and will never work!`
				+ `\n\nThe wineprefix is located in $HOME/Library/Application Support/Crossover/Bottles/<sims4bottlename>/drive_c`
        + `\n\nPlease don't ask for support if you're using the Mac version, it's not possible as GShade is Windows/wine only. `,


	color: client.configdb.get("EMBED_NORMAL_COLOR"),

	footer: {
		"text": client.configdb.get("FRANZBOT_VERSION"),
	},
});

export const info = {
	name: "sims4",
	category: "info",
	aliases: [
		"simsgshade",
		"sims",


	],
};
