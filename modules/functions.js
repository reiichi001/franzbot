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

	// Discord marks a bot offline the moment its gateway socket closes, so a
	// clean exit means closing that socket (client.destroy()) before dying.
	// Without this, Ctrl+C or a PM2 stop/restart leaves the session dangling and
	// the bot can show as online for a stretch afterwards. A hard kill (SIGKILL,
	// OOM, segfault) runs no code at all — there, Discord has no choice but to
	// notice the dead socket on its own, which it does within a few minutes.
	let shuttingDown = false;
	const shutdown = (exitCode, reason) => {
		if (shuttingDown) {
			return;
		}
		shuttingDown = true;
		// Never let a wedged socket hold the process open: destroy() gets this
		// long to finish, then the process dies regardless.
		setTimeout(() => process.exit(exitCode), 3000).unref();
		client.logger.log(`Shutting down (${reason}).`);
		client.destroy()
			.catch(err => client.logger.error(`Error closing the gateway connection: ${err}`))
			.finally(() => process.exit(exitCode));
	};

	// SIGINT is Ctrl+C and PM2's default stop/restart signal; SIGTERM is what
	// other supervisors conventionally send.
	process.on("SIGINT", () => shutdown(0, "SIGINT"));
	process.on("SIGTERM", () => shutdown(0, "SIGTERM"));

	// These 2 process methods will catch exceptions and give *more details* about the error and stack trace.
	process.on("uncaughtException", err => {
		const errorMsg = err.stack.replace(new RegExp(`${__dirname}/`, "gu"), "./");
		client.logger.error(`Uncaught Exception: ${errorMsg}`);
		console.error(err);
		// Always best practice to let the code crash on uncaught exceptions.
		// Because you should be catching them anyway. But crash cleanly: close
		// the gateway on the way out so the bot does not linger as online.
		shutdown(1, "uncaughtException");
	});

	process.on("unhandledRejection", err => {
		client.logger.error(`Unhandled rejection: ${err}`);
		console.error(err);
	});
};
