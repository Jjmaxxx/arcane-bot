const mongoUtil = require("../mongoUtil.js")
mongoUtil.connectToServer();
const mapDatabase = require("../mapDatabase.js");
module.exports = {
	name: 'list',
	description: 'debug dont use i will consume your soul (but seriously if you use this command nothing happens i need it for testing)',
	execute(msg, args) {
        console.log(mapDatabase.dbMap);
    },
}