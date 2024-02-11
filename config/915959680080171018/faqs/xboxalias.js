/* eslint-disable max-len */
export const answer = async client => ({
	title: `Proper alias for xbox series X controllers`,
	description: `replace line 89 under \`<GamePad Settings>\` in \`Documents/My Games/Final Fantasy XIV - A Realm Reborn/FFXIV.cfg\` `
		+ `with: \`Alias    {34,35,32,33,39,38,36,37,43,42,40,41,9,7,6,8,4,45,2,5,47,3,0,1}\`" `,

	color: client.configdb.get("EMBED_NORMAL_COLOR"),
	footer: {
		"text": client.configdb.get("FRANZBOT_VERSION"),
	},
});

export const info = {
	name: "xboxalias",
	category: "info",
	aliases: [
		"alias",
		"xboxalias",
		"xbox",
		"Xbone",
	],
};
