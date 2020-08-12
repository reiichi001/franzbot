exports.run = (client, message, args) => {
	const ZuTriggers = [
		client.config.GUILDID_TESTING, // franzbot testing - general
		client.config.GUILDID_ZU, // Zu - general
	];
	if (!ZuTriggers.includes(message.guild.id)) {
		return message.reply("\u200Bthis command doesn't work here.")
			.then(message.delete({
				timeout: 5000,
				reason: 'Cleaning up uneeded message',
			}));
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
