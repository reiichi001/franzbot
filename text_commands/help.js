/*
The HELP command is used to display every command's name and description
to the user, so that he may see what commands are available. The help
command is also filtered by level, so if a user does not have access to
a command, it is not shown to them. If a command name is given with the
help command, its extended help is shown.

PRTFM NOTE - the level parameter was never actually used. Don't trust the docs, kids.
*/

// Discord rejects messages over 2000 characters. Stay well below that so the
// command list keeps a margin for anything added around it.
const CODE_FENCE_START = "```asciidoc\n";
const CODE_FENCE_END = "\n```";
// The fences count toward the message, so leave room for them up front.
const MAX_CONTENT = 1750 - CODE_FENCE_START.length - CODE_FENCE_END.length;

// Pack whole sections into messages first, so a category is never split across
// two posts unless the category itself is over the limit. Only then fall back
// to its individual lines.
function packSections(header, sections) {
	const messages = [];
	let current = header;

	const flush = () => {
		messages.push(current.trimEnd());
		current = "";
	};

	const append = line => {
		const addition = current ? `\n${line}` : line;
		if (current && current.length + addition.length > MAX_CONTENT) {
			flush();
			current = line;
			return;
		}
		current += addition;
	};

	sections.forEach(section => {
		if (current && current.length + section.length > MAX_CONTENT) {
			flush();
		}

		if (section.length <= MAX_CONTENT) {
			current += section;
			return;
		}

		section.split("\n").forEach(append);
	});

	if (current.trim()) {
		flush();
	}

	return messages;
}

exports.run = async (client, message, args) => {
	// Commands are invoked by mentioning the bot; there is no text prefix.
	const prefix = `@${client.user.username}`;

	// Servers that carry FAQ files answer `help` with their FAQ index instead of
	// the text-command list; the `help` FAQ entry lists the supported topics.
	const helpFaq = client.perserversettings?.get(message.guild?.id)?.get("help");
	if (helpFaq) {
		const response = await helpFaq.answer(client, message.guild);
		if (response?.content || response?.files) {
			const payload = {
				content: response.content ?? null,
				files: response.files ?? [],
			};
			if (response.embed) {
				payload.embeds = [response.embed];
			}
			return message.channel.send(payload);
		}
		return message.channel.send({
			embeds: [response],
		});
	}

	// If no specific command is called, show all filtered commands.
	if (args[0]) {
		// Show individual command's help.
		let command = args[0];
		if (client.commands.has(command)) {
			command = client.commands.get(command);
			return message.channel.send(
				`= ${command.help.name} = \n${command.help.description}\n`
				+ `usage:: ${command.help.usage}\n`
				+ `aliases:: ${command.conf.aliases.join(", ")}\n= ${command.help.name} =`
			);
		}
		return message.channel.send("Unrecognised command");
	}

	// Filter all commands by which are available for the user's level, using the <Collection>.filter() method.
	const myCommands = client.commands;

	// Here we have to get the command names only, and we use that array to get the longest name.
	// This make the help commands "aligned" in the output.
	const commandNames = [...myCommands.keys()];
	const longest = commandNames.reduce((long, str) => Math.max(long, str.length), 0);

	// Build one block per category first, so section headings stay with their
	// commands when the list is split across messages.
	const sections = [];
	let currentCategory = "";
	let section = "";
	// eslint-disable-next-line max-len
	const sorted = [...myCommands.values()].sort((p, c) => (p.help.category > c.help.category ? 1 : p.help.name > c.help.name && p.help.category === c.help.category ? 1 : -1));
	sorted.forEach(c => {
		const cat = c.help.category.toProperCase();
		if (currentCategory !== cat) {
			if (section) {
				sections.push(section);
			}
			section = `\u200b\n== ${cat} ==\n`;
			currentCategory = cat;
		}
		section += `${prefix} ${c.help.name}`
			+ `${" ".repeat(longest - c.help.name.length)} :: ${c.help.description}\n`;
	});
	if (section) {
		sections.push(section);
	}

	const header = `\u200b= Command List =\n\n[Use ${prefix} help <commandname> for details]\n`;
	const messages = packSections(header, sections);

	// Send in order; each chunk is already under Discord's limit. The asciidoc
	// code fence gives the list its monospace alignment back (v14 dropped the
	// old `code` send option).
	let last;
	for (const chunk of messages) {
		last = await message.channel.send(`${CODE_FENCE_START}${chunk}${CODE_FENCE_END}`);
	}
	return last;
};

exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases: [
		"h",
		"halp",
		"explain",
	],
};

exports.help = {
	name: "help",
	category: "System",
	description: "Displays all the available commands for your permission level.",
	usage: "help [command]",
};
