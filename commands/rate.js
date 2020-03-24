function randomInt(low, high)
{
    return Math.floor(Math.random() * (high - low) + low);
}

exports.run = async (client, message, args) =>
{ // eslint-disable-line no-unused-vars
    var output = "";

    let joinedargs = args.join(" ");
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

    let rating = randomInt(0, 10);

    if (joinedargs)
    {
        output += joinedargs + "? **" + rating + "**/10\n\n";
        for (let i = 0; i < rating; i++)
            output += ":star:";
    }
    else
        output += "You need to provide something for me to rate.";

    const msg = await message.channel.send("\u200B" + output);
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: []
};

exports.help = {
    name: "rate",
    category: "Fun",
    description: "Franzbot is biased.",
    usage: "rate <input>"
};