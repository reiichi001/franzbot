/* eslint-disable camelcase -- PM2 API requires these snake_case field names */
module.exports = {
	apps: [
		{
			name: 'Franzbot Reborn',
			script: 'app.js',
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
