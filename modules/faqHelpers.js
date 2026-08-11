const {
	existsSync,
	readdirSync,
} = require("fs");

/**
 * Get all available FAQ servers from config directories.
 * Reads directly from disk (not in in-memory client state) so it works
 * even before per-server settings are fully loaded.
 * @param {import('discord.js').Client} client - The bot client
 * @returns {{ key: string, name: string, faqCount: number }[]}
 */
function getAvailableServers(client) {
	const serverKeys = readdirSync("./config", {
		withFileTypes: true,
	})
		.filter(folder => folder.isDirectory())
		.map(dir => dir.name);

	return serverKeys
		.filter(key => key !== "disabled")
		.map(key => {
			const faqDir = `./config/${key}/faqs/`;
			if (!existsSync(faqDir)) {
				return null;
			}
			const faqFiles = readdirSync(faqDir).filter(file => file.endsWith(".js"));
			let name = key; // default to server ID

			// Guild names live on the `${key}-serversettings` JSONdb (app.js:178),
			// NOT the bare dirname key, which holds the FAQ Collection. Reading the
			// bare key made settings.get("guildname") always undefined → snowflake fallback.
			const settings = client.perserversettings?.get(`${key}-serversettings`);
			const storedName = settings?.get("guildname");
			if (key === "directmessage") {
				name = "Direct Messages";
			}
			else if (storedName) {
				name = storedName;
			}
			else {
				// Config folder added after boot, or guild renamed. Fetch + backfill
				// so the real name shows from now on. Fire-and-forget — stays sync.
				client.guilds.fetch(key)
					.then(guild => settings?.set("guildname", guild.name))
					.catch(err => client.logger.debug(`Couldn't fetch guild name for ${key}: ${err}`));
			}

			return {
				key,
				name,
				faqCount: faqFiles.length,
			};
		})
		.filter(Boolean); // Remove entries without FAQ folders
}

/**
 * Get all available topic choices for a given server key.
 * Returns an array of { name: string, value: � } for use with Discord autocomplete.
 * Includes both the FAQ name and all aliases so users can search by either.
 * @param {import('discord.js').Client} client - The bot client
 * @param {string} serverKey - The server key from config directory (e.g., "175549281619410944")
 * @returns {{ name: string, value: string }[]}
 */
function getTopicsForServer(client, serverKey) {
	const faqCollection = client.perserversettings?.get(serverKey);
	if (!faqCollection) {
		client.logger.debug(`No FAQ collection found for server key: ${serverKey}`);
		return [];
	}

	const choices = [];
	// Build a Set of already-added values to avoid duplicates (name === alias edge case)
	const addedValues = new Set();

	faqCollection.forEach((faqEntry, faqName) => {
		// Add the FAQ name itself
		if (!addedValues.has(faqName)) {
			choices.push({
				name: faqName,
				value: faqName,
			});
			addedValues.add(faqName);
		}

		// Add all aliases for this FAQ
		faqEntry.info.aliases.forEach(alias => {
			if (!addedValues.has(alias)) {
				choices.push({
					name: alias,
					value: alias,
				});
				addedValues.add(alias);
			}
		});
	});

	return choices;
}

/**
 * Resolve a topic string (typed by user) to the actual FAQ entry.
 * Matches against both the FAQ name and all its aliases.
 * @param {import('discord.js').Client} client - The bot client
 * @param {string} serverKey - The server key
 * @param {string} topicStr - User's typed topic (matches against name or alias)
 * @returns {{ faq: object, resolvedName: string } | null}
 */
function resolveTopic(client, serverKey, topicStr) {
	const faqCollection = client.perserversettings?.get(serverKey);
	if (!faqCollection) {
		return null;
	}

	const squashed = topicStr.toLowerCase().trim();

	// First try direct name match
	const direct = faqCollection.get(squashed);
	if (direct) {
		return {
			faq: direct,
			resolvedName: squashed,
		};
	}

	// Then try aliases via the global alias map
	const aliasTarget = client.perserveraliases?.get(squashed);
	if (aliasTarget && aliasTarget !== squashed) {
		const aliasedFaq = faqCollection.get(aliasTarget);
		if (aliasedFaq) {
			return {
				faq: aliasedFaq,
				resolvedName: aliasTarget,
			};
		}
	}

	return null;
}

module.exports = {
	getAvailableServers,
	getTopicsForServer,
	resolveTopic,
};
