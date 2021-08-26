const disrequire = require('disrequire');


exports.run = async (client, message, args) => {
	if (args.length < 1) {
		args = ["help"];
	}
	console.log(`GUILD: ${message.guild.id}, CHANNEL: ${message.channel.id}`);

	const configpath = `../config/${message.guild.id}/faq.js`;
	console.log(`checking for: ${configpath}`);
	try {
		console.log("Attempting to load custom config.");
		const goattriggers = require(configpath);
		// The check succeeded
		const goatresponses = await goattriggers.run(client, message, args);

		// for (const response of goatresponses) {
		if (goatresponses !== null && goatresponses.length > 0) {
			// console.log(goatresponses);
			// console.log();
			await message.channel.send({
				embeds: goatresponses,
			});
		}
		else {
			console.log("Responses = 0; No FAQs found.");
		}

		// }
		disrequire(require.resolve(configpath));
	}
	catch (error) {
		// The check failed
		console.log("No FAQs found.");
		console.error(error);

		message.channel.send({
			embeds: [
				{
					"embed": {
						"title": `This server does not contain any Franzbot FAQs`,
						"description": "How did you manage to get this?",
						"color": client.config.EMBED_ERROR_COLOR,
						"footer": {
							"text": client.config.FRANZBOT_VERSION,
						},
					},
				},
			],
		});
	}
};

exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases: [],
};

exports.help = {
	name: "faq",
	category: "System",
	description: "Displays server-specific FAQ guide for relevant servers.",
	usage: "faq <topic>",
};
