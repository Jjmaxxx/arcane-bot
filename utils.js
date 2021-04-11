const Discord = require("discord.js");
module.exports = {
    createNewList: (doc,insultList)=>{
        for(let i=0; i<doc.insults.length;i++){
            insultList.push({name:doc.insults[i], value: 'idk how to get rid of these lines i will figure it out later im tired nightmarenightmarenightmare'});
        }
        return insultList;
    },
    embedMessage: (title, query, msg)=>{
        let collectionsList = new Discord.MessageEmbed()
        .setTitle(title)
        .setColor('0x2471a3')
        .addFields(
            query
        );
        msg.channel.send(collectionsList);
    }
    }