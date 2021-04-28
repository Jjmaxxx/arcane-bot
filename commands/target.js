const Discord = require("discord.js");
const index = require("../index.js");
const mongoUtil = require("../mongoUtil.js")
const utils = require("../utils.js");
mongoUtil.connectToServer();
const mapDatabase = require("../mapDatabase.js");
module.exports = {
	name: 'target',
	description: 'dms you to ask who to switch the target of the bot to. message will be deleted after you send to preserve maximum sneakiness; ex: $target',
	execute(msg, args) {
        let bot = index.bot;
        let db = mongoUtil.getDb();
        let getDoc = mapDatabase.dbMap.get(`${args[0]}`);
        let userTag, valid;
        //let guild = bot.guilds.cache.get(`${msg.guild.id}`);
        if(msg.channel.type == "dm"){
            if(!args[0]){
                msg.channel.send("Example on the command should've been sent up there")
            }else if(args.length > 2){
                let username = "";
                for(let i=1;i<args.length; i++){
                    username += `${args[i]} `;
                }
                //username = username.slice(0,username.length-1);
                username = username.trim();
                userTag = username.slice(username.indexOf("#"), username.length-1);
                valid = utils.isUserValid(userTag);
                if(!valid){
                    msg.channel.send(`${username} isn't a valid username though. give me a valid username`);
                }else{
                    //check if guild has that username
                    db.collection("LinkServerToCollection").updateOne({ServerID:args[0]}, {$set: {"target": `${username}`}});
                    getDoc.target = username;
                    mapDatabase.dbMap.set(`${args[0]}`,getDoc);
                    msg.channel.send(`${username} is now targeted. Next time they talk they will suffer.`);
                }
            }
            else{
                userTag = args[1].slice(args[1].indexOf("#"));
                valid = utils.isUserValid(userTag);
                if(!valid){
                    msg.channel.send(`${args[1]} isn't a valid username though. give me a valid username`);
                }else{
                    db.collection("LinkServerToCollection").updateOne({ServerID:args[0]}, {$set: {"target": `${args[1]}`}});
                    getDoc.target = args[1];
                    mapDatabase.dbMap.set(`${args[0]}`,getDoc);
                    msg.channel.send(`${args[1]} is now targeted. Next time they talk they will suffer.`);
                }
            }
        }else{
            //let getDoc = mapDatabase.dbMap.get(msg.guild.id);
            //let guild = bot.guilds.cache.get(`${msg.guild.id}`);
            //guild.members.forEach(member => {console.log(member)});
            bot.users.cache.get(`${msg.author.id}`).send("Ok! Get the person's discord id who you want to harass, the *username#????* part in their profile, and put it in this command: $target " + msg.guild.id + " username#????");
            msg.delete();
        }
    },
}
