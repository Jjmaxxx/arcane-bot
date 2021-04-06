const Discord = require("discord.js");
const bot = new Discord.Client();
const config = require('./config.json');
const prefix = config.prefix;
bot.commands = new Discord.Collection();
const fs = require('fs');
const token = config.token;
const aws = require('aws-sdk');
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

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

const mongo = require("mongodb");
let mongoClient = mongo.MongoClient;
let url = "mongodb://localhost:27017/arcane-bot";
let db;
mongoClient.connect(url,{useUnifiedTopology:true},(err,client)=>{
    db = client.db("arcane-bot");
    //console.log(db0);
    if(err){
        throw err;
    }
    // db0.collection('insults').findOne({insult: "shut up you useless subhuman filth"},(err,result)=>{
    //     if(err){
    //         throw err;
    //     }
    //     console.log(result._id);
    // });
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
              {
                  name: 'Commands',
                  value: 'help, arcane'
              },

          ],
          footer: {
              text: 'Yes this took time. Yes i spent time making this. Yes I have brain damage.'
          }
      }
    });
  });
  let interval;
  let sendInsult;
  function waitForInsult(message){
      if(sendInsult != null){
          message.reply(sendInsult);
          clearInterval(interval);
      }
  }
  //
bot.on('message',(message)=>{
    //message.reply(message.author.tag);
    if(message.author.tag == "Arcane#7800"){
        db.collection('insults').aggregate([{$sample: {size: 1}}]).toArray().then((data)=>{sendInsult = data[0].insult})
        interval = setInterval(()=>{waitForInsult(message)},250);

        listOfEmotes = Array.from(message.guild.emojis.cache);
        //console.log(listOfEmotes);
        const reactionEmoji = listOfEmotes[Math.floor(Math.random() * listOfEmotes.length)];
        message.react(reactionEmoji[1].id);
        
    }

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


exports.listOfCommands = listOfCommands;
//git rm -rf --cached .
//git add .