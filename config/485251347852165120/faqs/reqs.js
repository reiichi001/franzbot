/* eslint-disable max-len */
export const answer = async client => ({
	title: `XIV on Mac Application Requirements`,
	description: `The XIV on Mac Application currently requires macOS Catalina 10.15 or later, although it is recommended to be on macOS Montery 12.0 or later for the best experience. Please check out <https://www.xivmac.com/compatibility-database> for more information.`
		+ ``
		+ `\n\nPlease visit our website to see additional hardware reqs & fps estimates, see `
		+ `[HERE](https://www.xivmac.com/faq#q-xiv-on-mac-app-reqs)`,
	fields: [
		{
			name: "Intel Macs",
			value: "AMD Radeon GPUs are required. Intel graphics cannot be used.",
		},
		{
			name: "Apple Silicon",
			value: "M1 or better",
		},
	],
	color: client.configdb.get("EMBED_NORMAL_COLOR"),
	footer: {
		"text": client.configdb.get("FRANZBOT_VERSION"),
	},
});

export const info = {
	name: "reqs",
	category: "help",
	aliases: [
		"reqs",
		"req",
		"requirements",
	],
};
