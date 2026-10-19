module.exports = client => {
	// EXTENDING NATIVE TYPES IS BAD PRACTICE. Why? Because if JavaScript adds this
	// later, this conflicts with native code. Also, if some other lib you use does
	// this, a conflict also occurs. KNOWING THIS however, this method is, we feel,
	// very useful in code.
	//
	// <String>.toPropercase() returns a proper-cased string such as:
	// "Mary had a little lamb".toProperCase() returns "Mary Had A Little Lamb"
	Object.defineProperty(
		String.prototype,
		"toProperCase",
		{
			value() {
				return this.replace(
					/([^\W_]+[^\s-]*) */gu,
					txt => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
				);
			},
		}
	);

	// These 2 process methods will catch exceptions and give *more details* about the error and stack trace.
	process.on("uncaughtException", err => {
		const errorMsg = err.stack.replace(new RegExp(`${__dirname}/`, "gu"), "./");
		client.logger.error(`Uncaught Exception: ${errorMsg}`);
		console.error(err);
		// Always best practice to let the code crash on uncaught exceptions.
		// Because you should be catching them anyway.
		process.exit(1);
	});

	process.on("unhandledRejection", err => {
		client.logger.error(`Unhandled rejection: ${err}`);
		console.error(err);
	});
};
