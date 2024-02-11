export const answer = async client => ({
	title: `XL Environment Variables`,
	description: `You can find the post on XL environment variables `
		+ `[HERE](https://goatcorp.github.io/faq/xl_troubleshooting#q-xl-environment-variables)`,
	color: client.configdb.get("EMBED_NORMAL_COLOR"),
	footer: {
		"text": client.configdb.get("FRANZBOT_VERSION"),
	},
});

export const info = {
	name: "env",
	category: "info",
	aliases: [
		"envvar",
		"envvars",
		"environment",
		"environmentvar",
		"environmentvariable",
		"environmentvariables",
	],
};
