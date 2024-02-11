export const SECOND = 1000;
export const MINUTE = 60 * SECOND;
const lastResponseTimes = new Map(); // Map<string, number>

export function timeoutSet(identifier) {
	const currentTimeout = lastResponseTimes.get(identifier);
	return currentTimeout !== null && typeof currentTimeout !== "undefined";
}

export function timeoutEnded(identifier, timeoutMs) {
	return !timeoutSet(identifier)
		|| Date.now() - lastResponseTimes.get(identifier) > timeoutMs;
}


export function resetTimeout(identifier) {
	lastResponseTimes.set(identifier, Date.now());
}


// exports.timeoutSet = timeoutSet;
// exports.timeoutEnded = timeoutEnded;
// exports.resetTimeout = resetTimeout;
