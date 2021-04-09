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
        if(args == "insults"){
            db.collection("LinkServerToCollection").updateOne({ServerID:msg.guild.id}, {$set: {"currentCollection": `${args[0]}`}});
            msg.channel.send(`***${args}*** has now been selected`);
        }else{
            db.collection('insults').findOne({$and: [{collectionName: `${args[0]}`},{ServerID: `${msg.guild.id}`}]},(err, document)=>{
                console.log('run1');
                console.log(document);
                if(err) throw err;
                if(document){
                    console.log('run2');
                    db.collection("LinkServerToCollection").updateOne({ServerID:msg.guild.id}, {$set: {"currentCollection": `${args[0]}`}});
                    msg.channel.send(`***${args}*** has now been selected`);
                }else{
                    msg.channel.send(`The collection ***${args}*** doesn't exist`)
                }
            });
        }
        console.log(args[0]);
        console.log(`\"${msg.guild.id}\"`);
        
    },
}