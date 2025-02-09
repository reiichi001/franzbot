exports.answer = async client => ({
	title: `Injection delay for RivaTuner/RTSS`,
	description: `Please follow steps listed in the FAQ `
		+ `[HERE](https://goatcorp.github.io/faq/xl_troubleshooting#q-how-to-set-an-injection-delay-in-rivatunerrtss)`,
	color: client.configdb.get("EMBED_NORMAL_COLOR"),
	footer: {
		"text": client.configdb.get("FRANZBOT_VERSION"),
	},
});

exports.info = {
	name: "rtssdelay",
	category: "help",
	aliases: [],
};
