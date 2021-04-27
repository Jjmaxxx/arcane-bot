const Discord = require("discord.js");
const index = require("../index.js");
const mongoUtil = require("../mongoUtil.js")
const utils = require("../utils.js");
mongoUtil.connectToServer();
const mapDatabase = require("../mapDatabase.js");
module.exports = {
	name: 'changetarget',
	description: 'dms you to ask who to switch the target of the bot to. message will be deleted after you send to preserve maximum sneakiness; ex: $changetarget',
	execute(msg, args) {
        let bot = index.bot;
        let getDoc = mapDatabase.dbMap.get(msg.guild.id);
        let guild = bot.guilds.cache.get(`${msg.guild.id}`);
        console.log(guild.members);
        //guild.members.forEach(member => {console.log(member)});
        bot.users.cache.get(`${msg.author.id}`).send("Ok! Get the person's discord id who you want to harass, the *username#????* part in their profile, and put it in this command: $target " + msg.guild.id + " username#????");
        msg.delete();
    },
}
