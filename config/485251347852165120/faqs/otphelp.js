exports.answer = async client => ({
	title: `XL-Auth / OTP Troubleshooting`,
	description: `Please check the following for OTP-related issues\n\n`
		+ `Are you using one of the [supported authenticator methods](<https://goatcorp.github.io/faq/mobile_otp>)? `
		+ `(XL-Auth or one of the legacy shortcuts.\n\n`
		+ `1. Basic "XIVLauncher is working" test (run this on your computer)\n`
		+ `<http://localhost:4646/ffxivlauncher/>\n\n`
		+ `2. The "is your firewall blocking XIVLauncher" test. (Try it on your computer first, then on your phone)\n`
		+ `<http://computer_ip_here:4646/ffxivlauncher/>\n\n`
		+ `3. Try a manual OTP submission\n`
		+ `<http://computer_ip_here:4646/ffxivlauncher/OTP-NUMBER-GOES-HERE>\n\n`
		+ ``
		+ `**ADVANCED TROUBLESHOOTING**\n`
		+ `-# NOTE: Please don't do these unless directed by a support team member.\n\n`
		+ `\`\`\`net stop winnat\n`
		+ `netsh int ipv4 add excludedportrange protocol=tcp startport=4646 numberofports=1\n`
		+ `net start winnat\n\`\`\``,
	color: client.configdb.get("EMBED_NORMAL_COLOR"),
	footer: {
		"text": client.configdb.get("FRANZBOT_VERSION"),
	},
});

exports.info = {
	name: "otphelp",
	category: "help",
	aliases: [
		"otp",
		"xlauth",
		"xl-auth",
		"xlauthenticator",
		"xl-authenticator",
	],
};
