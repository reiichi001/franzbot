import {
	Events,
} from 'discord.js';
import * as logger from "../modules/logger.js";

export default {
	name: Events.Error,
	async execute(error) {
		console.error(error);
		logger.error(`An error event was sent by Discord.js: \n${JSON.stringify(error)}`);
	},
};

