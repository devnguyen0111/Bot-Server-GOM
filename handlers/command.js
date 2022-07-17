const { readdirSync } = require('fs');
const AsciiTable = require('ascii-table');
const Discord = require('discord.js');

module.exports = (client) => {
    let count = 0;
    let table = new AsciiTable('Command');
    table.setHeading('File', 'Aliases', 'Type', 'Status');
    readdirSync('./commands').forEach(dir => {
        const commands = readdirSync(`./commands/${dir}/`).filter(file => file.endsWith('.js'));
        for (const file of commands) {
            const pull = require(`../commands/${dir}/${file}`);
            if (pull.name) {
                // table.addRow(file, '', pull.type, 'Loaded');
                count++;
                client.commands.set(pull.name, pull);
                if (pull.aliases && Array.isArray(pull.aliases)) 
                pull.aliases.forEach(alias => client.aliases.set(alias, pull.name));
                table.addRow(file, pull.aliases, pull.type, 'Loaded');
            } else {
                continue;
            }
            
        }
    });
    client.logger.info('Loading commands...');
    client.logger.info(`\n${table.toString()}`);
    client.logger.success(`${count} lệnh đã sẵn sàng!`);
}