const mongoUtil = require("../mongoUtil.js")
mongoUtil.connectToServer();
const mapDatabase = require("../mapDatabase.js");
module.exports = {
	name: 'current',
	description: 'displays collection selected; ex: $current',
	execute(msg, args) {
        let getDoc = mapDatabase.dbMap.get(msg.guild.id);
        if(!getDoc){
            msg.channel.send("current collection selected is ***default***")
        }else if(getDoc){
            console.log(getDoc);
            msg.channel.send("current collection selected is ***" + getDoc.currentCollection+"***");
        }
    },
}