# Franzbot per-server config

Each server gets a folder named after its snowflake ID (e.g. `581875019861328007/`).
For a new server, copy `perserversettings.template.json` into the new folder and
fill in the values.

`app.js` loads one `perserversettings.json` per folder into
`client.perserversettings` at boot. The `guildname` and `relayChannel` keys are
also auto-backfilled at boot when missing, but it's better to set them here.

## perserversettings.json keys

| Key                     | Type    | Blank | Purpose |
|-------------------------|---------|-------|---------|
| `guildname`             | string  | `""`  | Display name used for the server in the DM FAQ server picker and relay chooser. Auto-fetched at boot if empty. |
| `relayChannel`          | string  | `""`  | Snowflake of the channel logs are relayed to. Auto-set from legacy config on boot if empty. |
| `ignoredUsers`          | array   | `[]`  | User snowflakes whose messages are not processed by triggers. |
| `ignoredRoles`          | array   | `[]`  | Role names (or `{name, id}` objects) treated as staff — their chat is not processed. |
| `suggestionWatchChannels` | array | `[]`  | Channels watched for "noMeteorPiracy" / suggestion triggers. |
| `watchNagChannels`      | array   | `[]`  | Channels for the new-patch nag. |
| `watchXLSuggest`        | array   | `[]`  | Channels for the XIVLauncher suggestion watcher. |
| `newpatchNag`           | boolean | `false`| Whether the new-patch nag is armed. |
| `faqSuggestions`        | array   | `[]`  | Topic names promoted to the top of `/faq` autocomplete for this server. Empty = fall back to the global `FAQ_SUGGESTIONS` in `config.json`, else the built-in defaults (`logxl`, `logd`, `tspack`, `antivirus`). |

## Setting up a new server

1. `mkdir config/<snowflake-id>`
2. `cp config/perserversettings.template.json config/<snowflake-id>/perserversettings.json`
3. Fill in `guildname`, `relayChannel`, and any ignored users/roles.
4. Add triggers as `config/<snowflake-id>/triggers/*.js` and FAQs as
   `config/<snowflake-id>/faqs/*.js` (each exports `info` + an `answer`/`execute`).
5. Restart the bot.

## Not a server folder

- `disabled/` — archived/disabled configs, never loaded.
- `faqs/` — (reserved) shared canonical FAQ store.
- `directmessage/` — settings for the DM context; not relayable.