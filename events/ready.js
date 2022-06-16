module.exports = (client) => {
    client.logger.success(`${client.user.username} đã sẵn sàng!`);
    client.user.setPresence({ activities: [{ name: 'DiscordJS testing'}], status: 'online'} );
    client.logger.info(`${client.user.username} đang hoạt động trong ${client.guilds.cache.size} Server`);
}