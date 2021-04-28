const mongoUtil = require("../mongoUtil.js")
mongoUtil.connectToServer();
const mapDatabase = require("../mapDatabase.js");
module.exports = {
	name: 'createlist',
	description: 'creates an empty list of insults for your server; ex: $createlist (name goes here)',
	execute(msg, args) {
        let db = mongoUtil.getDb();
        if(mapDatabase.dbMap.get(msg.guild.id)){
            msg.channel.send("Limit one list per server rn(i'll change it to allow more later i just need this to work rn)");
        }else{
            if(args == ""){
                msg.react("❌");
                msg.channel.send("give it a name bro; like this: $createlist *yournamehere*");
            }else if(args[0].toString().length < 2){
                msg.react("❌");
                msg.channel.send("make your name longer, like at least 3 letters. gotta make it look good y'know?");
            }else if(args[0] == "default"){
                msg.react("❌");
                msg.channel.send("ok but don't name it default");
            }else{
                msg.react("✅");
                msg.channel.send(`***${args}*** has been created`);
                //setting it in db and locally
                mapDatabase.dbMap.set(msg.guild.id, {ServerID: msg.guild.id, collections: [`${args}`], currentCollection: `${args}`, target: ""});
                db.collection("LinkServerToCollection").insertOne({ServerID: msg.guild.id, collections: [`${args}`], currentCollection: `${args}`, target:""});
                mapDatabase.dbInsults.set(msg.guild.id, {ServerID: msg.guild.id, collectionName: `${args}`, insults: []});
                db.collection("insults").insertOne({ServerID: msg.guild.id, collectionName: `${args}`, insults: []});
                console.log("document created");
            }
        }
    },
}