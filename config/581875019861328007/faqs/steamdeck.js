/* eslint-disable max-len */
exports.answer = async client => ({
	title: `How to install XIVLauncher on Steam Deck`,
	description: `A basic guide for installing XIVLauncher on Steam Deck can be found [HERE](https://goatcorp.github.io/faq/steamdeck)`,
	color: client.config.EMBED_NORMAL_COLOR,
	footer: {
		"text": client.config.FRANZBOT_VERSION,
	},
});

exports.info = {
	name: "steamdeck",
	category: "help",
	aliases: ["deck"],
};
