const mongoUtil = require("../mongoUtil.js");
mongoUtil.connectToServer();
const mapDatabase = require("../mapDatabase.js");

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
        let getDoc = mapDatabase.dbMap.get(msg.guild.id);
        if(getDoc.currentCollection == "default"){
            msg.channel.send("you can't add insults to the default collection stop. make a new collection");
        }else{
            db.collection("insults").updateOne({$and: [{'collectionName': `${getDoc.currentCollection}`},{'ServerID': `${msg.guild.id}`}]},{$push: {"insults": `${phrase}`}});
            mapDatabase.dbInsults.get(msg.guild.id).insults.push(`${phrase}`);
            console.log(mapDatabase.dbInsults)
            msg.channel.send("insult added");
        }
    },
}