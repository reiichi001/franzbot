import {
	Events,
} from 'discord.js';
import logger, {
	log,
} from "../modules/logger.js";

export default {
	name: Events.Warn,
	async execute(client, warn) {
		logger.warn(`A warn event was sent by Discord.js: \n${JSON.stringify(warn)}`);
	},
};

