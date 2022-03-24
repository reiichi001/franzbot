/* eslint-disable max-len */
const {
	MessageAttachment,
} = require("discord.js");

exports.answer = async client => {
	const script = `#!/bin/bash\n\n`
		+ `cp -n "/Applications/XIV on Mac.app/Contents/Resources/wine/lib/libMoltenVK.dylib" "/Applications/XIV on Mac.app/Contents/Resources/wine/lib/libMoltenVK.dylib.bak"\n`
		+ `curl -LO https://media.codeweavers.com/pub/crossover/cxmac/demo/crossover-20.0.4.zip\n`
		+ `unzip -qquo crossover-20.0.4.zip\n`
		+ `cp "CrossOver.app/Contents/SharedSupport/CrossOver/lib64/libMoltenVK.dylib" "/Applications/XIV on Mac.app/Contents/Resources/wine/lib/libMoltenVK.dylib"\n`
		+ `rm -r CrossOver.app\n`
		+ `rm crossover-20.0.4.zip`;

	return {
		content: null,
		embed: {
			title: `Fix for RX500 series GPUs`,
			description: `Please use the attached script to downgrade MoltenVK to an earlier version for better performance on AMD 500 series GPUs.\n\n`
				+ `NOTE: You may need to re-apply this when XIV On Mac updates.\n\n`
				+ `Here is a copy of the script if you'd prefer to run the commands yourself.\n`
				+ ` \`\`\`bash\n${script}\`\`\``,
			color: client.config.EMBED_NORMAL_COLOR,
			footer: {
				"text": client.config.FRANZBOT_VERSION,
			},
		},
		files: [new MessageAttachment(Buffer.from(script, 'utf-8'), 'get_cx20004_dylib.command')],
	};
};

exports.info = {
	name: "fixamd500",
	category: "help",
	aliases: [
		"amd500",
		"fix500",
		"rx500",
		"500",
	],
};
