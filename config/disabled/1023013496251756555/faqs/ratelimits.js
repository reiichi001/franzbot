exports.answer = async client => ({
	title: `GitHub ratelimits will affect XIVLauncher`,
	description: `If XIVLauncher and/or Gshade are failing to check for updates and `
		+ `you know it's not your antivirus, you may be rate-limited by GitHub. \n\nSee the FAQ for more details `
		+ `[HERE](https://goatcorp.github.io/faq/xl_troubleshooting#github-rate-limits)`,
	color: client.configdb.get("EMBED_NORMAL_COLOR"),
	footer: {
		"text": client.configdb.get("FRANZBOT_VERSION"),
	},
});

exports.info = {
	name: "ratelimits",
	category: "info",
	aliases: [
		"rl",
		"rate",
		"ratelimit",
		"githubratelimit",
		"githubratelimits",
		"ghrl",
		"ghratelimit",
		"ghratelimits",
	],
};

