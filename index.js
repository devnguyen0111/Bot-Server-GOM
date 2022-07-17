const { Client, Intents, Collection } = require('discord.js');
require('dotenv').config();

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

client.commands = new Collection();
client.aliases = new Collection();
client.categories = new Collection();
client.interactions = new Collection();
client.cooldowns = new Collection();
client.logger = require("./logger.js");
const voiceCollection = new Collection();

client.on('voiceStateUpdate', async (client, oldState, newState) => {

    if(!oldState.channel && newState.channel.id === "964810739078537228"){
        let user = await client.users.fetch(newState.id);
        let option = {
            type: 'GUILD_VOICE',
            parent: newState.channel.parent,
            permissionOverwrites: [
                {
                    id: newState.id,
                    allow: ['MANAGE_CHANNELS','MANAGE_ROLES','MUTE_MEMBERS','DEAFEN_MEMBERS','MOVE_MEMBERS']
                }
            ]
        }
        let channel = await newState.guild.channels.create(user.tag, option).catch(error => console.error(error));

        newState.member.voice.setChannel(channel);
        voiceCollection.set(user.id, channel.id);

    } else if(!newState.channel){
        if(oldState.channelId === voiceCollection.get(newState.id)){
            oldState.channel.delete();
        }
    }

});


['command', 'event', 'slashCommand'].forEach(handler => require(`./handlers/${handler}`)(client));

client.login(process.env.TOKEN);