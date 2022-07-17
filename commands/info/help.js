const {MessageEmbed, MessageActionRow, MessageButton} = require('discord.js');
const { stripIndents } = require('common-tags');

module.exports = {
    name: 'help',
    aliases: ['h'],
    category: 'info',
    description: 'Hiển thị danh sách các lệnh có sẵn',
    usage: ['help [command]'],
    run: async (client, message, args) => {
        if (!args[0]) return getALL(client, message);
        return getCMD(client, message, args[0]);
    }
}

function getALL(client, message) {

    const button = new MessageActionRow()
        .addComponents(
            new MessageButton()
                .setLabel(`Invite Patrick-Bot`)
                .setEmoji(`979405613840859146`)
                .setStyle("LINK")
                .setURL(`https://discord.com/api/oauth2/authorize?client_id=958026503046709278&permissions=1644971949559&scope=bot%20applications.commands`)
        )
        .addComponents(
            new MessageButton()
                .setLabel(`Patrick-bot Support Server`)
                .setEmoji(`922060056986537985`)
                .setStyle("LINK")
                .setURL(`https://discord.gg/QcKuDwkZ8X`)
        );

    const embed = new MessageEmbed()
        .setAuthor({ name: `Patrick-Bot`, iconURL: message.author.displayAvatarURL() })
        .setColor('GREEN')
        .setTitle('Sử dụng "help [command]" để xem thêm chi tiết về lệnh!')
        .setFooter({ text: `${client.user.tag}`, iconURL: client.user.displayAvatarURL() })
        .setTimestamp()
    
    const commands = (category) => {
        return client.commands.filter(cmd => cmd.category === category).map(cmd => `\`${cmd.name}\``).join(',');
    }
    const info = client.categories
        .map(cat => stripIndents`**${cat[0].toUpperCase() + cat.slice(1)}** \n${commands(cat)}`)
        .reduce((string, category) => string + '\n' + category);
    return message.channel.send({ embeds: [embed.setDescription(info)] , embeds: [embed.setTimestamp()], components: [button] });
}

function getCMD(client, message, input) {
    const embed = new MessageEmbed()
    .setAuthor({ name: `Patrick-Bot`, iconURL: message.author.displayAvatarURL() })
    .setTimestamp()
    const cmd = client.commands.get(input) || client.commands.get(client.aliases.get(input));
    let info = `Không tìm thấy lệnh tên là: **${input}**`;

    if (!cmd) return message.channel.send({ embeds: [embed.setDescription(info)] , embeds: [embed.setTimestamp()] });
    if (cmd.name) info = `**Tên lệnh:** ${cmd.name}`;
    if (cmd.aliases) info += `\n**Các tên khác:** ${cmd.aliases.map(a => `\`${a}\``).join(', ')}`;
    if (cmd.description) info += `\n**Chi tiết lệnh:** ${cmd.description}`;
    if (cmd.usage) {
        info += `\n**Cách sử dụng:** ${cmd.usage}`;
        embed.setFooter({ text: "Cú pháp: <> = bắt buộc, [] = không bắt buộc" });
    }; 
    if (cmd.category) info += `\n**Thể loại:** ${cmd.category}`;
    return message.channel.send({ embeds: [embed.setDescription(info)] , embeds: [embed.setTimestamp()] });
}