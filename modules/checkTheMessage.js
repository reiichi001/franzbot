/*
		const forbidAny = []; // an array of regex, at least one must match to complain
		const forbidCount = []; // same value type, a minimum number must match
		const negateBadWords = []; // same type again, these matches count against the bad word matches
		let forbiddenMinCount; // the number of forbidCount match results to complain
		let adjustedMinCount; // the number of ADJUSTED bad word match results to complain
		const ignoredRoles = []; // an array of roles to ignore messages from
		let replyMessage; // whatever this is, it gets sent via `message.reply()` unless it's falsey
*/

exports.checkTheMessage = (
	client,
	message,
	forbidAny,
	forbidCount,
	negateBadWords,
	forbiddenMinCount,
	adjustedMinCount,
	ignorelength,
	replyMessage
) => {
	const ignoredRoles = client.perserversettings?.get(`${message.guild.id}-serversettings`)?.get("ignoredRoles");
	// will keep names for legacy support, but let's not add any new ones, OK? :)
	if (message.member?.roles?.cache.some(
		r => Object.values(ignoredRoles).includes(r.id)
			|| ignoredRoles.includes(r.name))
	) { // legacy for arrays that aren't converted to dict-like objects yet
		// console.log("Ignored role. Skipping this check.");
		return;
	}

	let offsetWeight = 0;
	let hasForbidAny = false;
	let forbidCountQuantity = 0;
	const forbidden = new Set();

	if (!forbidAny) {
		forbidAny = [];
	}
	if (!Array.isArray(forbidAny)) {
		forbidAny = [forbidAny];
	}
	if (!forbidCount) {
		forbidCount = [];
	}
	if (!Array.isArray(forbidCount)) {
		forbidCount = [forbidCount];
	}
	if (!negateBadWords) {
		negateBadWords = [];
	}
	if (!Array.isArray(negateBadWords)) {
		negateBadWords = [negateBadWords];
	}

	for (const forbid of forbidAny) {
		const results = message?.content?.match(forbid);
		if (results) {
			hasForbidAny = true;
			const noun = `forbidden word${results.length == 1 ? '' : 's'}`;
			console.log(`Matched ${results.length} ${noun}: ${results.join(',')}`);
			for (const item of results) {
				forbidden.add(item);
			}
		}
	}
	for (const forbid of forbidCount) {
		const results = message?.content?.match(forbid);
		if (results) {
			forbidCountQuantity += results.length;
			const noun = `bad word${results.length == 1 ? '' : 's'}`;
			console.log(`Matched ${results.length} ${noun}: ${results.join(',')}`);
			for (const item of results) {
				forbidden.add(item);
			}
		}
	}

	for (const permit of negateBadWords) {
		const results = message?.content?.match(permit);
		if (results) {
			offsetWeight = results.length;
			const noun = `good word${results.length == 1 ? '' : 's'}`;
			console.log(`Matched ${results.length} ${noun}: ${results.join(',')}`);
		}
	}

	// console.log(`Bad wordset: ${forbidden.size} Goodwords: ${offsetWeight}`);
	// console.log(`Ignoring message length: ${ignorelength}`);

	const adjustedWordWeight = forbidden.size - offsetWeight;
	if (replyMessage
		&& hasForbidAny
		&& forbidCountQuantity >= forbiddenMinCount
		&& adjustedWordWeight >= adjustedMinCount
		// if it's longer than a tweet, it's probably a false positive
		&& (message.content.length <= 220 || ignorelength === true)
	) {
		if (Array.isArray(replyMessage)) {
			message.reply({
				embeds: replyMessage,
				allowedMentions: {
					repliedUser: false,
				},
			});
		}
		else {
			message.reply({
				embeds: [replyMessage],
				allowedMentions: {
					repliedUser: false,
				},
			});
		}
	}
};
