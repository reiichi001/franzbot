exports.run = (client, message, args) => {
	
	const [atype, ...messages] = args;
	var acttype = "PLAYING";
	
	switch ( atype.toLowerCase() )
	{
		case "listening":
			acttype="LISTENING";
			break;
		case "watching":
			acttype="WATCHING";
			break;
		default:
			acttype="PLAYING";
			break;
	}
	
	
    client.user.setActivity(messages.join(" "), {type: acttype});
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