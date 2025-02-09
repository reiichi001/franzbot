function sleep(ms) {
	return new Promise(resolve => {
		setTimeout(resolve, ms);
	});
}

const allowedRoles = [
	"Admin",
	"Administrator",
	"intern",
	"Officer",
	"Operator",
	"moderator",
	"team",
	"support",
	"support team",
	// "test",
	// "botters",
	"XIV on Mac Team",
	"Contributor",
	"XIVLauncher Developer",
];

exports.run = async (client, message, args) => { // eslint-disable-line no-unused-vars
	if (message.sender.roles.cache.find(r => allowedRoles.includes(r.name))) {
		const goatplace = await client.guilds.fetch('581875019861328007');
		const fetchedMembers = await goatplace.members.fetch();
		const ccrole = await goatplace.roles.cache.get('671258996962754570');
		const ccextrarole = await goatplace.roles.fetch('1241859754423488562');

		console.log(`Trying to work with role: ${ccrole.name}`);

		// message.channel.send(`Trying to work with role: ${guildmembersrole}`);

		const roleMembers = fetchedMembers.filter(member => member.roles.cache.has(ccrole.id));

		console.log(roleMembers.size);

		roleMembers.each(async guildmember => {
			await guildmember.roles.add(ccextrarole);

			await console.log(`Adding ${ccextrarole.name} to ${guildmember.displayName}`);
			await sleep(1000);
		});
	}
	else {
		await message.channel.send(
			`${message.sender.displayName}, you do not have permission to use copyrolemembers.`
		)
			.then(msg => {
				setTimeout(() => msg.delete(), 5 * 60 * 60);
			});

		return false;
	}
};

exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases: [],
};

exports.help = {
	name: "franzadminonce",
	category: "Admin",
	description: "Delete this immediately.",
	usage: "franzadminonce",
};
