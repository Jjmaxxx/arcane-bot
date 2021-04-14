const mongoUtil = require("../mongoUtil.js");
mongoUtil.connectToServer();
const mapDatabase = require("../mapDatabase.js");
module.exports = {
	name: 'switch',
	description: 'switch from current collection',
	execute(msg, args) {
        let db = mongoUtil.getDb();
        let getDoc = mapDatabase.dbMap.get(msg.guild.id);
        if(args == "default"){
            getDoc.currentCollection = "default";
            mapDatabase.dbMap.set(msg.guild.id,{getDoc});
            db.collection("LinkServerToCollection").updateOne({ServerID:msg.guild.id}, {$set: {"currentCollection": `${args[0]}`}});
            console.log(mapDatabase.dbMap);
            msg.channel.send(`***${args}*** has now been selected`);
        }else{
            if(getDoc.collections[0] != args[0]){
                msg.channel.send(`The collection ***${args}*** doesn't exist`);
            }else{
                getDoc.currentCollection = args[0];
                mapDatabase.dbMap.set(msg.guild.id,{getDoc});
                db.collection("LinkServerToCollection").updateOne({ServerID:msg.guild.id}, {$set: {"currentCollection": `${args[0]}`}});
                console.log(mapDatabase.dbMap);
                msg.channel.send(`***${args}*** has now been selected`);
            }
        }
    },
}