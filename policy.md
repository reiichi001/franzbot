# Franzbot privacy policy
Last updated: 2026-10-18

## The short version

Franzbot is a support utility, not a data collector. It has no analytics, no tracking, no advertising, and no database of users. It does not archive the messages it sees, and it does not build profiles of anyone. It is designed to be as stateless as possible.

Franzbot is free and open source. The entire codebase is available for audit.

## How Franzbot is designed

Franzbot is designed to be as stateless as possible. Storage is the exception, not the rule: anything persistent exists only where it is absolutely required for the bot to function (config), and steps have been taken both to limit what reaches disk and to reduce the state kept in live memory. It does have some console logging for debug purposes, which is wiped and rotated when the bot is restarted.

## What Franzbot can and cannot see

Franzbot does **not** request either of Discord's privileged gateway intents (Message Content and Server Members). That limits what Discord sends it:

- **In servers**, Discord only delivers message text and attachments when a message mentions the bot or replies to it. Franzbot therefore cannot read ordinary conversations, and features that used to scan every message are disabled.
- **The member list is not available.** Franzbot can fetch an individual member only when a command or response actually needs that person, and it does not keep a roster.
- **Direct messages are exempt** from those restrictions, so Franzbot receives the DMs users send it. That is what makes the DM upload flow work.

## What Franzbot does **not** do

- It does **not** run analytics or telemetry, and there are no third-party trackers anywhere in it.
- It does **not** store, index, or archive the messages in the servers it operates in. The messages it does receive (mentions, replies, DMs) are examined transiently to decide how to respond (triggers, FAQ replies, log parsing), then discarded.
- It does **not** keep a database of members, roles, or activity history.
- It does **not** sell, share, or use for any purpose other than operating the bot any data described below.

## Uploaded files

When you upload a log file, troubleshooting pack, or similar to Franzbot (via `/uploadlog`, the Upload Log button, a FAQ post, or by messaging the bot directly), Franzbot processes that file at your request:

- **Log files** (`.log`, `.txt`, `.evtx`) are downloaded, parsed in memory to extract troubleshooting information, and **not written to disk**. Nothing about the file or its contents outlives the reply.
- **Troubleshooting packs** (`.tspack`) are copied to an Amazon Web Services S3 bucket (`dalamud-support`) so the [Loggy](https://loggy.goat.place) log-reading tool can display their contents. The S3 copy carries two metadata tags — the Discord user ID and server ID numbers of the upload — which exist only in the object's storage metadata, not in the pack file itself, and are visible only to the bucket's operators. Neither Franzbot nor Loggy offers a way to download the pack; a Loggy link only renders the pack's parsed contents. This is a one-way, push-only upload: Franzbot has no permission to read, list, or retrieve anything from the bucket, and copies are removed automatically by the bucket's retention policy. **[TODO: optionally state the retention period]**
- **Files posted in a support server may be relayed** to a private staff channel so the support team can analyze them. Relayed posts carry your Discord user ID and username as attribution. This happens inside Discord, not in any storage of our own.
- **Crash dump files (`.dmp`) are never accepted or relayed.**

Logs and packs *may* contain your FFXIV username or your computer's username, depending on what the launcher and Dalamud have logged. This possibility is stated in the bot's upload prompts and notices. Uploading a file is through direct user consent. All log failes and be opened in a text editor to redact identifying information first. Franzbot additionally provides options to set private relay channels on configured servers, where any relayed files can be posted behind a restricted and privileged channel. That is at the discretion of the Discord server administrator.

## Operational logs

The bot prints technical logging to its console — for example, which user triggered a command or where an uploaded file came from. These logs are rotated every time the bot restarts, and only a small number of past rotations are kept on the host. The bot itself cannot access these logs, and they are not published or shared; only the operator of the machine hosting the bot can see them. They exist to keep the bot running and debuggable, not to track anyone.

## Third parties

Franzbot talks to exactly these services:

| Service | What goes there |
| --- | --- |
| Discord | Everything the bot does is through Discord's API; content you post or upload is governed by [Discord's privacy policy](https://discord.com/privacy). |
| Amazon S3 | Push-only copies of `.tspack` uploads (see above). |
| Loggy (loggy.goat.place) | A read-only viewer for the S3-hosted troubleshooting packs; it fetches the pack from S3 when someone opens the link. |
| Giphy | A "drink water" GIF lookup. No information about you is sent — only the bot's own API key. |

## In-memory data

A few features keep short-lived state in memory only — for example, a pending "relay this upload?" offer waits for you to click its button, and is dropped after about 15 minutes or whenever the bot restarts. Nothing in this category is ever written to disk.

## Removing your data

At most, Franzbot stores discord IDs in its config, but only fetches those on demand and through the Discord API. While relayed tspacks are sent to S3 with tagged metadata, these already expire based on bucket retention rules and all filenames are hashed to prevent being able to locate a particular user or server upload. If you have reason to believe the bot has cached something related to you that you would like to have removed, please log a github issue or reach out to the developer directly.

## Changes

If this policy changes materially, the new version will be published in this repository and dated above.
