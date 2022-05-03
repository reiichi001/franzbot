exports.answer = async client => ({
	"title": `Controller mapping gone wonky? Calibrate!`,
	"description": 'Due to updates in either Wine or the library we use that handles controllers", \n'
    + 'sometimes controller mapping can change with an update. to solve this: In game go to System Configuration \n'
		+ 'then go to the controller menu and click calibrate. Your controller should be back to normal after this!',

	"color": client.config.EMBED_NORMAL_COLOR,
	"footer": {
		"text": client.config.FRANZBOT_VERSION,
	},
});

exports.info = {
	name: "controller",
	category: "help",
	aliases: [
		"controller",
		"remap",
		"buttons",

	],
};
