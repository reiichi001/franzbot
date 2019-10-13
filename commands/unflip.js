function randomInt (low, high) {
    return Math.floor(Math.random() * (high - low) + low);
}


exports.run = async (client, message, args) => { // eslint-disable-line no-unused-vars

	let output = "\u200B";
	let joinedargs = args.join(" ");
	console.log("Starting with: " + joinedargs+"\n");
	message.mentions.users.array().forEach(function(user) {
		//make a text replacement for mention -> username string

		useridstring = `<@${user.id}>`;
		usernickidstring = `<@!${user.id}>`;

		console.log("User: "+ user.id+"\n"+
			    "Nick: "+ message.guild.member(user.id).nickname+"\n" +
			    "Name: "+ user.username);

		usernickname = message.guild.member(user.id).nickname;
		joinedargs = joinedargs.replace( useridstring, user.username);
		joinedargs = joinedargs.replace( usernickidstring, usernickname);

	});

	let chance = randomInt(0,10);

	if (joinedargs !== "" && chance > 1)
        {
                output += joinedargs;
        }
	else if (chance <=  1)
	{
		output += "Go raise yourself."
	}
        else output += "This command requires an argument.";


  const msg = await message.channel.send( output + "ノ( ゜-゜ノ)" );
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: []
};

exports.help = {
  name: "unflip",
  category: "Fun",
  description: "Unflips provided text. Franzbot is strong enough to flip multiple people.",
  usage: "unflip this text"
};
