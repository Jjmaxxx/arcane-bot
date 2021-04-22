const mongoUtil = require("../mongoUtil.js")
mongoUtil.connectToServer();
const mapDatabase = require("../mapDatabase.js");
module.exports = {
	name: 'list',
	description: 'debug dont use',
	execute(msg, args) {
        console.log(mapDatabase.dbMap);
    },
}