const utils = require("../utils.js");
const mongoUtil = require("../mongoUtil.js");
mongoUtil.connectToServer();

module.exports = {
	name: 'listcollections',
	description: 'list available collections',
	execute(msg, args) {
        let db = mongoUtil.getDb();
        let collections = [];
        db.collection("insults").findOne({ServerID:msg.guild.id},(err, document)=>{
            if(err) throw err;
            collections.push({name: "default", value: "default insults list"});
            if(document != null && collections.length == 1){
                collections.push({name:document.collectionName, value: "custom server description here (i'll implement this later)"});
            }
            utils.embedMessage(`Here's this server's list of available collections`, collections, msg);
        })
    },
}