/* eslint-disable max-len */
const {
    ChannelType,
} = require('discord.js');
const URLSafeBase64 = require('urlsafe-base64');
const logger = require('../../../modules/Logger.js');
const { parseLog } = require("../../../modules/parseLog.js");
const { relayFile } = require("../../../modules/relayFile.js");
const {
    SECOND, MINUTE, timeoutSet, timeoutEnded, resetTimeout,
} = require('../../../modules/triggerTimeoutManager.js');


exports.execute = async (client, message) => {
    // let's do some setup
    const isDirectMessage = message.channel.type == ChannelType.DM || message.channel.type == ChannelType.GroupDM;

    if (message.attachments.size > 0) {
        console.log("Found an attachment in this direct message");

        let needToRemoveAttachments = false;
        message.attachments.forEach(async attachment => {
            console.log(attachment.name);

            // Returns true if attachments need to be removed.
            relayFile(client, message, attachment, message.author, message.channel)

            parseLog(client, message, attachment);
        });

    }
};

exports.info = {
    name: "Process Attachment - DM edition",
    description: "Parses any incoming logs / handles relays",
    type: "logs",
};