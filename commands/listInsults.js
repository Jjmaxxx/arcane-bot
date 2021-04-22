const mongoUtil = require("../mongoUtil.js")
const utils = require("../utils.js");
mongoUtil.connectToServer();
const mapDatabase = require("../mapDatabase.js");
let insultList = [];
module.exports = {
	name: 'listinsults',
	description: 'list insults in current collection; ex: $listinsults',
	execute(msg, args) {
        insultList = [];
        let getDoc = mapDatabase.dbMap.get(msg.guild.id);
        let getInsults = mapDatabase.dbInsults.get(msg.guild.id);
        if(getDoc.currentCollection == "default"){
            console.log(mapDatabase.defaultList);
            utils.embedMessage(`Here's default's list of insults`, mapDatabase.defaultList, msg);
        }else{
            if(getInsults.ServerID == getDoc.ServerID && getDoc.currentCollection == getInsults.collectionName){
                const run = async ()=>{
                    insultList = await utils.createNewList(getInsults, insultList);
                    utils.embedMessage(`Here's ${getInsults.collectionName}\'s list of insults`,insultList, msg);
                }
                run(); 
            }
        }

    },
}
module.exports.insultList = insultList;