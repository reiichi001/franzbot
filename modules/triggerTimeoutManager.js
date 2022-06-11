const SECOND = 1000;
const MINUTE = 60 * SECOND;
const lastResponseTimes = new Map(); // Map<string, number>

function timeoutSet(identifier) {
	const currentTimeout = lastResponseTimes.get(identifier);
	return currentTimeout !== null && typeof currentTimeout !== "undefined";
}

exports.timeoutEnded = (identifier, timeoutMs) => !timeoutSet(identifier)
    || Date.now() - lastResponseTimes.get(identifier) > timeoutMs;

exports.resetTimeout = identifier => {
	lastResponseTimes.set(identifier, Date.now());
};

exports.SECOND = SECOND;
exports.MINUTE = MINUTE;

exports.timeoutSet = timeoutSet;
// exports.timeoutEnded = timeoutEnded;
// exports.resetTimeout = resetTimeout;
