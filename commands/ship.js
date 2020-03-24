function randomInt(low, high)
{
    return Math.floor(Math.random() * (high - low) + low);
}

exports.run = async (client, message, args) =>
{ // eslint-disable-line no-unused-vars
    var output = "";

    let joinedargs = args.join(" and ");
    console.log("Starting with: " + joinedargs + "\n");
    message.mentions.users.array().forEach(function(user)
    {
        //make a text replacement for mention -> username string

        useridstring = `<@${user.id}>`;
        usernickidstring = `<@!${user.id}>`;

        console.log("User: " + user.id + "\n" +
            "Nick: " + message.guild.member(user.id).nickname + "\n" +
            "Name: " + user.username);

        usernickname = message.guild.member(user.id).nickname;
        joinedargs = joinedargs.replace(useridstring, user.username);
        joinedargs = joinedargs.replace(usernickidstring, usernickname);

    });

    let rating = randomInt(0, 100);

    if (joinedargs)
    {
        output += "Checking the compatibility of " + joinedargs + ". It's **" + rating + "**%\n\n";
        for (let i = 0; i < rating; i++)
            output += ":star:";
    }
    else
        output += "I don't understand. Please just mention two people.";

    const msg = await message.channel.send("\u200B" + output);
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: []
};

exports.help = {
    name: "ship",
    category: "Fun",
    description: "Franzbot is biased.",
    usage: "ship @person1 @person2"
};