

const {
	EmbedBuilder,
} = require('discord.js');
const nagMessage = require('../customrepoplugin.js');

exports.execute = async (client, message, attachmentName, data) => {
	let foundCustomRepoPluginInstalled = false;
	let anyCustomRepoPluginsLoaded = false;
	const replyEmbeds = [];

	// make fancy embed and return
	const replymessage2 = new EmbedBuilder()
		.setTitle(`${attachmentName} TROUBLESHOOTING parse results${client.configdb.get("DEBUGMODE") ? " - Debug Version" : ""}`)
		.setDescription("Franzbot has parsed your Dalamud log file. "
            + "Here's some information about the plugins that were loaded.")
		.setColor(13580863)
		.setFooter({
			text:
                `DalamudVersion: ${data.DalamudVersion}\n`
                + `DalamudGitHash: ${data.DalamudGitHash}\n`
                + `GameVersion: ${data.GameVersion}`,
		});

	let plugintext = ">>> ";
	let overflowed = false;

	if (data?.LoadedPlugins?.length == 0) {
		replymessage2
			.addFields({
				name: "Installed plugins",
				value: "No plugins installed according to troubleshooting blob.",
			});
	}
	else if (data.LoadedPlugins.length == 1) {
		plugintext += `**${data.LoadedPlugins[0].Name}**`
            + ` - ${data.LoadedPlugins[0].AssemblyVersion}\n`;

		replymessage2
			.addFields(
				{
					name: "Installed plugin",
					value: plugintext,
				}
			);
	}
	else {
		const pluginlist = data.LoadedPlugins
			.sort((a, b) => (a.Name.toLowerCase() > b.Name.toLowerCase() ? 1 : -1));

		const officialpluginsources = [
			null,
			"",
			"OFFICIAL",
			"https://kamori.goats.dev/Plugin/PluginMaster",
		];

		const devpluginsources = [
			null,
			"",
		];

		const officialplugins = pluginlist.filter(plugin => officialpluginsources.includes(plugin.InstalledFromUrl));
		// const devplugins = pluginlist.filter(plugin => devpluginsources.includes(plugin.InstalledFromUrl));
		const unofficialplugins = pluginlist.filter(plugin => !officialpluginsources.includes(plugin.InstalledFromUrl));

		// List all officially supported plugins
		officialplugins.forEach(plugin => {
			let prefix = "";
			let suffix = "\n";

			if (data.PluginStates && plugin.InternalName in data.PluginStates) {
				const state = data.PluginStates[plugin.InternalName];
				const everStartedLoading = data.EverStartedLoadingPlugins?.includes(plugin.InternalName);
				let startedLoadingSuffix = "";
				if (state === "Loaded") {
					prefix = "✅ ";
				}
				else if (everStartedLoading) {
					prefix += "⚠️ ";
					startedLoadingSuffix = ", but started loading";
				}
				else {
					prefix += "❌ ";
				}
				suffix = ` _(${state}${startedLoadingSuffix})_\n`;
			}

			plugintext += prefix;
			plugintext += plugin.Disabled
				? `~~**${plugin.Name}** - ${plugin.AssemblyVersion}~~`
				: `**${plugin.Name}** - ${plugin.AssemblyVersion}`;
			plugintext += suffix;

			if (plugintext.length > 900) {
				replymessage2
					.addFields(
						{
							name: overflowed ? "Officially supported plugins continued..." : "Installed officially supported plugins",
							value: plugintext,
						}
					);
				plugintext = ">>> ";
				overflowed = true;
			}
		});

		if (overflowed) {
			replymessage2
				.addFields({
					name: "Officially supported plugins continued....",
					value: plugintext,
				});
		}
		else {
			replymessage2
				.addFields({
					name: "Last seen installed official plugins",
					value: plugintext,
				});
		}

		// List all the unsupported plugins
		plugintext = ">>> ";
		overflowed = false;

		if (unofficialplugins.length >= 1) {
			foundCustomRepoPluginInstalled = true;

			unofficialplugins.forEach(plugin => {
				let prefix = "";
				let suffix = "\n";

				if (data.PluginStates && plugin.InternalName in data.PluginStates) {
					const state = data.PluginStates[plugin.InternalName];
					const everStartedLoading = data.EverStartedLoadingPlugins?.includes(plugin.InternalName);
					let startedLoadingSuffix = "";
					if (state === "Loaded") {
						prefix = "✅ ";
						anyCustomRepoPluginsLoaded = true;
					}
					else if (everStartedLoading) {
						prefix += "⚠️ ";
						startedLoadingSuffix = ", but started loading";
						anyCustomRepoPluginsLoaded = true;
					}
					else {
						prefix += "❌ ";
					}
					suffix = ` _(${state}${startedLoadingSuffix})_\n`;
				}

				plugintext += prefix;
				plugintext += plugin.Disabled
					? `~~**${plugin.Name}** - ${plugin.AssemblyVersion}~~`
					: `**${plugin.Name}** - ${plugin.AssemblyVersion}`;
				plugintext += suffix;

				if (plugintext.length > 900) {
					replymessage2
						.addFields(
							{
								name: overflowed ? "Unsupported plugins continued..." : "Installed custom repo / unsupported plugins",
								value: plugintext,
							}
						);
					plugintext = ">>> ";
					overflowed = true;
				}
			});

			if (overflowed) {
				replymessage2
					.addFields(
						{
							name: "Unsupported plugins continued....",
							value: plugintext,
						}
					);
			}
			else {
				replymessage2
					.addFields(
						{
							name: "Last seen installed custom repo / unsupported plugins",
							value: plugintext,
						}
					);
			}
		}
	}
	//
	replymessage2
		.addFields(
			{
				name: "Dalamud Testing",
				value: data.BetaKey?.length > 1 ? data.BetaKey : "null",
				inline: true,
			},
			{
				name: "Plugin Testing",
				value: data.DoPluginTest ? "Yes" : "No",
				inline: true,
			},
			{
				name: "Has custom repos",
				value: data.HasThirdRepo ? "Yes" : "No",
			},
			{
				name: "Loading all API levels",
				value: data.LoadAllApiLevels ? "Yes" : "No",
				inline: true,
			},
			{
				name: "ForcedMinHook",
				value: data.ForcedMinHook ? "Yes" : "No",
				inline: true,
			},
			{
				name: "InterfaceLoaded",
				value: data.InterfaceLoaded ? "Yes" : "No",
				inline: true,
			}
		);

	if (data.EverStartedLoadingPlugins) {
		replymessage2
			.addFields(
				{
					name: "Custom repo plugins enabled",
					value: anyCustomRepoPluginsLoaded ? "Yes" : "No",
				}
			);
	}

	/*
    replymessage2.addFields(
        {
            name: "Loggy",
            value: `Read this on [Loggy](${loggyUrl})`,
        }
    );
    */

	replyEmbeds.push(replymessage2);

	if (foundCustomRepoPluginInstalled
        && anyCustomRepoPluginsLoaded
        && (message.guildId === client.configdb.get("GUILDID_GOAT")
            || message.guildId === client.configdb.get("GUILDID_XIVONMAC")
            || message.guildId === client.configdb.get("GUILDID_TESTING"))
	) {
		replyEmbeds.push(nagMessage.replyMessage(client));
	}

	return replyEmbeds;
};
