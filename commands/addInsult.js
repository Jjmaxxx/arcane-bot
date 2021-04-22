const mongoUtil = require("../mongoUtil.js");
mongoUtil.connectToServer();
const mapDatabase = require("../mapDatabase.js");
module.exports = {
	name: 'add',
	description: 'adds insult to current collection; ex: $add (insult goes here)',
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
            if(args == ""){
                msg.channel.send("you're literally trying to add nothing stop put in an insult after");
            }
            else if(args[0].length > 255){
                msg.channel.send("you can't have an insult over 255 characters in length bc the api for the lists weren't made to go over that");
            }
            else{
                console.log(args[0].length);
                db.collection("insults").updateOne({$and: [{'collectionName': `${getDoc.currentCollection}`},{'ServerID': `${msg.guild.id}`}]},{$push: {"insults": `${phrase}`}});
                mapDatabase.dbInsults.get(msg.guild.id).insults.push(`${phrase}`);
                console.log(mapDatabase.dbInsults)
                msg.channel.send("insult added");
            }
        }
    },
}