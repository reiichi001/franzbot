exports.run = (client, message, args) =>
{

	ZuTriggers = [
			client.config.GUILDID_TESTING, //franzbot testing - general
			client.config.GUILDID_ZU //Zu - general
		];
		if ( !ZuTriggers.includes(message.guild.id ) )
		{
			message.reply("\u200B" + `this command doesn't work here.`)
				.then(message.delete({ timeout: 5000, reason: 'Cleaning up uneeded message' }));
			return; //this command
		}
	
    const [atype, ...messages] = args;
    var acttype = "PLAYING";

    switch (atype.toLowerCase())
    {
        case "listening":
            acttype = "LISTENING";
            break;
        case "watching":
            acttype = "WATCHING";
            break;
        default:
            acttype = "PLAYING";
            break;
    }


    client.user.setActivity(messages.join(" "),
    {
        type: acttype
    });
}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: []
};

exports.help = {
    name: "setactivity",
    category: "Admin",
    description: "Modifies Franzbot's activity presence. Will eventually be locked down.",
    usage: "setactivity watching/playing action text"
};