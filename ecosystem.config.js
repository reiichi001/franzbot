module.exports = {
	apps: [
		{
			name: 'Franzbot Reborn',
			script: 'app.js',
			watch: [
				"*.js",
			],
			ignore_watch: [
				"node_modules",
				"perserversettings.json",
			],
			watch_options: {
				usePolling: false,
				alwaysStat: true,
				useFsEvents: false,
			},
		},
	],
};
