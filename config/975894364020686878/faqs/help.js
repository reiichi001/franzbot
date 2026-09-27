exports.answer = async (client, guild) => {
	// CATEGORIES: logs, help, info

	const infoList = [
		...client.perserversettings?.get(guild.id)?.filter(x => x.info.category === "info")
			.keys(),
	]
		.sort()
		.toString()
		.replaceAll(',', ' ');

	const logsList = [
		...client.perserversettings?.get(guild.id)?.filter(x => x.info.category === "logs")
			.keys(),
	]
		.sort()
		.toString()
		.replaceAll(',', ' ');

	const helpList = [
		...client.perserversettings?.get(guild.id)?.filter(x => x.info.category === "help")
			.keys(),
	]
		.sort()
		.toString()
		.replaceAll(',', ' ');

	return {
		title: "Franzbot FAQ",
		description: `Supported FAQ commands listed below. Type \`${client.config.prefix}faq <topic>\` to display the content.`,
		color: client.configdb.get("EMBED_NORMAL_COLOR"),
		footer: {
			"text": client.configdb.get("FRANZBOT_VERSION"),
		},
		fields: [
			{
				name: "logs",
				value: logsList,
			},
			{
				name: "info",
				value: infoList,
			},
			{
				name: "help",
				value: helpList,
			},
		],
	};
};

exports.info = {
	name: "help",
	category: "info",
	aliases: ["helpme"],
};
