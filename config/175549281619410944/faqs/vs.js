exports.answer = async client => ({

	title: "Get Visual Studio (2019) or Build Tools",
	description: "You can download the latest version of Visual Studio or just the build tools here: <https://visualstudio.microsoft.com/downloads/>",
	color: client.config.EMBED_NORMAL_COLOR,
	footer: {
		"text": client.config.FRANZBOT_VERSION,
	},
});

exports.info = {
	name: "vs",
	category: "tools",
	aliases: [],
};
