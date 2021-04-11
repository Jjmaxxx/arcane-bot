const mongoUtil = require("../mongoUtil.js")
mongoUtil.connectToServer();

module.exports = {
	name: 'current',
	description: 'displays collection selected',
	execute(msg, args) {
        let db = mongoUtil.getDb();
        db.collection("LinkServerToCollection").findOne({ServerID:msg.guild.id},(err, document)=>{
            if(err) throw err;
            msg.channel.send("current collection selected is ***" + document.currentCollection+"***");
        })
    },
}