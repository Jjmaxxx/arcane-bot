const mongo = require("mongodb");
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
	name: 'addinsult',
	description: 'adds insult to your collection',
	execute(msg, args) {
        let serverCollection;
        db.collection("LinkServerToCollection").findOne({ServerID:msg.guild.id},(err, document)=>{
            if(err) throw err;
            db.collection(`${document.collectionName}`).insertOne({insult: `${args}`});
            msg.channel.send("insult added");
        })

    },
}