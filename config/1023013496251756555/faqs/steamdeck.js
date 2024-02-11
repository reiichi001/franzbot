/* eslint-disable max-len */
export const answer = async client => ({
	title: `How to install XIVLauncher on Steam Deck`,
	description: `A basic guide for installing XIVLauncher on Steam Deck can be found [HERE](https://goatcorp.github.io/faq/steamdeck)`,
	color: client.configdb.get("EMBED_NORMAL_COLOR"),
	footer: {
		"text": client.configdb.get("FRANZBOT_VERSION"),
	},
});

export const info = {
	name: "steamdeck",
	category: "help",
	aliases: ["deck"],
};
