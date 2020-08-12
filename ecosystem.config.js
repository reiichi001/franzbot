module.exports = {
	apps: [
		{
			name: 'Franzbot Reborn',
			script: 'app.js',
			watch: true,
			env: {
				NODE_ENV: 'development',
			},
			env_production: { // eslint-disable-line camelcase
				NODE_ENV: 'production',
			},
		},
	],
};
