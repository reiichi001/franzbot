/* eslint-disable max-len */
export const answer = async client => ({
	title: `Please reset your PC`,
	description: `Unfortunately, Avira has broken the SSL certificates in your Windows install.\n`
  + `We've had many users come in with this issue, and the only solution is to use Windows' "Reset Your PC" feature.\n\n`
  + `Please uninstall Avira, then follow the instructions `
		+ `[HERE](https://support.microsoft.com/en-us/windows/recovery-options-in-windows-31ce2444-7de3-818c-d626-e3b5a3024da5#bkmk_reset_pc)`
   + `. You can safely use the "Keep My Files" setting. **This will uninstall all programs on your computer. Please make note of any programs you need before performing these steps.**`,
	color: client.configdb.get("EMBED_NORMAL_COLOR"),
	footer: {
		"text": client.configdb.get("FRANZBOT_VERSION"),
	},
});

export const info = {
	name: "avira",
	category: "help",
	aliases: ["ssl"],
};
