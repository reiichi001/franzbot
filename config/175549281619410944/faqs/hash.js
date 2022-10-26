exports.answer = async client => ({

	title: "Final Fantasy XIV 1.0 Installation Disc hashes",
	description: "Here is some information about the official 1.0 install disc if you'd like to verify that yours is not damaged or tampered with.",
	color: client.config.EMBED_NORMAL_COLOR,
	footer: {
		"text": client.config.FRANZBOT_VERSION,
	},
	fields: [
		{
			"name": "MD5",
			"value": "`acb251ad6d246ff1f1d68b6c6c78b234`",
		},
		{
			"name": "SHA1",
			"value": "`3df40d83b227484a302d3f51615d1d90f419daf6`",
		},
	],
});

exports.info = {
	name: "hash",
	category: "info",
	aliases: [
		"sha",
		"sha1",
		"sha-1",
		"md5",
	],
};
