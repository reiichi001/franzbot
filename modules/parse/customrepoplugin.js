/* eslint-disable max-len */
import {
	EmbedBuilder,
} from 'discord.js';
export const nagMessage = async client => new EmbedBuilder()
	.setTitle(`Please disable plugins from custom repositories`)
	.setDescription(`Support for plugins from external sources is not provided here. `
		+ `In order for us to help you, please disable or remove any plugins that have come from a `
		+ `custom plugin respository that you added in Dalamud Settings.\n\n`
		+ `Unsupported plugins will have a yellow 3 on their icon in the plugin installer. `
		+ `If your game is crashing before you can uninstall them, `
		+ `you can also remove plugins manually - see \`f!faq delete plugin\`.`)
	.setColor(client.configdb.get("EMBED_NORMAL_COLOR"))
	.setThumbnail("https://cdn.discordapp.com/attachments/687530726756712478/968717497610149908/unknown.png")
	.setFooter({
		"text": client.configdb.get("FRANZBOT_VERSION"),
	});
export default nagMessage;
