/*
 * Admin helper: add any missing keys to a server's perserversettings.json as
 * blank placeholders (for new server setups or schema additions). Existing
 * values are never overwritten. Rerunnable — safe to run any time.
 *
 * Usage:
 *   node scripts/backfill-settings.js
 */
const fs = require('fs');
const path = require('path');

// The full, canonical key set, in a sensible display order, with blank defaults.
const BLANK = {
	guildname: '',
	relayChannel: '',
	ignoredUsers: [],
	ignoredRoles: [],
	suggestionWatchChannels: [],
	watchNagChannels: [],
	watchXLSuggest: [],
	newpatchNag: false,
	faqSuggestions: [],
};

const dirs = fs.readdirSync('./config', { withFileTypes: true })
	.filter(d => d.isDirectory() && d.name !== 'disabled')
	.map(d => d.name);

for (const name of dirs) {
	const file = path.join('./config', name, 'perserversettings.json');
	if (!fs.existsSync(file)) {
		console.log(`SKIP ${name}: no perserversettings.json`);
		continue;
	}
	const obj = JSON.parse(fs.readFileSync(file, 'utf8'));
	const missing = Object.keys(BLANK).filter(k => !(k in obj));
	if (missing.length === 0) {
		console.log(`OK   ${name}: nothing missing`);
		continue;
	}
	for (const k of missing) {
		obj[k] = BLANK[k];
	}
	fs.writeFileSync(file, `${JSON.stringify(obj, null, 4)}\n`);
	console.log(`ADD  ${name}: ${missing.join(', ')}`);
}