Franzbot Reborn. Now with more issues than ever before!

Disclaimer: This bot is basically hardcoded for a bunch of specific uses. It doesn't save any data, but it could very well explode your computer. By running any of the code here, you accept responsibility for whatever else may happen.

A large portion of code has been grabbed from https://github.com/AnIdiotsGuide/guidebot . They're the real winners here.

## Running it

You'll need Node.js 18 or newer and a Discord bot token.

1. `npm install`
2. `cp config.json.template config.json`, then fill in your bot's token and any other values you need.
3. `npm start` (or `node .`)

Each server's settings, FAQ entries, and triggers live under `config/<guild id>/`. A server is only set up if its folder still exists and the bot's token has joined that guild.

## Intents

Franzbot runs without Discord's privileged gateway intents. **Do not enable
Message Content or Server Members for it in the Developer Portal** — the bot
does not request them and is not written to use them.

The bot requests only the standard intents it needs: Guilds, Guild Messages,
and Direct Messages (plus the Message and Channel partials, which are required
for DM delivery). That has a few visible consequences:

- **Slash commands are the supported interface.** `/faq` and `/uploadlog` are
  available in the bot's DMs everywhere and in servers that have a folder
  under `config/`; other commands are available wherever the bot is installed.
- **Legacy text commands must start with a mention**, e.g.
  `@Franzbot help` or `@Franzbot flip some text`. They have no prefix.
- **In servers, the bot only receives message text and attachments when it is
  mentioned or replied to.** Triggers that scan ordinary conversation are
  disabled; upload triggers still work on a message that mentions the bot and
  carries a file, but `/uploadlog` is the intended path.
- **Direct messages are exempt** from the Message Content intent, so the DM
  upload flow receives everything sent to the bot there. DMs support triggers
  and uploads, not text commands.
