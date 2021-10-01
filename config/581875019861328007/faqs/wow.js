/* eslint-disable max-len */
exports.answer = async client => ({
	title: `Hello [possible] [former] WoW player!`,
	description: `This is mostly a joke command because users keep typing it.\n\n`
		+ `Hello assumed WoW player! Welcome to the unofficial third party tools for FFXIV community. `
		+ `You're likely to find that a lot of things here work very differently than WoW, especially in regards to addons.\n\n`
		+ ``
		+ `To start, FFXIV does not officially allow for addons or third party tools of any kind. There are no official tools `
		+ `or APIs for modding the FFXIV client, UI, or other files. Certain addons or tools that you are used to having may not `
		+ `exist. Or may not be able to be created for FFXIV. Or they may take extraordinary effort to make.\n\n`
		+ ``
		+ `Everything we do here is technically not allowed by Square Enix and it's highly recommended you avoid publicly streaming `
		+ `with visible addons and you should absolutely not mention using them in-game unless you're looking to get reported and banned. `
		+ `You may be asking yourself "How do I do I get a FFXIV UI that perfectly matches what I had in WoW?" Our answer? You probably `
		+ `can't/won't. Thankfully, FFXIV's user interface is quite customizable in the vanilla game! And we've got some extra plugins that `
		+ `can help you feel at home.\n\n`
		+ ``
		+ `As the community development landscape in FFXIV is quite different than WoW's, we do ask you check the FAQs and search the discord `
		+ `before asking if a particular plugin or feature exists. With the growing numbers of recent WoW players coming to FFXIV, it can be `
		+ `overwhelming to receive what has been perceived as a flood of requests for making FFXIV more like WoW.`
		+ ``,
	color: client.config.EMBED_NORMAL_COLOR,
	footer: {
		"text": client.config.FRANZBOT_VERSION,
	},
});

exports.info = {
	name: "wow",
	category: "info",
	aliases: ["wowuser"],
};
