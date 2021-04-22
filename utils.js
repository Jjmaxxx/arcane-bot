const Discord = require("discord.js");
module.exports = {
     createNewList: async (doc,insultList)=>{
        for(let i=0; i<doc.insults.length;i++){
            insultList.push({name:`${i}. ${doc.insults[i]}`, value: "** **", inline: true});
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
        return collectionsList;
    }
    }