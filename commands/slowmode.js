exports.run = async (client, message, args) => { 
    // eslint-disable-line no-unused-vars
    const selectedChannel = args.shift();
    const time = args.shift();
    const reason = args.shift();

    if (message.member.roles.cache.find(r => r.name === "Moderator")) {
        try {
            const channel = client.channels.cache.get(selectedChannel.replace('<#','').replace('>',''));
            channel.setRateLimitPerUser(Math.floor(time * 60), reason)
            return message.channel.send(`Setting ${selectedChannel} to a slowmode of one message per user every ${time} minutes.`);
        } catch (err) {
            console.log(err);
            return message.channel.send("Something went wrong, please verify that your arguments are correct and try again.")
        }
    } else {
        return message.channel.send("You do not have permission to use that command.")
    }
};

exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases: [],
};

exports.help = {
	name: "slowmode",
	category: "Admin",
	description: "Makes a channel slowmode. User must have the `Moderator` role to use.",
	usage: "slowmode <channel> <time in minutes> <reason>",
};
