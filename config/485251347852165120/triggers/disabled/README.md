# Disabled triggers

Everything in this folder is kept for reference and is **not loaded**.

`app.js` reads `triggers/` non-recursively, so only `.js` files sitting directly
in `triggers/` are registered. These handlers read `message.content`, which
Discord no longer delivers without the privileged `MESSAGE_CONTENT` intent
(guild content now only arrives on mentions, replies, and context menus), so
they had stopped matching anything.

`suggestionWatchChannels.js` is the exception: it reacts to chat activity
rather than reading the text, but it checks `message.member.roles`, which is
not reliably populated without the privileged `GUILD_MEMBERS` intent.

Move a file back to `triggers/` only if the relevant intent is enabled again.
