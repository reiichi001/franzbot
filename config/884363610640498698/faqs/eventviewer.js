exports.answer = async client => ({
	title: `Please check the Windows Event Viewer`,
	description: `Please check the Windows Event Viewer to determine the cause of your FFXIV crash.`
		+ `\n\nThis can be found in \`Windows Logs\` -> \`Application\`.`
		+ `\n\nYou can also run a search for \`ffxiv_dx11.exe\` in the "Find" action on the right-side panel.`
		+ ` **Please send us all of the inner text in the General tab**. You can copy and paste it into a `
		+ `\`\`\`fancy code block\`\`\` if you want, but a plain message is also fine.`
		+ ` You can also copy it to a text file named \`event.log\` and DM it to Franzbot for pricacy.`
		+ `\n\nNOTE: You may have multiple crash events. Please let us know if your recent Event IDs are `
		+ `stated as some for of CLR/.Net crash or if they're a native FFXIV error such as c000005.`,
	color: client.configdb.get("EMBED_NORMAL_COLOR"),
	image: {
		"url": "https://cdn.discordapp.com/attachments/687530726756712478/842492553533194240/unknown.png",
	},
	footer: {
		"text": client.configdb.get("FRANZBOT_VERSION"),
	},
});

exports.info = {
	name: "eventviewer",
	category: "logs",
	aliases: ["eventlog"],
};
