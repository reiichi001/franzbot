exports.answer = async client => ({
	title: `Dalamud requires these redistributables`,
	description: `Please make sure you've installed or updated VS2017-2026 packages from May 2024 (14.40) or later.\n\n`
		+ `You can get the latest one here: <https://aka.ms/vc14/vc_redist.x64.exe>\n\n`
		+ `More info [HERE](https://goatcorp.github.io/faq/xl_troubleshooting#q-how-can-i-fix-crashes-on-startup)`,
	color: client.configdb.get("EMBED_NORMAL_COLOR"),
	footer: {
		"text": client.configdb.get("FRANZBOT_VERSION"),
	},
});

exports.info = {
	name: "redist",
	category: "help",
	aliases: [
		"redists",
		"runtime",
		"runtimes",
		"redistributable",
		"redistributables",
		"vcredist",
		"vcrun",
		"vcrun2015",
		"vcrun2017",
		"vcrun2019",
		"vcrun2022",
		"vcrun2026",
		"vcruntime",
	],
};
