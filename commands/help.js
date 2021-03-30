let index = require('../index');

module.exports = {
	name: 'help',
	description: 'show commands',
	execute(msg, args) {
        msg.channel.send("Here's my List of Commands");
        index.listOfCommands.map((currElement, index)=>{
            msg.channel.send("$" + index + ": " + currElement.description);
        })
        msg.channel.send("What do you want from me I started using this coding library like 4 hours ago shut up");
        // console.log(index.listOfCommands.name);
        // for(let i=0; i<index.listOfCommands.length; i++){
        //     msg.reply(index.listOfCommands[i].name);
        // }
        
        // if(!msg.author.bot){
        //     msg.reply((`${msg.author.tag} in #${msg.channel.name} sent: ${msg.content}`));
        // }
	},
};