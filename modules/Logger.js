/*
Logger class for easy and aesthetically pleasing console logging
*/
import {
	cyan, red, magenta, gray, yellow, white, green,
} from 'colorette';

import {
	Timestamp,
} from '@sapphire/time-utilities';

function printlog(content, type = "log") {
	const timestamp = `[${cyan(new Timestamp("YYYY-MM-DD HH:mm:ss"))}]:`;

	switch (type) {
		case "log": return console.log(`${timestamp} ${gray(type.toUpperCase())} ${content} `);
		case "warn": return console.log(`${timestamp} ${yellow(type.toUpperCase())} ${content} `);
		case "error": return console.log(`${timestamp} ${red(type.toUpperCase())} ${content} `);
		case "debug": return console.log(`${timestamp} ${magenta(type.toUpperCase())} ${content} `);
		case "cmd": return console.log(`${timestamp} ${white(type.toUpperCase())} ${content}`);
		case "ready": return console.log(`${timestamp} ${green(type.toUpperCase())} ${content}`);
		default: throw new TypeError("Logger type must be either warn, debug, log, ready, cmd or error.");
	}
}

function log(...args) {
	printlog(...args, "log");
}
function error(...args) {
	printlog(...args, "error");
}
function warn(...args) {
	printlog(...args, "warn");
}
function debug(...args) {
	printlog(...args, "debug");
}
function cmd(...args) {
	printlog(...args, "cmd");
}

export {
	log, error, warn, debug, cmd,
};
export default printlog;

