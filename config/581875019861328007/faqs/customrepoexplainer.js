exports.answer = async client => ({
    title: `Recreate your issue with <:custom_repo:1309368924063924285> custom repo plugins disabled.`,
    description: `You uploaded a tspack or are describing an issue that indicates you have custom repo plugins enabled. `
        + `We cannot provide support while they are active.\n\n`
        + '**However, just disabling them in-game is not enough!**\n'
        + `Right-click the "Log in" button in XIVLauncher and select the option to start without custom repository plugins.\n\n`
        + `If your launcher logs in automatically, hold down the shift key when starting XIVLauncher to disable autologin.\n\n`
        + 'If your issue stops when they are disabled, then per [Rule 6](https://discord.com/channels/581875019861328007/585958820061249537) ' 
        + 'you will have to get further help in their own support channels.\n\n'
        + 'You can also upload and analyze the tspack yourself [HERE](https://loggy.goat.place/).',
    color: client.configdb.get("EMBED_WARN_COLOR"),
    image: {
        "url": "https://media.discordapp.net/attachments/687530726756712478/1196967126230118430/image.png",
    },
    footer: {
        "text": client.configdb.get("FRANZBOT_VERSION"),
    },
});

exports.info = {
    name: "customrepo",
    category: "help",
    aliases: [
        "crpcrash",
        "recreateissue",
    ],
};