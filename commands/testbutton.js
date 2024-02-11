import {
	ActionRowBuilder, ButtonBuilder, ButtonStyle, ChannelType,
} from 'discord.js';
import {
	isSnowflake,
} from "discord-snowflake";

export const run = async (client, message, args) => {
	let canRelay = false;

	const row = new ActionRowBuilder();
	const buttons = [];

	const filteredServerSettings = client.perserversettings
		.filter((value, key, collection) => key.includes("serversettings") && value.has("relayChannel"))
		.sort((value, key, collection) => value.guildname);

	console.log("START DEBUG: testbutton - filteredServerSettings");
	console.log(JSON.stringify(filteredServerSettings));
	console.log("END DEBUG");

	await filteredServerSettings.every(async perserversetting => {
		let relayChannel = perserversetting.get("relayChannel");
		console.log(`Got channel ID: ${relayChannel}`);
		if (relayChannel && isSnowflake(relayChannel)) {
			canRelay = true;
			relayChannel = await client.channels.fetch(relayChannel);

			const button = new ButtonBuilder()
				.setCustomId(`RelayButton-${relayChannel.guildId}-${relayChannel.id}`)
				.setLabel(`${relayChannel.guild.name}`)
				.setStyle(ButtonStyle.Primary);

			buttons.push(button);
			row.addComponents(button);
			console.log(`Added button for ${relayChannel.guild}-${relayChannel.name}`);
		}
	});

	console.log("START DEBUG: testbutton - all buttons");
	console.log(JSON.stringify(buttons));
	console.log("END DEBUG");

	await message.channel.send({
		content: `Click a button to select a server to relay this attachment to.\n\n`
		+ `The button will work as long as the attachment is valid and accessible.`,
		components: [row],
	});
};
export const conf = {
	enabled: true,
	guildOnly: false,
	aliases: [],
};

export const help = {
	name: "testbutton",
	category: "Tool",
	description: "Franz's button tester code",
	usage: "testbutton (please don't use this",
};
