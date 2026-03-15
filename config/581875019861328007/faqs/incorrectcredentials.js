
exports.answer = async client => ({
    title: `XIVLauncher says my Username/Password is incorrect?`,
    description: "This error comes from Square Enix directly. XIVLauncher uses the same login flow as the official launcher. If it says that your username/password is incorrect then it is incorrect.\n\nPlease disable auto-login by holding shift while opening the launcher and double check the following:",
    color: client.configdb.get("EMBED_NORMAL_COLOR"),
    footer: {
        "text": client.configdb.get("FRANZBOT_VERSION"),
    },
    fields: [
        {
            name: "Username",
            value: "Ensure that you are using your Square Enix account username, not your Steam username. Usernames are case sensitive."
        },
        {
            name: "Password",
            value: "Consider typing your password somewhere else to ensure you have it typed properly and copy/paste it into XIVLauncher."
        },
        {
            name: "Steam Service Accounts",
            value: "Ensure that this box is checked if, and only if, you have a Steam Service Account."
        },
        {
            name: "One-Time Password",
            value: "Ensure that this box is checked if, and only if, you use a One-Time Password on your account."
        },
        {
            name: "Free Trial Accounts",
            value: "Ensure that you have the free trial mode enabled in the launchers settings."
        }
    ]
});

exports.info = {
    name: "incorrectcredentials",
    category: "help",
    aliases: [
        "badcreds",
        "wrongpass",
        "wrongpassword",
        "wrongusername"
    ],
};

