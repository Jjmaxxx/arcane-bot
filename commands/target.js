const Discord = require("discord.js");
const index = require("../index.js");
const mongoUtil = require("../mongoUtil.js")
const utils = require("../utils.js");
mongoUtil.connectToServer();
const mapDatabase = require("../mapDatabase.js");
module.exports = {
	name: 'target',
	description: 'switch the target of the bot to; ex: $target',
	execute(msg, args) {
        let bot = index.bot;
        let db = mongoUtil.getDb();
        //let guild = bot.guilds.cache.get(`${msg.guild.id}`);
        if(msg.channel.type == "dm"){
            if(!args[0]){
                msg.channel.send("Example on the command should've been sent up there")
            }else{
                db.collection("LinkServerToCollection").updateOne({ServerID:args[0]}, {$set: {"target": `${args[1]}`}});
                //change map too
                msg.channel.send(`${args[1]} is now targeted. Next time they talk they will suffer.`);
            }
        }

        //guild.members.forEach(member => {console.log(member)});
        //bot.users.cache.get(`${msg.author.id}`).send("hvi9430kg039fi");
    },
}
