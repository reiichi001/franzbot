/* eslint-disable max-len */
export const answer = async client => ({
	title: `Migrating FFXIV or XIVLauncher?`,
	description: `The main FFXIV installation folder is entirely portable. You can freely move/copy it `
		+ `between different locations as long as your computer has all redistributables needed to run it.\n\n`
		+ `XIVLauncher on the other hand is *technically* portable, but we recommend only copying plugin configuration `
		+ `across different computers as the launcher/Dalamud settings should stay machine-specific and you should `
		+ `**NOT** copy your installed plugins. (Users who know enough should know better)\n\n`
		+ `The Linux FAQ post for this can be found `
		+ `[HERE](https://goatcorp.github.io/faq/xl_troubleshooting#q-how-do-i-migrate-ffxiv-andor-xivlauncher-files-from-an-old-wine-prefix-to-a-new-one-linux)`
		+ `\nThe Windows FAQ post for this can be found `
		+ `[HERE](https://goatcorp.github.io/faq/xl_troubleshooting#q-how-do-i-migrate-ffxiv-andor-xivlauncher-files-from-an-old-installation-to-a-new-one-windows)`,
	color: client.configdb.get("EMBED_NORMAL_COLOR"),
	footer: {
		"text": client.configdb.get("FRANZBOT_VERSION"),
	},
});

export const info = {
	name: "migrate",
	category: "help",
	aliases: [
		"migration",
		"oldlinux",
		"oldwindows",
		"linuxmove",
		"windowsmove",
		"linuxmigrate",
		"windowsmigrate",
		"linuxmigration",
		"windowsmigration",
		"linuxconfig",
		"windowsconfig",
		"linuxsettings",
		"windowssettings",
		"linuxfiles",
		"windowsfiles",
		"migratelinux",
		"migratewindows",
	],
};
