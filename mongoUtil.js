const mongo = require("mongodb").MongoClient;
let url = "mongodb://localhost:27017/arcane-bot";
let db;
module.exports = {
    connectToServer: () => {
        mongo.connect(url,{useUnifiedTopology:true},(err,client)=>{
            if(err) throw err;
            db = client.db("arcane-bot");
        })
    },
    getDb: () => {
        return db;
    }
}