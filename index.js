require('dotenv').config();
const Discord = require("discord.js");
const bot = new Discord.Client();
const config = require('./config.json');
const prefix = config.prefix;
bot.commands = new Discord.Collection();
const fs = require('fs');
const token = process.env.TOKEN;
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

bot.login(token);

for(const file of commandFiles){
    const command = require(`./commands/${file}`);
	bot.commands.set(command.name, command);
}
const listOfCommands = bot.commands;
bot.on('ready',()=>{
    console.log("bot ready");
})
bot.on('message',(message)=>{
    console.log('a');
    //message.reply(message.author.tag);
    if(message.author.tag == "Arcane#7800"){
        message.reply("shut");
        console.log('b');
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
