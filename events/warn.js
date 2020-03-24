module.exports = async (client, warn) =>
{
    client.logger.log(`A warn event was sent by Discord.js: \n${JSON.stringify(warn)}`, "warn");
};