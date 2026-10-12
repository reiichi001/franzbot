// modules/parse/logType.js
function determineLogType(filename) {
	if ((/\.launcher\.log$/iu).test(filename)) {
		return 'launcher';
	}
	if ((/\.dalamud\.log$/iu).test(filename)) {
		return 'dalamud';
	}
	if ((/\.output\.log$/iu).test(filename)) {
		return 'output';
	}
	return 'unknown';
}

function isBase64Encoded(data) {
	try {
		const decoded = Buffer.from(data, 'base64').toString('utf8');
		return decoded.length > 0;
	}
	catch {
		return false;
	}
}

function decodeBase64(data) {
	return Buffer.from(data, 'base64').toString('utf8');
}

module.exports = {
	determineLogType,
	isBase64Encoded,
	decodeBase64,
};
