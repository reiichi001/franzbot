export const answer = async client => ({
	title: `How do I change my Dalamud branch? (Please only use Dalamud Testing when required)`,
	description: `Please only enable Dalamud test builds when you intend to test Dalamud prereleases. `
		+ `They could be unstable, testing breaking features, or have bugs that the Dalamud dev team is working on. \n\n`
		+ `To switch your Dalamud branch, you can use \`/xlbranch\` from in game, or edit your \`dalamudConfig.json\` file. `
		+ `Expect crashes and failed launches on test builds and for it to ruin your raid night. \nMore Info `
		+ `[HERE](https://goatcorp.github.io/faq/dalamud_troubleshooting#q-how-do-i-turn-dalamud-staging-on-or-off)`,
	color: client.configdb.get("EMBED_NORMAL_COLOR"),
	image: {
		"url": client.configdb.get("DALAMUDBRANCH"),
	},
	footer: {
		"text": client.configdb.get("FRANZBOT_VERSION"),
	},
});

export const info = {
	name: "dalamudtesting",
	category: "info",
	aliases: [
		"dt",
		"dalamudstaging",
		"testdalamud",
		"staging",
	],
};

