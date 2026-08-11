exports.run = (client, message, args) => {
	const ZuTriggers = [
		client.configdb.get("GUILDID_TESTING"), // franzbot testing - general
		client.configdb.get("GUILDID_ZU"), // Zu - general
	];
	if (!ZuTriggers.includes(message.guild.id)) {
		return message.reply("\u200Bthis command doesn't work here.")
			.then(
				setTimeout(() => message.delete(), 5000)
			);
	}

	const [
		atype,
		...messages
	] = args;
	let acttype = "PLAYING";

	switch (atype.toLowerCase()) {
		case "listening":
			acttype = "LISTENING";
			break;
		case "watching":
			acttype = "WATCHING";
			break;
		default:
			acttype = "PLAYING";
			break;
	}


	return client.user.setActivity(
		messages.join(" "),
		{
			type: acttype,
		}
	);
};

exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases: [],
};

exports.help = {
	name: "setactivity",
	category: "Admin",
	description: "Modifies Franzbot's activity presence. Will eventually be locked down.",
	usage: "setactivity watching/playing action text",
};
