const logger = require("../modules/Logger");
const JSONdb = require('simple-json-db');

const allowedRoles = [
	"Admin",
	"Administrator",
	"Officer",
	"Operator",
	"moderator",
	"tippy",
	"demogoat",
	"plugin developer",
	// "test",
	// "botters",
	"XIV on Mac Team",
	"Contributor",
	"XIVLauncher Developer",
];

exports.setSlowmode = async (member, channel, responseChannel, time, reason = null) => {
	logger.debug(`channel: ${channel} time: ${time} reason: ${reason}`);

	if (!member || !channel || !responseChannel || !time) {
		return false;
	}

	if (member.roles.cache.find(r => allowedRoles.includes(r.name))) {
		try {
			// calculate a supported time based on input
			let timeInSeconds;

			if (time.toLowerCase().endsWith("s")) {
				// time in seconds do not convert
				timeInSeconds = parseInt(time, 10);
			}
			else if (time.toLowerCase().endsWith("m")) {
				// time in minutes, convert to seconds
				timeInSeconds = parseInt(time, 10) * 60;
			}
			else if (time.toLowerCase().endsWith("h")) {
				// time in hours, convert to seconds
				timeInSeconds = parseInt(time, 10) * 60 * 60;
			}
			else if (time.toLowerCase() == "off") {
				// time in hours, convert to seconds
				timeInSeconds = 0;
			}
			else {
				// assume minutes for now
				timeInSeconds = parseInt(time, 10) * 60;
			}

			await channel.setRateLimitPerUser(
				Math.floor(timeInSeconds),
				`${reason} provided by ${member.displayName}` ?? `No reason provided by ${member.displayName}`
			);
			return true;
		}
		catch (err) {
			console.log(err);
			return false;
		}
	}
	else {
		return responseChannel.send("You do not have permission to use that command.");
	}
};
