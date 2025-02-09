

const {
	ChannelType,
} = require('discord.js');

const parseLastException = require('../modules/parse/parsekind/LASTEXCEPTION.js');
const parseDalamudTroubleshooting = require('../modules/parse/parsekind/TROUBLESHOOTING.js');
const parseXlTroubleshooting = require('../modules/parse/parsekind/TROUBLESHXLTING.js');

exports.parseLog = async (client, message, attachment) => {
	const DiscordSnowflake = await import("discord-snowflake");
	// check if it's a dalamud log

	// handle the dalamud.txt file
	if (attachment.name.match(/(dalamud|output|launcher|message).*\.(log|txt)$/gui)) {
		// read the data
		console.log(`Processing Dalamud or XIVLauncher log called ${attachment.name} `
            + `in ${message.guild.name} #${message.channel.name}`);

		const isDirectMessage = message.channel.type == ChannelType.DM || message.channel.type == ChannelType.GroupDM;
		let canRelay = false;
		let relayChannel = client.perserversettings?.get(`${message.guild.id}-serversettings`)?.get("relayChannel");
		if (relayChannel && DiscordSnowflake.isSnowflake(relayChannel)) {
			canRelay = true;
			relayChannel = await client.channels.fetch(relayChannel);
		}

		try {
			const response = await fetch(attachment.attachment);
			let logdata;
			// const parseResults = dalamudLogParser.parse(client, response?.body);

			/*
            if (message.channel.isThread()) {
                client.logger.debug("THIS IS A THREAD");
                console.log(response?.body);
                client.logger.debug("END OF THREAD");
            }
            */
			const foundCustomRepoPluginInstalled = false;
			const anyCustomRepoPluginsLoaded = false;
			if (response.ok) {
				logdata = await response.text();
				// client.logger.debug(logdata);
			}

			const logdresults = logdata.match(/TROUBLESHOOTING:(.*)/gu);
			if (logdresults?.length > 0) {
				let data = logdresults[logdresults.length - 1];
				data = data.slice(16);
				// console.log(`TROUBLESHOOTING:\n${data}`);

				// decrypt from base64
				const buffer = new Buffer.from(data, 'base64');
				data = buffer.toString('utf8');
				// console.log(`TROUBLESHOOTING decoded:\n${data}`);
				data = JSON.parse(data);

				// get an array of embeds containing our parse results
				const dalamudTroubleshootingResponse = await parseDalamudTroubleshooting.execute(client, message, attachment.name, data);

				if (isDirectMessage && canRelay) {
					relayChannel.send({
						embeds: dalamudTroubleshootingResponse,
						allowedMentions: {
							repliedUser: false,
						},
					});
				}
				message.reply({
					embeds: dalamudTroubleshootingResponse,
					allowedMentions: {
						repliedUser: false,
					},
				}).catch(console.error);
			}

			const logxlresults = logdata.match(/TROUBLESHXLTING:(.*)/gu);
			if (logxlresults?.length > 0) {
				let data = logxlresults[logxlresults.length - 1];
				data = data.slice(16);
				// client.logger.debug(`TROUBLESHXLTING:\n${data}`);

				// decrypt from base64
				const buffer = new Buffer.from(data, 'base64');
				data = buffer.toString('utf8');
				// console.log(`TROUBLESHXLTING decoded:\n${data}`);
				data = JSON.parse(data);

				// get an array of embeds containing our parse results
				const xltroubleshootingResponse = await parseXlTroubleshooting.execute(client, attachment.name, data);

				if (isDirectMessage && canRelay) {
					relayChannel.send({
						embeds: xltroubleshootingResponse,
						allowedMentions: {
							repliedUser: false,
						},
					});
				}
				message.reply({
					embeds: xltroubleshootingResponse,
					allowedMentions: {
						repliedUser: false,
					},
				});
			}

			const lastexpresults = logdata.match(/LASTEXCEPTION:(.*)/gu);
			if (lastexpresults?.length > 0) {
				let data = lastexpresults[lastexpresults.length - 1];
				data = data.slice(14);
				// console.log(`LASTEXCEPTION:\n${data}`);

				// decrypt from base64
				const buffer = new Buffer.from(data, 'base64');
				data = buffer.toString('utf8');
				// console.log(`LASTEXCEPTION decoded:\n${data}`);
				data = JSON.parse(data);

				// get an array of embeds containing our parse results
				const lastExceptionResponse = await parseLastException.execute(client, attachment.name, data);

				if (isDirectMessage && canRelay) {
					relayChannel.send({
						embeds: lastExceptionResponse,
						allowedMentions: {
							repliedUser: false,
						},
					});
				}
				message.reply({
					embeds: lastExceptionResponse,
					allowedMentions: {
						repliedUser: false,
					},
				}).catch(console.error);
			}
		}
		catch (error) {
			if (error?.response?.body) {
				console.error(error.response.body);
			}
			else {
				console.error(error);
			}
		}
	}
};
