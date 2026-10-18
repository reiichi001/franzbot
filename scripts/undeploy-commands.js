/*
 * Admin helper: undeploy (remove) Discord commands from the configured bot, so
 * the boot deployer in events/clientReady.js can push a clean set next start.
 * Global commands cover DMs, so clearing globals also hides them in DM.
 *
 * Usage:
 *   node scripts/undeploy-commands.js --help
 *   node scripts/undeploy-commands.js --dry-run --global --guild GOAT
 *   node scripts/undeploy-commands.js --global                      # globals (DMs) only
 *   node scripts/undeploy-commands.js --guild TESTING               # one guild
 *   node scripts/undeploy-commands.js --global --guild TESTING --guild GOAT
 *
 * A --guild argument may be a snowflake ID or a config.json key suffix:
 * "GOAT"  -> GUILDID_GOAT, "TESTING" -> GUILDID_TESTING, "METEOR" -> ...
 */
const {
	Client,
	GatewayIntentBits,
	Events,
} = require('discord.js');
const {
	configuredGuildIds,
} = require('../modules/configuredGuildIds');

const config = require('../config.json');

const HELP = [
	'Usage: node scripts/undeploy-commands.js [flags]',
	'',
	'  --global               Remove ALL global commands (covers DMs)',
	'  --guild <id|NAME>      Remove one guild\'s commands (repeatable)',
	'  --all                  Remove globals + every configured guild the bot is in',
	'  --dry-run              Print what would be removed, change nothing',
	'  --help                 Show this help',
].join('\n');

/**
 * Parse CLI flags into a plan object.
 */
function parseArgs(argv) {
	const flags = {
		global: false,
		guilds: [],
		all: false,
		dryRun: false,
		help: false,
	};
	for (let i = 0; i < argv.length; i++) {
		const arg = argv[i];
		if (arg === '--global') {
			flags.global = true;
		}
		else if (arg === '--all') {
			flags.all = true;
		}
		else if (arg === '--dry-run') {
			flags.dryRun = true;
		}
		else if (arg === '--guild') {
			if (argv[i + 1]) {
				flags.guilds.push(argv[i + 1]);
				i += 1;
			}
		}
		else if (arg === '--help' || arg === '-h') {
			flags.help = true;
		}
	}
	return flags;
}

/**
 * Resolve a guild argument to its snowflake ID: a bare ID passes through,
 * a name is looked up against GUILDID_* in config.json.
 */
function resolveGuild(rawId) {
	if ((/^\d+$/u).test(rawId)) {
		return rawId;
	}
	return config[`GUILDID_${rawId.toUpperCase()}`] || null;
}

/**
 * Print a command list one per line, or "(none)".
 */
function printCommands(commands) {
	if (commands.size === 0) {
		console.log('  (none)');
		return;
	}
	for (const cmd of commands.values()) {
		console.log('  - %s (%s)', cmd.name, cmd.id);
	}
}

async function main() {
	const flags = parseArgs(process.argv.slice(2));
	if (flags.help) {
		console.log(HELP);
		return;
	}

	// Resolve targets. `--all` covers every configured guild the running token
	// is in (narrowed at READY, since membership is only known then); explicit
	// --guild arguments are attempted as given.
	const allTargets = flags.all ? configuredGuildIds() : [];
	const explicitTargets = [];
	if (flags.all) {
		flags.global = true;
	}
	for (const raw of flags.guilds) {
		const id = resolveGuild(raw);
		if (!id) {
			console.error(`Unknown guild "${raw}" (no GUILDID_${raw.toUpperCase()} in config.json)`);
			process.exit(1);
			return;
		}
		explicitTargets.push(id);
	}

	if (!flags.global && allTargets.length === 0 && explicitTargets.length === 0) {
		console.error('Nothing to do. Pass --global, --all, or at least one --guild <id>.');
		console.error(HELP);
		process.exit(1);
		return;
	}

	const client = new Client({
		intents: [GatewayIntentBits.Guilds],
	});

	// Wrap the whole run in a promise so it can exit cleanly once done.
	const ok = await new Promise(resolve => {
		client.once(Events.ClientReady, async () => {
			try {
				// Only the configured guilds this token is actually in: fetching a
				// guild it is not in throws and would abort the rest of the run.
				const notJoined = allTargets.filter(id => !client.guilds.cache.has(id));
				if (notJoined.length > 0) {
					console.log(`Skipping configured guilds this token is not in: ${notJoined.join(', ')}`);
				}
				const uniqueTargets = [
					...new Set([
						...allTargets.filter(id => client.guilds.cache.has(id)),
						...explicitTargets,
					]),
				];

				if (flags.global) {
					console.log('Global (DMs) scope:');
					const globals = await client.application.commands.fetch();
					printCommands(globals);
					if (!flags.dryRun) {
						await client.application.commands.set([]);
						console.log('  -> cleared ✓');
					}
				}

				for (const id of uniqueTargets) {
					const guild = await client.guilds.fetch(id);
					console.log(`${guild.name} (${id}) scope:`);
					const cmds = await guild.commands.fetch();
					printCommands(cmds);
					if (!flags.dryRun) {
						await guild.commands.set([]);
						console.log('  -> cleared ✓');
					}
				}

				if (flags.dryRun) {
					console.log('\nDry run — nothing changed. Remove --dry-run to undeploy.');
				}
				else {
					console.log('\nDone. Boot deployer will re-push the configured commands.');
				}
				resolve(true);
			}
			catch (e) {
				console.error('Undeploy failed:', e);
				resolve(false);
			}
			finally {
				client.destroy();
			}
		});

		client.login(config.token).catch(e => {
			console.error('Login failed:', e);
			resolve(false);
		});
	});

	process.exit(ok ? 0 : 1);
}

main();
