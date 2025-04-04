exports.answer = async client => ({
	"title": `Please Install DXVK from the XOM app's Install Menu`,
	"description": 'With the XIV on Mac app focused, click Install and then DXVK in the top menu.", \n'
		+ 'The DXVK install is silent \n',

	"color": client.config.EMBED_NORMAL_COLOR,
	"footer": {
		"text": client.configdb.get("FRANZBOT_VERSION"),
	},
	"image": {
		"url": "https://i.imgur.com/9hEPTZf.png",
	},
});

exports.info = {
	name: "missingDXVK",
	category: "help",
	aliases: [
		"missingdxvk",
		"dxvk",
		"dxvkm",
		"winedll",
	],
};
