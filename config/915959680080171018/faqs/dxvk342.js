exports.answer = async client => ({
	title: `Please delete the .dxvk-cache files from your prefix`,
	description: 'Due to a current regression in XOM, please delete the .dxvk-cache-base file from the prefix", \n'
    + 'with XOM selected in the File menu click open wine prefix and in the drive_c folder delete the .dxvk-cache-base file \n'
		+ 'Until the next XOM update, you may need to repeat this if you\'re unable to get the game to launch again',

	color: client.config.EMBED_NORMAL_COLOR,
	footer: {
		"text": client.config.FRANZBOT_VERSION
    },
    "image": {
      "url": "https://i.imgur.com/QvTFgSS.png",
    },
  });

exports.info = {
	name: "dxvk342",
	category: "help",
	aliases: [
		"dxvkregression",
		"dxvkhang",
		"dxvk3.4.2",
		"freeze",
	],
};
