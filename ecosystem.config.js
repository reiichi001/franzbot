module.exports = {
	apps: [
		{
			name: 'Franzbot Reborn',
			script: 'app.js',
			watch: true,
			ignore_watch: [ // eslint-disable-line camelcase
				"node_modules",
				"config.conf",
				"perserversettings.json",
			],
			env_development: { // eslint-disable-line camelcase
				NODE_ENV: 'development',
			},
			env_production: { // eslint-disable-line camelcase
				NODE_ENV: 'production',
			},
		},
	],
};
