const logger = require("../modules/Logger");

exports.hydrate = async (client, channel) => {
	const API = "https://api.giphy.com/v1/gifs/random";
	const API_KEY = client.configdb.get("GIPHYAPI");
	const tag = "drink+water";
	const rating = "g";

	const URL = `${API}?api_key=${API_KEY}&tag=${tag}&rating=${rating}`;
	console.log(URL);

	try {
		const fetchRes = await fetch(URL);
		if (fetchRes.ok) {
			const body = await fetchRes.json();
			logger.debug(body);
			const randImageURL = body?.data?.images?.original?.url
				?? "https://media4.giphy.com/media/2IHOdLz7YncZ79XaN7/giphy.gif";
			// logger.debug(randImageURL);
			channel.send(randImageURL);
		}
	}
	catch (error) {
		logger.error(error);
	}
};
