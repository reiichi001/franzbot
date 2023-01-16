/* eslint-disable max-len */
exports.answer = async client => ({
	title: `Please reset your PC`,
	description: `Unfortunately, Avira has broken the SSL certificates in your Windows install.\n` + 
  `We've had many users come in with this issue, and the only solution is to use Windows' "Reset Your PC" feature.\n\n`+
  `Please uninstall Avira, then follow the instructions `
		+ `[HERE](https://support.microsoft.com/en-us/windows/recovery-options-in-windows-31ce2444-7de3-818c-d626-e3b5a3024da5#bkmk_reset_pc)` +
   `. You can safely use the "Keep My Files" setting.`,
	color: client.config.EMBED_NORMAL_COLOR,
	footer: {
		"text": client.config.FRANZBOT_VERSION,
	},
});

exports.info = {
	name: "avira",
	category: "help",
	aliases: [
  "ssl",
	],
};
