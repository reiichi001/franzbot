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
	
	//Channel-specific markers
	GoatTriggers = [
		client.config.GUILDID_TESTING, //franzbot testing - general
		client.config.GUILDID_GOAT //Goatplace - general
	];
	MeteorTriggers = [
		client.config.GUILDID_TESTING, //franzbot testing - general
		client.config.GUILDID_METEOR //Meteor - general
	];
	ZuTriggers = [
		client.config.GUILDID_TESTING, //franzbot testing - general
		client.config.GUILDID_ZU //Zu - general
	];
	console.log(`GUILD: ${message.guild.id}, CHANNEL: ${message.channel.id}`);

    // Checks if the bot was mentioned, with no message after it, returns the prefix.
    const prefixMention = new RegExp(`^<@!?${client.user.id}>( |)$`);
    if (message.content.match(prefixMention))
    {
        message.channel.send(`My prefix on this guild is \`${client.config.prefix}\``);
		
		
		
		if ( MeteorTriggers.includes(message.guild.id ) )
		{
			embedobj = {
			  "embed": {
				"title": "Franzbot FAQ",
				"description": `Supported FAQ commands listed below. Type \`${client.config.prefix}faq <topic>\` to display the content.`,
				"color": client.config.EMBED_NORMAL_COLOR,
				"footer": {
				  "text": client.config.FRANZBOT_VERSION
				},
				"fields": [
				  {
					"name": "Information",
					"value": "wiki status paru md5"
				  },
				  {
					"name": "Guides",
					"value": "compile config client"
				  },
				  {
					"name": "Tools",
					"value": "vs wamp"
				  },
				]
			  }
			};
			message.channel.send(embedobj);
		}
		return
    }

    //console.log(message.member.guild.iconURL.replace(".jpg",".webp?size=1024"));
 
	
	// Triggers for Goatplace
	if ( GoatTriggers.includes(message.guild.id ) )
    {
		console.log("Found in GoatTriggers: " + message.channel.name);
		
		const badword1 = /(plugin|dalamud|launcher|in-game|in game|XL|XIVLauncher|XIV Launcher)/ig;	
		const badword2 = /(update|(not|n't)|(work|exist|use)|when|eta|why|yet)+(?!.*\1)/ig;	
		//const goodwords = /(can't|don't|cannot|ARR|HW|SB|SHB|trial|[2-9]\.[0-9]{0,2})+/ig;	
			
		goodwordweight = 0;	
		hadbadword1 = true;	
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
			
		/*	
		results3 = message.content.match(goodwords);	
		if (results3 != null)	
		{	
			results3.forEach( (result) =>	
			{	
				console.log("Matched a good word for client: " + result);	
				goodwordweight++;	
			}	
			);	
		}	
		*/	
			
		console.log("Bad wordset: " + wordset.size + " Goodwords: " + goodwordweight);	
			
		if ( hadbadword1 && hadbadword2 >= 2 && ( (wordset.size - goodwordweight) >= 2) )	
		{	
			if ( !message.member.roles.cache.some(r=>["moderator", "demigoat", "plugin developer", "test"].includes(r.name)) )	
			{	
				// old plain message reply	
				//message.reply("Any discussion of torrenting, piracy, or other illegitimate means of obtaining software is not allowed on this server. (This is an automated response based on the words you used and can be triggered accidentally.)");	
					
				// fancy new embed reply	
				embedobj = {	
				  "embed": {	
					"title": "Message Alert",	
					"description": "Please understand that this is a community-driven project that has multiple dependencies by people who have school/jobs/both and live in a variety of timezones. Updates to XIV Launcher, Dalamud, and plugins will come when they can, but asking for a time estimate will not make that happen sooner.",	
					"color": client.config.EMBED_ERROR_COLOR,	
					"footer": {	
					  "text": "This is an automated response based on the words you used and can be triggered accidentally."	
					}	
				  }	
				}	
                message.reply(embedobj);	
					
					
			}	
			return;	
		}	
			
		
	}
	
	// Triggers for Project Meteor
	if ( MeteorTriggers.includes(message.guild.id ) )
    {
		console.log("Found in MeteorTriggers: " + message.channel.name);
		
		const badword1 = /(ffxiv|ff14|1\.[0-9]{0,2}[a|b|c]?)+(?!.*\1)/ig;
		const badword2 = /(torrent|pirat|free|copy|copies|download|ISO)+(?!.*\1)/ig;
		const goodwords = /(can't|don't|cannot|ARR|HW|SB|SHB|trial|[2-9]\.[0-9]{0,2})+/ig;
		
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
		
		results3 = message.content.match(goodwords);
		if (results3 != null)
		{
			results3.forEach( (result) =>
			{
				console.log("Matched a good word for client: " + result);
				goodwordweight++;
			}
			);
		}
		
		console.log("Bad wordset: " + wordset.size + " Goodwords: " + goodwordweight);
		
		if ( hadbadword1 && hadbadword2 >= 2 && ( (wordset.size - goodwordweight) >= 2) )
		{
			if ( !message.member.roles.cache.some(r=>["Developer", "Moderator", "Operator", "test"].includes(r.name)) )
			{
				// old plain message reply
				//message.reply("Any discussion of torrenting, piracy, or other illegitimate means of obtaining software is not allowed on this server. (This is an automated response based on the words you used and can be triggered accidentally.)");
				
				// fancy new embed reply
				embedobj = {
				  "embed": {
					"title": "Message Alert",
					"description": "Any discussion of torrenting, piracy, or other illegitimate means of obtaining software is not allowed on this server.",
					"color": client.config.EMBED_ERROR_COLOR,
					"footer": {
					  "text": "This is an automated response based on the words you used and can be triggered accidentally."
					}
				  }
				}
                message.reply(embedobj);
				
				
			}
			return;
		}
		
		
	}
	
    // Triggers for Zu
    if ( ZuTriggers.includes(message.guild.id ) )
    {
		console.log("Found in ZuTriggers: " + message.channel.name);
		
		
        badword1 = /(corona|virus|covid)/ig;
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
                console.log("Matched a good word for client: " + result);
                goodwordweight++;
            }
            );
        }
        
        console.log("Bad wordset: " + wordset.size + " Goodwords: " + goodwordweight);

        
        //if ( hadbadword1 && hadbadword2 >= 2 && ( (wordset.size - goodwordweight) >= 2) )
        if ( hadbadword1 && ( (wordset.size - goodwordweight) >= 1) )
        {
            if ( !message.member.roles.cache.some(r=>["Admin", "test"].includes(r.name)) )
            {
				embedobj = {
				  "embed": {
					"title": "Message Alert",
					"description": "Please move this conversation out of the general channel. There are additional opt-in channels available on the discord for this topic.",
					"color": client.config.EMBED_ERROR_COLOR,
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
						"value": `Please enable the IRL role and discuss this topic in <#690416629913223208>`
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
	if (message.content[0] == client.config.prefix_old) 
	{
		if ( message.guild.id == client.config.GUILDID_METEOR)
		{
			message.reply(`Franzbot now uses ${client.config.prefix} as a prefix.`);
		}
	}
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
