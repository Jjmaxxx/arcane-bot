const Discord = require("discord.js");
const bot = new Discord.Client();
const config = require('./config.json');
const prefix = config.prefix;
bot.commands = new Discord.Collection();
const fs = require('fs');
const token = config.token;
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

const mongoUtil = require("./mongoUtil.js")
mongoUtil.connectToServer();



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
    commandList.push({name:"$" + index, value: currElement.description});    
})


bot.on('ready',()=>{
    console.log("bot ready");
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
bot.on('message',(message)=>{
    let db = mongoUtil.getDb();
    db.collection("LinkServerToCollection").findOne({ServerID: message.guild.id}, (err, collection)=>{
        if(err){
            console.log('REEE DB ERROR')
            throw err;
        } 
        //"437808476106784770";
        if(collection){
            if(message.author.id == collection.target){
                console.log('run');
                db.collection('insults').findOne({collectionName: `${collection.currentCollection}`}, (err, document)=>{
                    if(err) throw err;
                    let insult = document.insults;
                    message.reply(insult[Math.floor(Math.random()*insult.length)]);
                })
                listOfEmotes = Array.from(message.guild.emojis.cache);
                //console.log(listOfEmotes);
                const reactionEmoji = listOfEmotes[Math.floor(Math.random() * listOfEmotes.length)];
                message.react(reactionEmoji[1].id);
            }
    }
    })
    //message.reply(message.author.tag);

    if (!message.content.startsWith(prefix) || message.author.bot){
        return;
    } 
    const args = message.content.slice(prefix.length).trim().split(/ +/);
	const command = args.shift().toLowerCase();

    if(!bot.commands.has(command)){
        message.reply("command not recognized");
    }else{
        bot.commands.get(command).execute(message, args);
    }
})

module.exports.commandList = commandList;


//git rm -rf --cached .
//git add .
//git reset --hard HEAD^