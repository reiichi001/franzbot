function explain(query) {
	const terms = (query ?? "")
		.trim()
		.split(/\s+/u)
		.filter(Boolean);

	return `\u200Bhttps://google.com/search?q=${terms.join("+")}`;
}

module.exports = {
	explain,
};
