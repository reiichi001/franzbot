exports.answer = async client => ({
	title: `How do I find the Official FFXIV for macOS Bottle?`,
	description: `The Official FFXIV for macOS applicantion is really just a  CrossOver Bottle (aka Wine prefix)`
		+ `which is a special folder that contains all programs and configuration `
		+ `used to run FFXIV. It is based on an old version of CrossOver.`
		+ `\n\nThe Official FFXIV bottle can be found in `
		+ `\`~/Library/Application Support/FINAL FANTASY XIV ONLINE/Bottles/published_Final_Fantasy/\``
		// + `\n\nFor more information, see `
		// + `[HERE](https://www.xivmac.com/faq#q-prefix-folder?)`
		+ "",
	color: client.config.EMBED_NORMAL_COLOR,
	image: {
		"url": client.config.FINDERGOTOSCREENSHOT,
	},
	footer: {
		"text": client.config.FRANZBOT_VERSION,
	},
});

exports.info = {
	name: "prefixstock",
	category: "help",
	aliases: [
		"stockprefix",
		"stockbottle",
		"bottlestock",
		"stockfolder",
		"officialprefix",
		"officialbottle",
		"bottleofficial",
		"officialfolder",
	],
};
