let index = require('../index');
let commands = [];
const Discord = require("discord.js");
module.exports = {
    name: 'help',
	description: 'shows commands',
	execute(msg, args) {
        index.listOfCommands.map((currElement, index)=>{
            commands.push({name:index, desc: currElement.description});
        })
        let commandsList = new Discord.MessageEmbed()
        .setTitle("Here's my List of Commands")
        .setColor('0x2471a3')
        .addFields(
            { name: "$" + commands[0].name, value: commands[0].desc },
            { name: "$" +  commands[1].name, value: commands[1].desc }
        ).setFooter("What do you want from me I started using this coding library like 4 hours ago shut up");
        msg.channel.send(commandsList);
        // console.log(index.listOfCommands.name);
        // for(let i=0; i<index.listOfCommands.length; i++){
        //     msg.reply(index.listOfCommands[i].name);
        // }
        
        // if(!msg.author.bot){
        //     msg.reply((`${msg.author.tag} in #${msg.channel.name} sent: ${msg.content}`));
        // }
	},
}