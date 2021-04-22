let index = require('../index');
const Discord = require("discord.js");
module.exports = {
    name: 'help',
	description: 'shows commands',
	execute(msg, args) {
        let commands = index.commandList;
        let commandsList = new Discord.MessageEmbed()
        .setTitle("Here's my List of Commands")
        .setColor('0x2471a3')
        .addFields(
            commands
        ).setFooter("each server can only have one collection currently because i just wanted to get one per server working first it's confusing with multiple collections i'll add it later");
        msg.channel.send(commandsList);

	},
}