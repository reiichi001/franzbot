/* eslint-disable consistent-return */
const disrequire = require('disrequire');


exports.run = async (client, message, args) => {
	if (args.length < 1) {
		args = ["help"];
	}
	console.log(`GUILD: ${message.guild.id}, CHANNEL: ${message.channel.id}, ARGS: ${args}`);

	// lets load the new FAQs first.
	/*
		Categories: logs, help, info
	*/
	const squashedargs = args.join("").toLowerCase();
	const faq = client.perserversettings?.get(message.guild.id)?.get(squashedargs)
		|| client.perserversettings?.get(message.guild.id)?.get(client.perserveraliases.get(squashedargs));
	if (faq) {
		console.log(`Answer FAQ for ${client.perserveraliases.get(squashedargs) || squashedargs}`);

		let response = null;
		if (squashedargs === "help") {
			response = await faq.answer(client, message.guild);
		}
		else {
			response = await faq.answer(client);
		}
		if (response?.content || response?.files) {
			return message.channel.send({
				content: response.content ?? null,
				embeds: [response.embed] ?? null,
				files: response.files ?? [],
			});
		}
		/*
		if (response) {
			return message.channel.send({
				embeds: [response],
			});
		}*/

		if (Array.isArray(response)) {
			message.channel.send({
				embeds: response,
			});
		}
		else {
			message.channel.send({
				embeds: [response],
			});
		}
	}
	else {
		client.logger.error("New FAQ not found. Using fallback");
	}

	const configpath = `../config/${message.guild.id}/faq.js`;
	console.log(`checking for: ${configpath}`);
	try {
		console.log("Attempting to load fallback custom config.");
		const goattriggers = require(configpath);
		// The check succeeded
		const goatresponses = await goattriggers.run(client, message, args);

		// for (const response of goatresponses) {
		if (goatresponses?.length > 0) {
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
