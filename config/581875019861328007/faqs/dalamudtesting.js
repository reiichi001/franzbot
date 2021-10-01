exports.answer = async client => ({
	title: `Only use Dalamud Testing when required`,
	description: `Please only enable Dalamud test builds when absolutely needed. It's not secret hidden features. `
		+ `Expect crashes and failed launches and for it to ruin your raid night. More Info `
		+ `[HERE](https://goatcorp.github.io/faq/dalamud_troubleshooting#q-how-do-i-turn-dalamud-staging-on-or-off)`,
	color: client.config.EMBED_NORMAL_COLOR,
	footer: {
		"text": client.config.FRANZBOT_VERSION,
	},
});

exports.info = {
	name: "dalamudtesting",
	category: "info",
	aliases: [
		"dt",
		"dalamudstaging",
		"testdalamud",
		"staging",
	],
};

