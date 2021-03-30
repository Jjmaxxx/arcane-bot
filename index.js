const Discord = require("discord.js");
const bot = new Discord.Client();
const config = require('./config.json');
const prefix = config.prefix;
bot.commands = new Discord.Collection();
const fs = require('fs');
const token = config.token;
const aws = require('aws-sdk');
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
let listOfInsults = ["shut up you useless subhuman filth", "everytime you say somebody leveled up i become one step closer to a hate crime that includes you",
"i'm going to level with you, nobody cares", "i'm going to level your ass to kingdom come if you dont shut the hell up", "shut shut shut shut shut shut shut",
"stop it stop it stop it among us among us among us st", "i hope you step on legos", "die so you can finally provide something useful to society"]
let activities = ["plotting how to effectively kill Arcane", "wondering where Arcane lives", "how do i kill a virtual bot?", "getting my alt f4 out in case i see arcane",
"is murder illegal in this state? does it apply to virtual bots?", "every second arcane is alive another piece of my soul breaks off. and i dont even have a soul"]
bot.login(token);
console.log(bot.user);

for(const file of commandFiles){
    const command = require(`./commands/${file}`);
	bot.commands.set(command.name, command);
}
const listOfCommands = bot.commands;
bot.on('ready',()=>{
    console.log("bot ready");
    bot.user.setAvatar('./arcanepic.jpg');
    bot.user.setActivity(activities[4]);
    setInterval(() => {
        let index = Math.floor(Math.random() * (activities.length - 1)); 
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
bot.on('message',(message)=>{
    //message.reply(message.author.tag);
    if(message.author.tag == "Arcane#7800"){
        message.reply(listOfInsults[Math.round(Math.random()* (listOfInsults.length-1))]);
    }

    if (!message.content.startsWith(prefix) || message.author.bot) return;
    const args = message.content.slice(prefix.length).trim().split(/ +/);
	const command = args.shift().toLowerCase();

    if(!bot.commands.has(command)){
        message.reply("command not recognized");
    }else{
        bot.commands.get(command).execute(message, args);
    }
})

exports.listOfCommands = listOfCommands;