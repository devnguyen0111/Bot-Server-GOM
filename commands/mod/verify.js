const { Message, Client, MessageEmbed } = require("discord.js");
let correct = '✅'

let verifyemoji = ':verified:'
module.exports = {
    name: "verify",
    aliases: ['p'],
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {

      
        let role = message.guild.roles.cache.find(role => role.name === "VERIFIED✅")

            if(!role) return message.reply("Couldn't find role name `VERIFIED✅` in this server. Please create a role with `VERIFIED✅` name along with necessary permissions to role.")

            if(message.member.roles.cache.some(role => role.name === 'VERIFIED✅')) return message.reply("You are already verified")
            

        message.member.roles.add(role)
        let embed = new MessageEmbed()
        .setTitle(`**VERIFIED**`)
        //.setAuthor("Bot_Name Verify", "You_Can_add_Image_Here")
        // .setThumbnail("You_can_add_image_here")
        .setDescription(`${verifyemoji} ${message.author.username} ${verifyemoji}`)
        
        .setColor("GREEN")
        .setFooter('Now enjoy all channels')
        
        let msg7 = await message.channel.send({embeds: [embed] })
            message.delete();
        
            setTimeout(() => {
            msg7.delete()
            }, 10000);
      
 
      
    }
}