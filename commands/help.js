let index = require('../index');
let commands = [];
const Discord = require("discord.js");
module.exports = {
    name: 'help',
	description: 'shows commands',
	execute(msg, args) {
        index.listOfCommands.map((currElement, index)=>{
            commands.push({name:"$" + index, value: currElement.description});    
        })
        let commandsList = new Discord.MessageEmbed()
        .setTitle("Here's my List of Commands")
        .setColor('0x2471a3')
        .addFields(
            commands
        ).setFooter("What do you want from me I started using this coding library like 4 hours ago shut up");
        msg.channel.send(commandsList);

	},
}