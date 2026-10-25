/* eslint-disable camelcase -- PM2 API requires these snake_case field names */
module.exports = {
	apps: [
		{
			name: 'Franzbot Reborn',
			script: 'app.js',
			// Give up after 5 failed restarts so a persistent crash stops
			// looping silently; admins must check logs and start it manually.
			max_restarts: 5,
			// A run shorter than this counts as a failed restart.
			min_uptime: '30s',
			// Scope the watch to source directories plus FAQ additions, so
			// runtime state writes under config/ never bounce the app.
			watch: [
				"app.js",
				"commands",
				"events",
				"slash",
				"modules",
				"buttons",
				"config/*/faqs",
			],
			ignore_watch: [
				"node_modules",
				"**/perserversettings.json",
			],
			watch_options: {
				usePolling: false,
				alwaysStat: true,
				useFsEvents: false,
			},
		},
	],
};
