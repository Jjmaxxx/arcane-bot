const utils = require("../utils.js");
const mongoUtil = require("../mongoUtil.js");
mongoUtil.connectToServer();
const mapDatabase = require("../mapDatabase.js");
module.exports = {
	name: 'listcollections',
	description: 'lists available collections; ex: $listcollections',
	execute(msg, args) {
        let collections = [];
        let getInsults = mapDatabase.dbInsults.get(msg.guild.id);
        collections.push({name: "default", value: "default insults list"});
        if(getInsults != null){
            collections.push({name:getInsults.collectionName, value: "placeholder (i'll implement this later)"});
        }
        utils.embedMessage(`Here's this server's list of available collections`, collections, msg);
    },
}