let dbMap = new Map();
let dbInsults = new Map();
module.exports = {
    mapLinkServerToCollection: (db)=>{
        db.collection("LinkServerToCollection").find().toArray().then((data)=>{
            for(let i=0; i<data.length;i++){
                dbMap.set(data[i].ServerID,{collections: data[i].collections, currentCollection: data[i].currentCollection, target: data[i].target})
            }
            //console.log(dbMap);
        })
    },
    mapInsults: (db)=>{
        db.collection('insults').find().toArray().then((data)=>{
            for(let i=0; i<data.length;i++){
                dbInsults.set(data[i].ServerID,{collectionName: data[i].collectionName, insults: data[i].insults});
            }
            //console.log(dbInsults);
        })
    }
}
module.exports.dbMap = dbMap;
module.exports.dbInsults = dbInsults;