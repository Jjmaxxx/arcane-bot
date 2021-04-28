const mongoUtil = require("../mongoUtil.js");
mongoUtil.connectToServer();
const mapDatabase = require("../mapDatabase.js");
module.exports = {
	name: 'info',
	description: 'displays current bot info for this server; ex: $info',
	execute(msg, args) {
        let getDoc = mapDatabase.dbMap.get(msg.guild.id);
        msg.channel.send(`My target is *${getDoc.target}*, current collection is *${getDoc.currentCollection}* and collection(s) are *${getDoc.collections[0]}* `);
    },
}