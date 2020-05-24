exports.run = async (client, message, args) =>
{ // eslint-disable-line no-unused-vars

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

    var runes = require('stringz');
    let output = "\u200B(╯°□°）╯︵ ";
    let joinedargs = args.join(" ");
    console.log("Starting with: " + joinedargs + "\n");
    message.mentions.users.array().forEach(function(user)
    {
        //make a text replacement for mention -> username string

        useridstring = `<@${user.id}>`;
        usernickidstring = `<@!${user.id}>`;
		
		usernamestring = user.username;
		usernickstring = message.guild.members.cache.get(user.id).nickname;
		
		if (usernickstring == undefined)
		{
			usernickstring = usernamestring;
		}
		

        console.log("User: " + user.id + "\n" +
            "Nick: " + usernickstring + "\n" +
            "Name: " + usernamestring);

        joinedargs = joinedargs.replace(useridstring, usernamestring);
        joinedargs = joinedargs.replace(usernickidstring, usernickstring);

    });

    var runifiedoutput = runes.toArray(joinedargs);
    var chars = require('../modules/flip.js');

    Object.keys(chars).forEach(function(key)
    {
        var value = chars[key]
        if (!chars[value])
        {
            chars[value] = key
        }
    })

    var result = "",
        c = runes.length(joinedargs),
        ch = "";

    for (; c >= 0; --c)
    {
        ch = runifiedoutput[c];
        //console.log(ch);
        result += chars[ch] || ch || "";
    }

    console.log(result);


    if (joinedargs !== "")
    {
        output += result;
    }
    else output += "This command requires an argument.";


    const msg = await message.channel.send(output);
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: []
};

exports.help = {
    name: "flip",
    category: "Fun",
    description: "Flips provided text. Franzbot is strong enough to flip multiple people.",
    usage: "flip this text"
};