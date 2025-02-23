exports.answer = async client => ({
	title: `Prefer IPv4 over IPv6`,
	description: `Do XIVLauncher and/or Dalamud hang due to bad routing? `
		+ `Does your plugin installer list take forever to refresh? `
		+ `~~Are your eyeballs not happy?~~\n\n`
		+ ``
		+ `You could be running into an issue where your computer and ISP are fighting `
		+ `because your computer will prefer IPv6 when available whethere or not your ISP `
		+ `properly supports it.`
		+ `-# (Shame on them after World IPv6 Launch day in 2012)\n\n`
		+ ``
		+ `### Windows Instructions\n`
		+ `<https://learn.microsoft.com/en-US/troubleshoot/windows-server/networking/configure-ipv6-in-windows>\n\n`
		+ `**Enable via registy cmd**`
		+ `\`\`\``
		+ `reg add "HKEY_LOCAL_MACHINE\\SYSTEM\\CurrentControlSet\\Services\Tcpip6\\Parameters" /v DisabledComponents /t REG_DWORD /d 32 /f`
		+ `\`\`\`\n`
		+ `**Disable via registry cmd**`
		+ `\`\`\``
		+ `reg delete "HKEY_LOCAL_MACHINE\\SYSTEM\\CurrentControlSet\\Services\\Tcpip6\\Parameters" /v DisabledComponents /f`
		+ `\`\`\`\n`
		+ `### Linux Instructions\n`
		+ `Please follow the steps on this site.\n`
		+ `<https://weblog.lkiesow.de/20220311-make-linux-prefer-ipv4.html>`,
	color: client.configdb.get("EMBED_NORMAL_COLOR"),
	footer: {
		"text": client.configdb.get("FRANZBOT_VERSION"),
	},
});

exports.info = {
	name: "preferipv4",
	category: "help",
	aliases: [
		"ipv4",
		"ipv6",
		"happyeyeballs",
	],
};
