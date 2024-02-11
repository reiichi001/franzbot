export const execute = async (client, message) => {
	if (message.content.includes("this is a test")) {
		message.channel.send("Test worked.");
	}
};

export const info = {
	name: "test",
};
