/* eslint-disable max-len */
export const answer = async client => ({
	title: `OpCodes need to be manually updated each patch.`,
	description: `OpCode information is updated separately from Dalamud. Chances are you just need to relaunch if `
		+ `they've been updated since your last launch. \n\n More Info `
		+ `[HERE](https://goatcorp.github.io/faq/xl_troubleshooting#q-how-do-i-fix-plugins-that-rely-on-dalamud-provided-opcodes)`,
	color: client.configdb.get("EMBED_NORMAL_COLOR"),
	footer: {
		"text": client.configdb.get("FRANZBOT_VERSION"),
	},
});

export const info = {
	name: "opcode",
	category: "info",
	aliases: ["opcodes"],
};
