const mongo = require("mongodb");
const Discord = require("discord.js");
let mongoClient = mongo.MongoClient;
let url = "mongodb://localhost:27017/arcane-bot";
let db;
let index = require('../index');
mongoClient.connect(url,{useUnifiedTopology:true},(err,client)=>{
    db = client.db("arcane-bot");
    if(err){
        throw err;
    }
})
module.exports = {
	name: 'list',
	description: 'list available collections',
	execute(msg, args) {
        let collections = [];
        db.collection("LinkServerToCollection").findOne({ServerID:msg.guild.id},(err, document)=>{
            if(err) throw err;
            collections.push({name: "insults", value: "default insults list"});
            if(document != null){
                collections.push({name:document.collectionName, value: "custom server description here (i'll implement this later)"});
            }
            let collectionsList = new Discord.MessageEmbed()
                .setTitle("Here's this server's list of available collections")
                .setColor('0x2471a3')
                .addFields(
                    collections
                );
                msg.channel.send(collectionsList);
        })
    },
}