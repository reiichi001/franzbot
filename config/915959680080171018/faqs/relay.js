exports.answer = async client => ({
	title: `Is relay turned on?`,
	description: `XIV on Mac application does not support iCloud Relay. If you are getting errors installing`
		+ `or patching errors, please turn off iCloud relay. Restart your Mac and relaunch our application afterwards.`
	color: client.config.EMBED_NORMAL_COLOR,
	footer: {
		"text": client.config.FRANZBOT_VERSION,
	},
});

exports.info = {
	name: "relay",
	category: "help",
	aliases: [
		"relay",
		"icloud",
		"icloudrelay",
	],
};
