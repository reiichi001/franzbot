/* eslint-disable consistent-return */
import * as logger from "../modules/logger.js";
import {
	EmbedBuilder,
} from 'discord.js';

export const run = async (client, message, args) => {
	if (args.length < 1) {
		args = ["help"];
	}
	console.log(`GUILD: ${message.guild.id}, CHANNEL: ${message.channel.id}, ARGS: ${args}`);

	// lets load the new FAQs first.
	/*
		Categories: logs, help, info
	*/
	try {
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
			}
			*/

			if (Array.isArray(response)) {
				return message.channel.send({
					embeds: response,
				});
			}

			return message.channel.send({
				embeds: [response],
			});
		}

		logger.error("Server-specific FAQ not found. Using fallback");


		message.channel.send({
			embeds: [
				new EmbedBuilder()
					.setTitle(`Faq not found for '${args[0]}'`)
					.setDescription(`Please check your spelling or use `
						+ `\`${client.configdb.get("prefix")}faq help\` for a list of all FAQs.`)
					.setColor(client.configdb.get("EMBED_ERROR_COLOR"))
					.setFooter({
						text: client.configdb.get("FRANZBOT_VERSION"),
					}),
			],
		});
	}
	catch (error) {
		// The check failed
		console.log("No FAQs found.");
		console.error(error);

		message.channel.send({
			embeds: [
				new EmbedBuilder()
					.setTitle(`This server does not seem to contain any Franzbot FAQs`)
					.setDescription(`How did you manage to get this?`)
					.setColor(client.configdb.get("EMBED_ERROR_COLOR"))
					.setFooter({
						text: client.configdb.get("FRANZBOT_VERSION"),
					}),
			],
		});
	}
};

export const conf = {
	enabled: true,
	guildOnly: false,
	aliases: [],
};

export const help = {
	name: "faq",
	category: "System",
	description: "Displays server-specific FAQ guide for relevant servers.",
	usage: "faq <topic>",
};
