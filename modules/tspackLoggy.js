// Tspack S3 upload + Loggy link, extracted from relayFile.js so the flows that
// need the Loggy link WITHOUT relaying (the DM upload flow) can share it with
// the relay path. Same key derivation as before the extraction: callers pass
// `source.guild?.id ?? 'directmessage'`, so identical re-uploads dedupe to the
// same S3 key they always did.

const URLSafeBase64 = require('urlsafe-base64');
const {
	createHash,
} = require('crypto');
const {
	S3Client, PutObjectCommand,
} = require("@aws-sdk/client-s3");

/**
 * Upload a .tspack attachment to the support S3 bucket and derive the Loggy
 * reader URL for it. Discord killed Franz's proxy, which is why the file is
 * copied to S3 at all — Loggy fetches it from there.
 *
 * @returns {Promise<{s3Url: string, loggyUrl: string}>}
 */
exports.uploadTspackToS3 = async (client, attachment, author, guildId) => {
	console.log(`Troubleshooting pack upload: ${attachment.attachment}`);

	const response = await fetch(attachment.attachment);
	const buffer = Buffer.from(await response.arrayBuffer());
	const bucketName = "dalamud-support";

	const origKeyName = `${guildId}/${author.id}-${attachment.name}`;
	let safeKeyName = `${createHash('sha1').update(origKeyName)
		.digest('hex')}`;
	safeKeyName = URLSafeBase64.encode(Buffer.from(safeKeyName, 'hex'));
	const keyName = `tspacks/${safeKeyName}.tspack`;
	const objectTags = `io.franzbot.tspack/source_user_id=${author.id}&io.franzbot.tspack/source_guild_id=${guildId}`;

	const s3Client = new S3Client({
		region: client.config.AWS_REGION,
		credentials: {
			accessKeyId: client.config.AWS_KEY,
			secretAccessKey: client.config.AWS_KEYSECRET,
		},
	});

	await s3Client.send(
		new PutObjectCommand({
			Bucket: bucketName,
			Key: keyName,
			Body: buffer,
			Tagging: objectTags,
		})
	);

	const s3Url = `https://${bucketName}.s3.amazonaws.com/${keyName}`;
	const safebase64url = URLSafeBase64.encode(Buffer.from(s3Url));
	const loggyUrl = `https://loggy.goat.place/?url=${safebase64url}`;

	return {
		s3Url,
		loggyUrl,
	};
};
