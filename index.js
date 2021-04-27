const Discord = require("discord.js");
const bot = new Discord.Client();
const config = require('./config.json');
const prefix = config.prefix;
bot.commands = new Discord.Collection();
const fs = require('fs');
const token = config.token;
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
const mapDatabase = require("./mapDatabase.js");
const mongoUtil = require("./mongoUtil.js")
mongoUtil.connectToServer();
let db, dbMap, dbInsults; 
let activities = ["plotting how to effectively kill Arcane", "wondering where Arcane lives", "how do i kill a virtual bot?", "getting my alt f4 out in case i see arcane",
"is murder illegal in this state? does it apply to virtual bots?", "every second arcane is alive another piece of my soul breaks off. and i dont even have a soul"]
bot.login(token);
//console.log(bot.user);
let listOfEmotes = [];
for(const file of commandFiles){
    const command = require(`./commands/${file}`);
	bot.commands.set(command.name, command);
}
const listOfCommands = bot.commands;
let commandList = [];
listOfCommands.map((currElement, index)=>{
    if(index == "target"){

    }
    else{
        commandList.push({name:prefix + index, value: currElement.description});    
    }
})


bot.on('ready',()=>{
    console.log("bot ready");
    db = mongoUtil.getDb();
    mapDatabase.default(db);
    // mapDatabase.mapLinkServerToCollection(db);
    // mapDatabase.mapInsults(db);
    bot.user.setAvatar('./arcanepic.jpg');
    bot.user.setActivity(activities[4]);
    setInterval(() => {
        let index = Math.floor(Math.random() * (activities.length)); 
        bot.user.setActivity(activities[index]); 
    }, 60000); 
})

bot.on('guildCreate', guild => {
    guild.systemChannel.send(`Hi, I was created to specifically to insult Arcane. Whenever Arcane says anything, I reply with an insult.`, {
      embed:{
          title: 'Prefix',
          color: 0x2471a3, 
          description: "The prefix for all my commands is \'$', like \'$help\'.",
          fields:[
              commands
          ],
          footer: {
              text: 'Yes this took time. Yes i spent time making this. Yes I have brain damage.'
          }
      }
    });
  });
  //
bot.on('message',(msg)=>{
    // if (msg.author.bot){
    //     return;
    // } 
    const args = msg.content.slice(prefix.length).trim().split(/ +/);
	const command = args.shift().toLowerCase();
    if(bot.commands.has(command)){
        if(msg.channel.type !== "dm"){
            if(!mapDatabase.inCollection(msg)){
                mapDatabase.addServerToCollection(db, msg);
                mapDatabase.addInsultToCollection(db, msg);
            }else if(mapDatabase.inCollection(msg)){
                mapDatabase.refreshTimeout(msg);
            }
        }
        if(msg.content.startsWith(prefix)){
            bot.commands.get(command).execute(msg, args);
        }
    }
    if(msg.channel.type !== "dm"){
        if(mapDatabase.dbMap.get(msg.guild.id) == null || mapDatabase.dbInsults.get(msg.guild.id) == null){

        }
    }
    dbMap = mapDatabase.dbMap;
    dbInsults = mapDatabase.dbInsults;
    if(msg.channel.type === "dm"){
        return;
    }
    let document = dbMap.get(msg.guild.id);
    let insultDoc = dbInsults.get(msg.guild.id);
    if(document != null && document.target == `${msg.member.user.tag}`){
        if(document.currentCollection == "default"){
            msg.reply(dbInsults.get("global").insults[Math.floor(Math.random()*insultDoc.insults.length)]);
        }
        else if(document.currentCollection == insultDoc.collectionName && insultDoc.ServerID == document.ServerID){
            msg.reply(insultDoc.insults[Math.floor(Math.random()*insultDoc.insults.length)]);
        }
        listOfEmotes = Array.from(msg.guild.emojis.cache);
        const reactionEmoji = listOfEmotes[Math.floor(Math.random() * listOfEmotes.length)];
        msg.react(reactionEmoji[1].id);
    }
    // if(!msg.content.startsWith(prefix)){
    //     return;
    // }
})

module.exports.commandList = commandList;
module.exports.bot = bot;
//git rm -rf --cached .
//git add .
//git reset --hard HEAD^