const mongo = require("mongodb").MongoClient;
let url = "mongodb://localhost:27017/arcane-bot";

var db;


module.exports  = {
    connectToServer: () => {
        mongo.connect(url,{useUnifiedTopology:true},(err,client)=>{
            db = client.db("arcane-bot");

            //console.log(db0);
            if(err){
                throw err;
            }
        })
    },

    getDb: () => {
        return db;
    }
}