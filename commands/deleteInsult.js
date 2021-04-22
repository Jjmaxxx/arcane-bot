const mongoUtil = require("../mongoUtil.js");
mongoUtil.connectToServer();
const mapDatabase = require("../mapDatabase.js");
const listInsults = require("./listInsults.js");
const utils = require("../utils.js");
const Discord = require("discord.js");
module.exports = {
	name: 'delete',
	description: 'deletes an insult from your collection',
	execute(msg, args) {
        let db = mongoUtil.getDb();
        let getDoc = mapDatabase.dbMap.get(msg.guild.id);
        let getInsults = mapDatabase.dbInsults.get(msg.guild.id);
        let insultList = [];
        if(!isNaN(args)){
            if(args < 0 || args > getInsults.insults.length-1){
                msg.channel.send("get a valid index, use the command like $delete *number*");
            }else if(getInsults.insults.length <= 0){
                msg.channel.send("there aren't anymore insults left in this list");
            }else if(getDoc.currentCollection == "default"){
                msg.channel.send("you can't delete insults from default collection");
            }
            else{
                let newEmbed;
                let thing = "insults" + args;
                db.collection("insults").updateOne({$and: [{'collectionName': `${getDoc.currentCollection}`},{'ServerID': `${msg.guild.id}`}]},{$set: {thing: "die"}})
                db.collection("insults").updateOne({$and: [{'collectionName': `${getDoc.currentCollection}`},{'ServerID': `${msg.guild.id}`}]},{$pull: {"insults": "die"}});
                getInsults.insults.splice(args, 1);
                if(getInsults.ServerID == getDoc.ServerID && getDoc.currentCollection == getInsults.collectionName){
                    const run = async ()=>{
                        insultList = await utils.createNewList(getInsults, insultList);
                        newEmbed = new Discord.MessageEmbed()
                        .setTitle(`Here's ${getInsults.collectionName}\'s list of insults`)
                        .setColor('0x2471a3')
                        .addFields(
                            insultList
                        );
                        msg.channel.send(newEmbed);
                    }
                    run();        
                }
            }
        }else{
            msg.channel.send("??? what are you trying to delete");
        }
        //mapDatabase.dbInsults.get(msg.guild.id).insults.push(`${phrase}`);

    },
}