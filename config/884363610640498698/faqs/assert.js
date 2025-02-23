exports.answer = async client => ({
	title: `ImGui assertion failed FAQ`,
	description: `ImGui asserts should only get enabled if you have loaded a devplugin. `
		+ `(Pointed directly to a DLL file in Dalamud Settings -> Experimental). `
		+ `This feature is not not intended for users and shouldn't be used outside of plugin development.\n\n`
		+ ``
		+ `When asserts are enabled, any plugin that breaks asserts can trigger the window, `
		+ `not just the devplugin that enabled the feature.\n\n`
		+ ``
		+ `This is a developer-oriented feature.`,
	color: client.configdb.get("EMBED_NORMAL_COLOR"),
	image: {
		"url": "https://cdn.discordapp.com/attachments/687530726756712478/1342982232997888030/image.png",
	},
	footer: {
		"text": client.configdb.get("FRANZBOT_VERSION"),
	},
});

exports.info = {
	name: "assert",
	category: "help",
	aliases: [
		"asserts",
		"imguiassert",
		"imguiasserts",
	],
};
