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

		for (const response of goatresponses) {
			await message.channel.send(response);
		}
		disrequire(require.resolve(configpath));
	}
	catch (error) {
		// The check failed
		console.log("No FAQs found.");

		message.channel.send({
			"embed": {
				"title": `This server does not contain any Franzbot FAQs`,
				"color": client.config.EMBED_ERROR_COLOR,
				"footer": {
					"text": client.config.FRANZBOT_VERSION,
				},
			},
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
