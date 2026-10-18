// The guilds this checkout has per-server configuration for. The config/ tree
// is what actually decides where FAQ data and relay settings exist, so the
// boot deployer and the undeploy script both derive their guild list from it
// instead of a hand-maintained list (which drifts: two configured servers have
// no GUILDID_* key) or from config.json (which differs per bot token).
const {
	readdirSync,
} = require('fs');
const {
	join,
} = require('path');
const DiscordSnowflake = require('discord-snowflake');

// `disabled` holds folders for servers that must not load (app.js skips it),
// and `directmessage` is not a guild at all.
const NON_GUILD_FOLDERS = [
	'disabled',
	'directmessage',
];

/**
 * Every configured guild ID, as strings.
 *
 * Synchronous on purpose: app.js starts client.login() without awaiting it and
 * only then loads per-server settings, so a list derived from the live client
 * (client.perserversettings) would race the READY event. Directory reads are
 * race-free.
 * @returns {string[]} Guild snowflakes found under config/
 */
function configuredGuildIds() {
	return readdirSync(join(__dirname, '..', 'config'), {
		withFileTypes: true,
	})
		.filter(f => f.isDirectory())
		.map(f => f.name)
		// The digits test runs first on purpose: isSnowflake() does BigInt(name)
		// and THROWS on a non-numeric folder name rather than returning false.
		.filter(name => !NON_GUILD_FOLDERS.includes(name)
			&& (/^\d+$/u).test(name)
			&& DiscordSnowflake.isSnowflake(name));
}

module.exports = {
	configuredGuildIds,
};
