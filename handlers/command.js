const { readdirSync } = require('fs');
const AsciiTable = require('ascii-table');
const Discord = require('discord.js');
const {join, resolve} = require('path');
/**
     * Loads all available commands
     * @param {string} path
     */
module.exports = (client) => {
    client.types = {
        INFO: 'info',
        FUN: 'fun',
        POINTS: 'points',
        SMASHORPASS: 'Smash or Pass',
        NSFW: 'NSFW 18+',
        MISC: 'misc',
        MOD: 'mod',
        MUSIC: 'music',
        ADMIN: 'admin',
        MANAGER: 'manager',
        OWNER: 'owner',
    };
    client.commands = new Discord.Collection();
    client.aliases = new Discord.Collection();
    

    // loadCommands(path) {
        client.logger.info('Loading commands...');
        let table = new AsciiTable('Command');
        table.setHeading('File', 'Aliases', 'Type', 'Status');

        // readdirSync(path).filter(f => !f.endsWith('.js')).forEach(dir => {
            readdirSync('./commands').forEach(dir => {
            const commands = readdirSync(`./commands/${dir}/`).filter(file => file.endsWith('.js'));

            commands.forEach(f => {
                // const Command = require(resolve(__basedir, join(path, dir, f)));
                const Command = require(`../commands/${dir}/${f}`);
                // client.commands.set(Command.name, Command);
                // table.addRow(Command.name, Command.aliases.join(', '), Command.type, 'Loaded');
                // client.logger.info(`Loaded command ${Command.name}`);
                const command = client.commands.get(Command.name);
                if(Command.name && !Command.disable) {
                    client.commands.set(Command.name, command);

                    let aliases = '';
                    if(Command.aliases) {
                        Command.aliases.forEach(alias => {
                            client.aliases.set(alias, command);
                        });
                        aliases = Command.aliases.join(', ');
                    }
                    
                    let type = '';
                    if(Command.type) {
                        Command.type.forEach(t => {
                            type += `${t}, `;
                        });
                        type = type.slice(0, -2);
                    }

                    table.addRow(f, aliases, Command.type, 'Loaded');
                } else {
                    client.logger.warn(`${f} false to load`);
                    table.addRow(f, '', '', 'False');
                }
            });
        // });
            });
        client.logger.info(`\n${table.toString()}`);
        return client;
    // };














    // let count = 0;
    // readdirSync('./commands').forEach(dir => {
    //     const commands = readdirSync(`./commands/${dir}/`).filter(file => file.endsWith('.js'));
    //     for (const file of commands) {
    //         const pull = require(`../commands/${dir}/${file}`);
    //         if (pull.name) {
    //             count++;
    //             client.commands.set(pull.name, pull);
    //         } else {
    //             continue;
    //         }
    //         if (pull.aliases && Array.isArray(pull.aliases)) pull.aliases.forEach(alias => client.aliases.set(alias, pull.name));
    //     }
    // });

    client.logger.success(`${count} lệnh đã sẵn sàng!`);
}