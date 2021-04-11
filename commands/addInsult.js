const mongoUtil = require("../mongoUtil.js");
mongoUtil.connectToServer();

// mongoClient.connect(url,{useUnifiedTopology:true},(err,client)=>{
//     db = client.db("arcane-bot");
//     if(err){
//         throw err;
//     }
// })

module.exports = {
	name: 'addinsult',
	description: 'adds insult to your collection',
	execute(msg, args) {
        let db = mongoUtil.getDb();
        console.log(args);
        let phrase = "";
        for(let i=0; i<args.length;i++){
            phrase+= `${args[i]} `;
        }
        phrase.trim();
        db.collection("LinkServerToCollection").findOne({'ServerID': `${msg.guild.id}`},(err,collection)=>{
            if(collection.currentCollection == "insults"){
                msg.channel.send("you can't add insults to the default collection stop. make a new collection");
            }else{
                db.collection("insults").updateOne({$and: [{'collectionName': `${collection.currentCollection}`},{'ServerID': `${msg.guild.id}`}]},{$push: {"insults": `${phrase}`}});
                msg.channel.send("insult added");
            }
        })
    },
}