module.exports = (client) => {
    client.logger.success(`${client.user.username} đã sẵn sàng!`);
    client.user.setPresence({ activities: [{ name: 'DiscordJS testing'}], status: 'online'} );
    client.logger.info(`${client.user.username} is running on ${client.guilds.cache.size} server(s)`);
}