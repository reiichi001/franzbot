// /attachmentnotice — the catch-all "where do I find the file you asked for"
// notice. Built with Discord's Components V2 layout (ContainerBuilder) rather
// than embeds: text sections are not width-constrained the way embed
// descriptions are. Each platform section pairs its guidance with its own
// screenshot (a single-item media gallery — a multi-image gallery's grid
// layout is Discord-controlled and cannot be forced side by side), and the
// shared Upload Log button row comes last (the same row the FAQ posts render,
// buttons/uploadLog.js — so the button opens the exact same handling dialog
// as the per-file FAQs).

const {
	SlashCommandBuilder, MessageFlags,
} = require('discord.js');
const {
	ContainerBuilder, MediaGalleryBuilder, MediaGalleryItemBuilder,
	SeparatorBuilder, TextDisplayBuilder,
} = require('@discordjs/builders');
const {
	buildUploadLogActionRow,
} = require('../buttons/uploadLog');

exports.commandData = () => new SlashCommandBuilder()
	.setName('attachmentnotice')
	.setDescription('Explain where to find commonly requested logs and files, with an upload button.')
	// Discord slash options have no multi-select, so one boolean per platform
	// stands in: pick any 1-3, and at least one is enforced in run().
	.addBooleanOption(o => o.setName('windows')
		.setDescription('Include the Windows log locations'))
	.addBooleanOption(o => o.setName('linux')
		.setDescription('Include the Linux / Steam Deck (XLCore) log locations'))
	.addBooleanOption(o => o.setName('mac')
		.setDescription('Include the XIV On Mac log locations'))
	.toJSON();

/**
 * The platform sections, in display order. `screenshotKey` is a config.json
 * key holding the file-browser screenshot for that platform's UI — a server
 * without the key configured just skips that platform's image.
 */
const PLATFORMS = [
	{
		title: 'Windows',
		optionName: 'windows',
		screenshotKey: 'WINDOWSEXPLORERSCREENSHOT',
		screenshotAlt: 'Windows File Explorer screenshot',
		text: '**Log files** can be found in `%appdata%\\XIVLauncher\\`\n\n'
			+ '**NOTE**: If you have file extensions hidden, these will look like `Text Document`s '
			+ 'named `output` or `dalamud` on your computer.\n\n',
	},
	{
		title: 'Linux / Steam Deck (XLCore)',
		optionName: 'linux',
		screenshotKey: 'LINUXFILEBROWSERSCREENSHOT',
		screenshotAlt: 'Linux file browser screenshot',
		text: '**Log files** can be found in `~/.xlcore/logs` by default.\n'
			+ '\n'
			+ 'You can also use `xdg-open ~/.xlcore` in your terminal of choice to open this '
			+ 'in your file browser.',
	},
	{
		title: 'XIV On Mac',
		optionName: 'mac',
		screenshotKey: 'FINDERGOTOSCREENSHOT',
		screenshotAlt: 'macOS Finder "Go to Folder" screenshot',
		text: '**Log files** can be found in `~/Library/Application Support/XIV on Mac/logs`\n'
			+ '\n'
			+ 'Use Finder\'s \'Go to Folder...\' option in the Go menu or SHIFT+CMD+G and paste '
			+ 'the above path.',
	},
];

/**
 * Map the command's boolean options onto the PLATFORMS entries. Selections
 * render in the fixed PLATFORMS order above, not the order they were ticked.
 */
function selectedPlatforms(interaction) {
	return PLATFORMS.filter(p => interaction.options.getBoolean(p.optionName, false) === true);
}

/**
 * The notice as ONE Components V2 post: intro, then one text section per
 * selected platform each followed by its own screenshot, then the Upload Log
 * button.
 */
function buildAttachmentNotice(client, platforms) {
	// The disclaimer copies the per-file FAQs' privacy wording (logxl/logd):
	// the logs carry usernames, and the modal's relay modes are the private
	// route — so the notice points there instead of DMing blindly.
	const intro = 'Need to upload a log or file to this server? Commonly requested files can be found '
		+ 'in the following locations based on your platform.\n\n'
		+ '**DISCLAIMER**: These logs could contain your ffxiv username[s] and computer username. '
		+ `If you're not comfortable posting that here, you can `
		+ 'open the file in a text editor to redact that information first, or use the Upload Log button '
		+ 'below and choose "Relay privately" to send it to a private staff channel instead.\n\n'
		+ '__Please upload files directly instead of copy/pasting their contents. Even if you have Nitro, please make sure it\'s under 10.0 MB.__';

	const container = new ContainerBuilder()
		.setAccentColor(client.configdb.get('EMBED_NORMAL_COLOR'))
		.addTextDisplayComponents(new TextDisplayBuilder().setContent(intro));

	for (const platform of platforms) {
		container
			.addSeparatorComponents(new SeparatorBuilder())
			.addTextDisplayComponents(new TextDisplayBuilder()
				.setContent(`## ${platform.title}\n${platform.text}`));

		// The platform's own screenshot directly under its guidance, so each
		// image sits with the text it illustrates.
		const screenshotUrl = client.config?.[platform.screenshotKey];
		if (screenshotUrl) {
			container.addMediaGalleryComponents(new MediaGalleryBuilder().addItems(
				new MediaGalleryItemBuilder()
					.setURL(screenshotUrl)
					.setDescription(platform.screenshotAlt)
			));
		}
	}

	container.addActionRowComponents(buildUploadLogActionRow());
	return container;
}

exports.run = async (client, interaction) => {
	try {
		const platforms = selectedPlatforms(interaction);
		// The options are individually optional, so "none ticked" is possible —
		// refuse it ephemerally rather than posting an intro and a button
		// pointing at nothing.
		if (platforms.length === 0) {
			await interaction.reply({
				content: 'Pick at least one platform (windows / linux / mac) for the notice to include.',
				ephemeral: true,
			});
			return;
		}

		// Building the container is synchronous, so there is nothing to defer
		// for — the notice posts directly. Components V2 messages carry all of
		// their content in `components`; a `content` field alongside them is
		// rejected by the API.
		await interaction.reply({
			flags: MessageFlags.IsComponentsV2,
			components: [buildAttachmentNotice(client, platforms)],
		});
	}
	catch (e) {
		// A rejected payload leaves the interaction unanswered, so a plain
		// ephemeral reply is still possible — answer it so the command never
		// dead-ends on "thinking..." or an unhandled rejection.
		console.error(e);
		await interaction.reply({
			content: 'There was a problem posting the upload notice. Please try again in a moment.',
			ephemeral: true,
		}).catch(() => null);
	}
};
