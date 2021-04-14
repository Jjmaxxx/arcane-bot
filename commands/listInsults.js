const mongoUtil = require("../mongoUtil.js")
const utils = require("../utils.js");
mongoUtil.connectToServer();
const mapDatabase = require("../mapDatabase.js");
module.exports = {
	name: 'listinsults',
	description: 'list insults in collection',
	execute(msg, args) {
        let db = mongoUtil.getDb();
        let getDoc = mapDatabase.dbMap.get(msg.guild.id);
        let getInsults = mapDatabase.dbInsults.get(msg.guild.id);
        let insultList = [];
        if(getDoc.currentCollection == "default"){
            insultList = utils.createNewList(mapDatabase.dbInsults.get("global"), insultList);
            utils.embedMessage(`Here's ${mapDatabase.dbInsults.get("global").collectionName}\'s list of insults`,insultList, msg);
        }else{
            if(getInsults.ServerID == getDoc.ServerID && getDoc.currentCollection == getInsults.collectionName){
                insultList = utils.createNewList(getInsults, insultList);
                utils.embedMessage(`Here's ${getInsults.collectionName}\'s list of insults`,insultList, msg);
            }
        }

    },
}
