/* eslint-disable max-len */
/* eslint-disable sonarjs/no-duplicate-string */
const {
	EmbedBuilder,
} = require('discord.js');

exports.execute = async (client, attachmentName, data) => {
	// handle the injection error blob
	const timestamp = Math.round(Date.parse(data?.When) / 1000);

	const troubleshxltingreplymessage1 = new EmbedBuilder()
		.setTitle(`${attachmentName} XLTROUBLESHOOTING parse results${client.configdb.get("DEBUGMODE") ? " - Debug Version" : ""}`)
		.setDescription("Franzbot has parsed your XIVLauncher log file. "
            + "Here's some information about the last issue found in your log file.")
		.setColor(4886754);

	// launcher info
	troubleshxltingreplymessage1
		.addFields(
			{
				name: "XIVLauncher version",
				value: data.LauncherVersion,
				inline: true,
			},
			{
				name: "XL Git Hash",
				value: data.LauncherHash,
				inline: true,
			},
			{
				name: "Official XL Release",
				value: data.Official ? "yes" : "no",
				inline: true,
			}
		);

	switch (data.Platform) {
		case 0:
			troubleshxltingreplymessage1
				.addFields({
					name: "Platform",
					value: "Windows",
				});
			break;
		case 1:
			troubleshxltingreplymessage1
				.addFields({
					name: "Platform",
					value: "Wine on Linux",
				});
			break;
		case 2:
			troubleshxltingreplymessage1
				.addFields({
					name: "Platform",
					value: "XLCore on Linux",
				});

			break;
		case 3:
			troubleshxltingreplymessage1
				.addFields({
					name: "Platform",
					value: "macOS",
				});
			break;
		default:
			break;
	}

	// launcher settings
	const troubleshxltingreplymessage2 = new EmbedBuilder()
		.setColor(4886754)
		.setTitle("General Launcher Settings")
		.addFields(
			{
				name: "Autologin",
				value: data.IsAutoLogin ? "enabled" : "disabled",
				inline: true,
			},
			/* XL doesn't supply this anymore because dx9 died.
            {
                name: "DirectX",
                value: data.IsDx11 ? "dx11" : "dx9",
                inline: true,
            },
            */
			{
				name: "DPI Aware",
				value: data.DpiAwareness ? "no" : "yes",
				inline: true,
			},
			{
				name: "Encrypted Arguments",
				value: data.EncryptArguments ? "enabled" : "disabled",
				inline: true,
			}
		)
	// .addFields({name: "Steam Integration", value: data.SteamIntegration ? "enabled" : "disabled", inline: true})
		.addFields({
			name: "UID Cache",
			value: data.IsUidCache ? "enabled" : "disabled",
			inline: true,
		});
	// dalamud injection
	troubleshxltingreplymessage2
		.addFields({
			name: "Dalamud",
			value: data.DalamudEnabled ? "enabled" : "disabled",
		});
	if (data.DalamudEnabled) {
		switch (data.DalamudLoadMethod) {
			case 0:
				troubleshxltingreplymessage2
					.addFields({
						name: "Injection Method",
						value: "Entrypoint",
						inline: true,
					});
				break;
			case 1:
				troubleshxltingreplymessage2
					.addFields({
						name: "Injection Method",
						value: "DLL Injection",
						inline: true,
					});
				break;
			case 2:
				troubleshxltingreplymessage2
					.addFields({
						name: "Injection Method",
						value: "ACL Only",
						inline: true,
					});
				break;
			default:
				break;
		}

		troubleshxltingreplymessage2
			.addFields({
				name: "Injection Delay",
				value: data.DalamudInjectionDelay ? `${data.DalamudInjectionDelay}ms` : "0ms",
				inline: true,
			});
	}

	// game version info

	const troubleshxltingreplymessage3 = new EmbedBuilder()
		.setColor(4886754)
		.setTitle("Game Version Information")
		.addFields(
			{
				name: "A Realm Reborn",
				value: data.ObservedGameVersion === "2012.01.01.0000.0000" ? "not installed" : data.ObservedGameVersion ?? "error",
				inline: true,
			},
			{
				name: "Heavensward",
				value: data.ObservedEx1Version === "2012.01.01.0000.0000" ? "not installed" : data.ObservedEx1Version ?? "error",
				inline: true,
			},
			{
				name: "Stormblood",
				value: data.ObservedEx2Version === "2012.01.01.0000.0000" ? "not installed" : data.ObservedEx2Version ?? "error",
				inline: true,
			},
			{
				name: "Shadowbringers",
				value: data.ObservedEx3Version === "2012.01.01.0000.0000" ? "not installed" : data.ObservedEx3Version ?? "error",
				inline: true,
			},
			{
				name: "Endwalker",
				value: data.ObservedEx4Version === "2012.01.01.0000.0000" ? "not installed" : data.ObservedEx4Version ?? "error",
				inline: true,
			},
			{
				name: "Dawntrail",
				value: data.ObservedEx4Version === "2012.01.01.0000.0000" ? "not installed" : data.ObservedEx5Version ?? "error",
				inline: true,
			},
			{
				name: "BCK files match",
				value: data.BckMatch ? "yes" : "no",
			}
		);
	switch (data.IndexIntegrity) {
		case 0:
			troubleshxltingreplymessage3
				.addFields({
					name: "Index Integrity",
					value: "Failed",
				});
			break;

		case 1:
			troubleshxltingreplymessage3
				.addFields({
					name: "Index Integrity",
					value: "Exception",
				});
			break;

		case 2:
			troubleshxltingreplymessage3
				.addFields({
					name: "Index Integrity",
					value: "NoGame",
				});
			break;

		case 3:
			troubleshxltingreplymessage3
				.addFields({
					name: "Index Integrity",
					value: "ReferenceNotFound",
				});
			break;

		case 4:
			troubleshxltingreplymessage3
				.addFields({
					name: "Index Integrity",
					value: "ReferenceFetchFailure",
				});
			break;

		case 5:
			troubleshxltingreplymessage3
				.addFields({
					name: "Index Integrity",
					value: "Success",
				});
			break;

		default:
			break;
	}

	troubleshxltingreplymessage1.addFields(
		{
			name: "Log Timestamp",
			value: `${data?.When}\n<t:${timestamp}:F>`,
		}
	);

	troubleshxltingreplymessage3
		.setFooter({
			text: client.configdb.get("FRANZBOT_VERSION"),
		});

	return [
		troubleshxltingreplymessage1,
		troubleshxltingreplymessage2,
		troubleshxltingreplymessage3,
	];
};
