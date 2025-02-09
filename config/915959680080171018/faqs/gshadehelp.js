exports.answer = async client => ({
	title: `Gshade Help`,
	description: `Tips/Help setting up Gshade w/ XOM`
		+ `\n\n- Use Shift+F2 or FN+Shift+F2 on Macbook to enter Gshade settings in game`
		+ `\n\n- Certain effects are not compatible on Mac & will cause extreme performance degradation/crashing. Example: Clarity & Clarity2`
		+ `\n\n- You can verify that Gshade is installed using the Gshade Manual installer in XOM and by pressing "S" in the terminal`
		+ `\n\n- You can uninstall Gshade by using the Gshade Manual installer and by pressing "D" in the terminal`
		+ `\n\n- The XOM team provide a performance suite of presets inside the gshade preset folder under "XIV of Mac"`
		+ `\n\n If you are having issues not listed here, contact a team member in #support-gshade `,

	color: client.configdb.get("EMBED_NORMAL_COLOR"),

	footer: {
		"text": client.configdb.get("FRANZBOT_VERSION"),
	},
});

exports.info = {
	name: "gshadehelp",
	category: "help",
	aliases: [
		"gshadehelp",
		"gshelp",
		"helpgshade",

	],
};
