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
	name: 'current',
	description: 'displays collection selected',
	execute(msg, args) {
        db.collection("LinkServerToCollection").findOne({ServerID:msg.guild.id},(err, document)=>{
            if(err) throw err;
            msg.channel.send("current collection selected is ***" + document.currentCollection+"***");
        })
    },
}