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
	name: 'switch',
	description: 'switch from current collection',
	execute(msg, args) {
        db.listCollections({name: `${args}`})
        .next((err, collection)=>{
            if(err) throw err;
            if(collection){
                db.collection("LinkServerToCollection").updateOne({ServerID:msg.guild.id}, {$set: {"currentCollection": `${args}`}});
                msg.channel.send(`***${args}*** has now been selected`);
            }else{
                msg.channel.send(`The collection ***${args}*** doesn't exist`)
            }
        });
    },
}