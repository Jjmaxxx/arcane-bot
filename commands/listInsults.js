const mongo = require("mongodb");
const Discord = require("discord.js");
let mongoClient = mongo.MongoClient;
let url = "mongodb://localhost:27017/arcane-bot";
let db;
let index = require('../index');
mongoClient.connect(url,{useUnifiedTopology:true},(err,client)=>{
    db = client.db("arcane-bot");
    if(err){
        throw err;
    }
})
module.exports = {
	name: 'listinsults',
	description: 'list insults in collection',
	execute(msg, args) {
        db.collection('LinkServerToCollection').findOne({ServerID: `${msg.guild.id}`},(err, document)=>{
            if(err) throw err;
            let insultList = [];
            console.log(document.currentCollection);
            if(document.currentCollection == "insults"){
                db.collection('insults').findOne({collectionName: "insults"}, (err, doc)=>{
                    if(err) throw err;
                    insultList = createNewList(doc, insultList);
                    embedMessage(document.currentCollection,insultList, msg);
                })
            }else{
                db.collection(`insults`).findOne({$and: [{collectionName: `${document.currentCollection}`},{ServerID: `${msg.guild.id}`}]},(err, doc)=>{
                    if(err) throw err;
                    insultList = createNewList(doc, insultList);
                    embedMessage(document.currentCollection,insultList, msg);
                })
            }


            //console.log(result);
        })
    },
}
function createNewList(doc,insultList){
    for(let i=0; i<doc.insults.length;i++){
        insultList.push({name:doc.insults[i], value: 'idk how to get rid of these lines i will figure it out later im tired nightmarenightmarenightmare'});
    }
    return insultList;
}
function embedMessage(collection, insults, msg){
    let collectionsList = new Discord.MessageEmbed()
    .setTitle(`Here's ${collection}\'s list of insults`)
    .setColor('0x2471a3')
    .addFields(
        insults
    );
    msg.channel.send(collectionsList);
}