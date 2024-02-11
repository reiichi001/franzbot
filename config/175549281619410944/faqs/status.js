export const answer = async client => [
	{
		title: "Project Meteor Implementation Status",
		description: "This is difficult to quantify. Chances are, whatever feature you're hoping to have implemented isn't quite ready yet for any variety of reasons. These sorts of questions cannot be answered clearly or with a percentage number and are often between varying degrees of implemented to no current plans to implement.",
		color: 10197915,
		footer: {
			"text": client.configdb.get("FRANZBOT_VERSION"),
		},
	},
	{

		title: "Working features",
		description: "+ Logging in: implemented\n"
        + "+ Character creation and deletion: implemented\n"
        + "+ Multiple players in zones: implemented\n"
        + "+ Chatting: mostly implemented (linkshells tba)\n"
        + "+ Parties: implemented",
		color: 7779621,
	},
	{

		title: "Partially working features",
		description: "* Combat: base code in progress\n"
        + "* Monster AI: base code in progress\n"
        + "* Monster Pathfinding: base code in progress; navmeshes not generated\n"
        + "* Equipping gear: graphics IDs are linked.\n"
        + "* Leveling up: requires debug commands at this time",
		color: 16312092,
	},
	{

		title: "Not-working or unimplemented",
		description: "- Gear Stats: not implemented\n"
        + "- Monster Spawnpoints: supported, but not implemented\n"
        + "- Quests: generally not implemented\n"
        + "- Crafting and Gathering: widgets can be spawned, but not implemented",
		color: 13632027,
	},
];

export const info = {
	name: "status",
	category: "info",
	aliases: ["progress"],
};
