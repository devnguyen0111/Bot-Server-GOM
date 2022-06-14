const { CommandInteraction, Client, MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");

module.exports = {
	name: "invite",
	category: "Utilities",
	path: "Utilities/invite.js",
	description: "Invite me to your server!",

	/**
	 *
	 * @param {CommandInteraction} interaction
	 * @param {Client} client
	 */
	run: async (client, interaction) => {
		const inviteID = await require("../../Systems/inviteSys")(client);
		const Invite = new MessageEmbed().setTitle("Invite Me!").setDescription("I'm a cool Discord Bot, ain't I? Use the buttons below to invite me to your server or join our support server!\n\nStay Safe 👋").setColor("RED").setThumbnail(client.user.displayAvatarURL());

		let row = new MessageActionRow().addComponents(
			new MessageButton().setURL(`https://discord.com/api/oauth2/authorize?client_id=${client?.user?.id}&permissions=8&scope=bot%20applications.commands`).setLabel("Invite Me").setStyle("LINK"),

			new MessageButton().setURL(`https://discord.gg/T8agbAKkUv`).setLabel("Support Server").setStyle("LINK")
		);

		return interaction.reply({
			embeds: [Invite],
			components: [row],
			ephemeral: true,
		});
	},
};