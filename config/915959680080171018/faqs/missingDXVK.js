exports.answer = async client => ({
	title: `Please Install DXVK from the XOM app's Install Menu`,
	description: `the wine.dll error your saying is due to DXVK not having installed properly. \n`
    + 'With the XIV on Mac app focused, the top toolbar will have a menu called "install", \n'
    + 'click that menu then click DXVK and the problem will be resolved',

	color: client.config.EMBED_NORMAL_COLOR,
	footer: {
		"text": client.config.FRANZBOT_VERSION
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
