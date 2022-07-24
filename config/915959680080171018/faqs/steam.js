exports.answer = async client => ({
	title: `What are the Steam options for?`,
	description: `For detail on Steam Integration and Steam Service Account, see `
		+ `[HERE](https://goatcorp.github.io/faq/xl_troubleshooting#q-why-do-people-keep-asking-about-steam-so-much)`,
	color: client.config.EMBED_NORMAL_COLOR,
	footer: {
		"text": client.config.FRANZBOT_VERSION,
	},
});

exports.info = {
	name: "steam",
	category: "info",
	aliases: [],
};
