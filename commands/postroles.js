exports.run = (client, message, args) =>
{
    // toggle a role for Zu

    if (args.length != 0)
    {
        message.reply("\u200B" + "I didn't understand what you meant by that.");
    }
    else
    {
        let addThisRole = message.guild.roles.find(role => role.name === args[0]);
        if (addThisRole == null)
        {
            message.reply("\u200B" + "ERROR: Cannot find the role \"" + args[0] + "\" on this server.");
        }
        else
        {
            if (message.member.roles.has(addThisRole.id))
            {
                message.member.removeRole(addThisRole).catch(console.error);
                message.reply("\u200B" + "Removing role " + addThisRole.name + " for you.").then(msg =>
                {
                    msg.delete(5000)
                }).then(message.delete(5000));
            }
            else
            {
                message.member.addRole(addThisRole).catch(console.error);
                message.reply("\u200B" + "Adding role " + addThisRole.name + " for you.").then(msg =>
                {
                    msg.delete(5000)
                }).then(message.delete(5000));
            }

        }

    }


}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["allroles", "roles"]
};

exports.help = {
    name: "postroles",
    category: "Management",
    description: "Posts a fancy message with reactions for all of the available server roles.",
    usage: "postroles"
};