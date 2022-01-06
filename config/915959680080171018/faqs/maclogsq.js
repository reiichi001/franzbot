exports.answer = async client => ({
	title: `Please send us your SquirrelSetup.log file (mac edition)`,
	description: `Please send us your **SquirrelSetup.log** log file from `
		+ `\`<bottle>/drive_c/users/$USER/Local Settings/SquirrelTemp/\``
		+ ` in this channel, so we can look into the problem!`
		+ `\n\nIt's best to just upload/attach the file if you can!`
		+ `__Please upload the file directly. Even if you have Nitro, please make sure it's under 5.0 MB.__`,
	color: client.config.EMBED_NORMAL_COLOR,
	image: {
		"url": client.config.FINDERGOTOSCREENSHOT,
	},
	footer: {
		"text": client.config.FRANZBOT_VERSION,
	},
});

exports.info = {
	name: "maclogsq",
	category: "logs",
	aliases: [
		"logsq",
		"maclogsq",
		"maclogsquirrel",
		"logsqmac",
		"squirrelogmac",
		"macoslogsq",
		"macoslogsquirrel",
		"logossqmac",
		"squirrelogmacos",
	],
};
