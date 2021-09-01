module.exports = async client => {
	// Log that the bot is online.
	const tag = client.user.tag;
	const usercount = client.users.cache.size;
	const users = `user${usercount == 1 ? '' : 's'}`;
	const servercount = client.guilds.cache.size;
	const servers = `server${servercount == 1 ? '' : 's'}`;
	client.logger.log(
		`${tag}, ready to serve ${usercount} ${users} in ${servercount} ${servers}.`,
		"ready"
	);

	// Make the bot "play the game" which is the help command with default prefix.
	client.user.setActivity(
		`Franzbot Reborn`,
		{
			type: "PLAYING",
		}
	);
};
