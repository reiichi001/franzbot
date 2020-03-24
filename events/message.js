/*
module.exports = (client, message) => {
  // Ignore all bots
  if (message.author.bot) return;

  // Ignore messages not starting with the prefix (in config.json)
  if (message.content.indexOf(client.config.prefix) !== 0) return;

  // Our standard argument/command name definition.
  const args = message.content.slice(client.config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  // Grab the command data from the client.commands Enmap
  const cmd = client.commands.get(command);

  // If that command doesn't exist, silently exit and do nothing
  if (!cmd) return;

  // Run the command
  cmd.run(client, message, args);
};
*/

// The MESSAGE event runs anytime a message is received
// Note that due to the binding of client to every event, every event
// goes `client, other, args` when this function is run.
module.exports = async (client, message) =>
{
    // It's good practice to ignore other bots. This also makes your bot ignore itself
    // and not get into a spam loop (we call that "botception").
    if (message.author.bot) return;

    // Checks if the bot was mentioned, with no message after it, returns the prefix.
    const prefixMention = new RegExp(`^<@!?${client.user.id}>( |)$`);
    if (message.content.match(prefixMention))
    {
        return message.reply(`My prefix on this guild is \`${client.config.prefix}\``);
    }

    //console.log(message.member.guild.iconURL.replace(".jpg",".webp?size=1024"));


    //Code for the great triggering of Franzbot-Reborn goes here
    arrayofchannel = [
        "485251347852165122", //franzbot testing - general
        "216954456045125632" //Zu - general
    ];
    console.log("Channel: " + message.channel.id);
    console.log("Found in array: " + arrayofchannel.includes(message.channel.id));
    
    
    if ( arrayofchannel.includes(message.channel.id ) )
    {
        badword1 = /(corona|virus|covid)/ig;
        //badword2 = /(torrent|pirat|free|copy|copies|download|ISO)+(?!.*\1)/ig;
        goodwords = /(computer|beer)+/ig;
        
        goodwordweight = 0;
        hadbadword1 = false;
        hadbadword2 = 0;

        wordset = new Set();
        
        results1 = message.content.match(badword1);
        if (results1 != null)
        {
            results1.forEach( (result) =>
            {    
                    
                    console.log("Matched a badword for client: " + result);
                    hadbadword1 = true;
                    wordset.add(result);
            }
            );
        }

        /*
        results2 = message.content.match(badword2);
        if (results2 != null)
        {
            results2.forEach( (result) =>
            {

                console.log("Matched a badword for obtain: " + result);
                hadbadword2++;
                wordset.add(result);
            }
            );
        }
        */
        
        results3 = message.content.match(goodwords);
        if (results3 != null)
        {
            results3.forEach( (result) =>
            {
                console.log("Matched a badword for client: " + result);
                goodwordweight++;
            }
            );
        }
        
        console.log("Bad wordset: " + wordset.size + " Goodwords: " + goodwordweight);

        
        //if ( hadbadword1 && hadbadword2 >= 2 && ( (wordset.size - goodwordweight) >= 2) )
        if ( hadbadword1 && ( (wordset.size - goodwordweight) >= 1) )
        {
            if ( !message.member.roles.some(r=>["Admin", "test"].includes(r.name)) )
            {
                    embedobj = {
                      "embed": {
                        "title": "Message Alert",
                        "description": "Please move this conversation out of the general channel. There are additional opt-in channels available on the discord for this topic.",
                        "color": 13632027,
                        "footer": {
                          "text": "This is an automated response based on the words you used and can be triggered accidentally."
                        },
                        "fields": [
                          {
                            "name": "Spoilers",
                            "value": "Please enable the Discussion role to talk about spoilers."
                          },
                          {
                            "name": "IRL",
                            "value": `Please enable the IRL role and discuss this topic in ${member.guild.channels.find(c => c.id === "690416629913223208")}`
                          }
                        ]
                      }
                    }
                message.reply(embedobj);
            }
            return;
        }
    }
    
    
    //This is the end of the great triggering.

    // Also good practice to ignore any message that does not start with our prefix,
    // which is set in the configuration file.
    if (message.content.indexOf(client.config.prefix) !== 0) return;

    // Here we separate our "command" name, and our "arguments" for the command.
    // e.g. if we have the message "+say Is this the real life?" , we'll get the following:
    // command = say
    // args = ["Is", "this", "the", "real", "life?"]
    const args = message.content.slice(client.config.prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    // If the member on a guild is invisible or not cached, fetch them.
    if (message.guild && !message.member) await message.guild.fetchMember(message.author);


    // Check whether the command, or alias, exist in the collections defined
    // in app.js.
    const cmd = client.commands.get(command) || client.commands.get(client.aliases.get(command));
    // using this const varName = thing OR otherthing; is a pretty efficient
    // and clean way to grab one of 2 values!
    if (!cmd) return;

    // Some commands may not be useable in DMs. This check prevents those commands from running
    // and return a friendly error message.
    if (cmd && !message.guild && cmd.conf.guildOnly)
        return message.channel.send("This command is unavailable via private message. Please run this command in a guild.");

    message.flags = [];
    while (args[0] && args[0][0] === "-")
    {
        message.flags.push(args.shift().slice(1));
    }
    cmd.run(client, message, args);
};