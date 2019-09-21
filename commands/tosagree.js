exports.run = (client, message, args) => {
    // toggle a role for Zu
	
	let addThisRole = message.guild.roles.find(role => role.name === "test");
	if (addThisRole == null)
	{
		message.reply("ERROR: Something has gone terribly wrong.");
	}
	else
	{
		if (!message.member.roles.has(addThisRole.id))
		{
			message.member.addRole(addThisRole).catch(console.error);
			message.reply("Adding role " + addThisRole.name + " for you.").then(msg => {msg.delete(5000)}).then(message.delete(5000));
		}
	}
		
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: []
};

exports.help = {
  name: "tosagree",
  category: "Management",
  description: "Grants you the guest user so you can see things. You only need to do this once. Ask an Officer or Admin to switch you to member later.",
  usage: "tosagree"
};