let dbMap = new Map();
let dbInsults = new Map();
let defaultList = [];
//15 mins
let idleTimeout = 300000;
const utils = require("./utils.js");

module.exports = {
    mapLinkServerToCollection: (db)=>{
        db.collection("LinkServerToCollection").find().toArray().then((data)=>{
            for(let i=0; i<data.length;i++){
                dbMap.set(data[i].ServerID,{ServerID: data[i].ServerID, collections: data[i].collections, currentCollection: data[i].currentCollection, target: data[i].target})
            }
        })
    },
    default: (db)=>{
        db.collection("insults").findOne({ServerID:"global"},(err, document)=>{
            if(err) throw err;
            dbInsults.set(document.ServerID,{ServerID: document.ServerID, collectionName: document.collectionName, insults: document.insults});
            const run = async ()=>{
                defaultList = await utils.createNewList(dbInsults.get("global"), defaultList);
            }
            run(); 
        })
    },
    mapInsults: (db)=>{
        db.collection('insults').find().toArray().then((data)=>{
            for(let i=0; i<data.length;i++){
                dbInsults.set(data[i].ServerID,{ServerID: data[i].ServerID, collectionName: data[i].collectionName, insults: data[i].insults});
            }
        })

    },
    addServerToCollection: (db, msg)=>{
        db.collection("LinkServerToCollection").findOne({ServerID: msg.guild.id}, (err, document)=>{
            if(err) throw err;
            dbMap.set(document.ServerID, {ServerID: document.ServerID, timeOut: setTimeout(()=>{dbMap.delete(msg.guild.id); dbInsults.delete(msg.guild.id)},idleTimeout),collections: document.collections, currentCollection: document.currentCollection, target: document.target});
        })
    },
    addInsultToCollection: (db, msg)=>{
        db.collection("insults").findOne({ServerID:msg.guild.id},(err, document)=>{
            if(err) throw err;
            dbInsults.set(document.ServerID,{ServerID: document.ServerID, collectionName: document.collectionName, insults: document.insults});
        })
    },
    refreshTimeout: (msg)=>{
        //console.log(dbMap);
        let tempObj = dbMap.get(msg.guild.id);
        tempObj.timeOut = setTimeout(()=>{dbMap.delete(msg.guild.id); dbInsults.delete(msg.guild.id)},idleTimeout);
        dbMap.set(msg.guild.id, tempObj);
    },
    // listCollections: ()=>{
    //     console.log(dbMap);
    // },
    inCollection:(msg)=>{
        if(dbMap.has(msg.guild.id)){
            return true;
        }else{
            return false;
        }
    }
    //make overwrite function
    //map only for active servers make timeout function to get rid of it from map
}
module.exports.dbMap = dbMap;
module.exports.dbInsults = dbInsults;
module.exports.defaultList = defaultList;