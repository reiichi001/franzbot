exports.run = (client, message, args) =>
{
    // toggle a role for Zu

    if (args.length != 1)
    {
        message.reply("\u200B" + "I didn't understand what you meant by that.");
    }
    else
    {
        let addThisRole = message.guild.roles.cache.find(role => role.name === args[0]);
		console.log("the role is: " + addThisRole);
		
		
        if (addThisRole == null || addThisRole == undefined)
        {
            message.reply("\u200B" + "ERROR: Cannot find the role \"" + args[0] + "\" on this server. Please check spelling and capitalization, or ask an Officer/Admin to set the role for you.");
        }
        else
        {
			
			
            if (message.member.roles.cache.get(addThisRole.id))
            {
                message.member.roles.remove(addThisRole).catch(console.error);
                message.reply("\u200B" + "Removing role " + addThisRole.name + " for you.").then(msg =>
                {
                    msg.delete({ timeout: 5000, reason: 'Cleaning up uneeded message' })
                }).then(message.delete({ timeout: 5000, reason: 'Cleaning up uneeded message' }));
            }
            else
            {
                message.member.roles.add(addThisRole).catch(console.error);
                message.reply("\u200B" + "Adding role " + addThisRole.name + " for you.").then(msg =>
                {
                    msg.delete({ timeout: 5000, reason: 'Cleaning up uneeded message' })
                }).then(message.delete({ timeout: 5000, reason: 'Cleaning up uneeded message' }));
				
            }

        }

    }


}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["togglerole", "setrole", "addrole", "removerole"]
};

exports.help = {
    name: "role",
    category: "Management",
    description: "Toggles a user role. Can only toggle roles below bot's permissions.",
    usage: "role role-name"
};