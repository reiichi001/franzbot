const disrequire = require('disrequire');

exports.getResponse = async (client, guild, faq) => {
	console.log(`GUILD: ${guild.id}`);

	const configpath = `../config/${guild.id}/faq.js`;
	console.log(`checking for: ${configpath}`);
	try {
		console.log("Attempting to load custom config.");
		const goattriggers = require(configpath);
		// The check succeeded
		const goatresponses = await goattriggers.run(client, [faq]);

		disrequire(require.resolve(configpath));

		return goatresponses;
	}
	catch (error) {
		// The check failed
		console.log("No FAQs found.");

		return [{
			"embed": {
				"title": `No FAQ available...`,
				"description": "This server does not contain any Franzbot FAQs",
				"color": client.config.EMBED_ERROR_COLOR,
				"footer": {
					"text": client.config.FRANZBOT_VERSION,
				},
			},
		}];
	}
}

exports.run = async (client, message, args) => {
	if (args.length < 1) {
		args = ["help"];
	}
	console.log(`GUILD: ${message.guild.id}, CHANNEL: ${message.channel.id}`);

	var responses = await this.getResponse(client, message.guild, args);

	for (const response of responses) {
		await message.channel.send(response);
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
