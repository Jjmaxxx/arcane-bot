const mongoUtil = require("../mongoUtil.js")
const utils = require("../utils.js");
mongoUtil.connectToServer();
module.exports = {
	name: 'listinsults',
	description: 'list insults in collection',
	execute(msg, args) {
        let db = mongoUtil.getDb();
        db.collection('LinkServerToCollection').findOne({ServerID: `${msg.guild.id}`},(err, document)=>{
            if(err) throw err;
            let insultList = [];
            if(document.currentCollection == "default"){
                db.collection('insults').findOne({collectionName: "default"}, (err, doc)=>{
                    if(err) throw err;
                    insultList = utils.createNewList(doc, insultList);
                    utils.embedMessage(`Here's ${doc.collectionName}\'s list of insults`,insultList, msg);
                })
            }else{
                db.collection(`insults`).findOne({$and: [{collectionName: `${document.currentCollection}`},{ServerID: `${msg.guild.id}`}]},(err, doc)=>{
                    if(err) throw err;
                    insultList = utils.createNewList(doc, insultList);
                    utils.embedMessage(`Here's ${doc.collectionName}\'s list of insults`,insultList, msg);
                })
            }


            //console.log(result);
        })
    },
}
