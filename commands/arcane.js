let arcaneTag = "437808476106784770";
let randomInsult = ["you're as useless as the ueue in queue", "you're like the "];
module.exports = {
	name: 'arcane',
	description: 'insults arcane',
	execute(msg, args) {
        msg.channel.send("Hey " + "<@" + arcaneTag.toString() + "> " + randomInsult);
        
        // if(!msg.author.bot){
        //     msg.reply((`${msg.author.tag} in #${msg.channel.name} sent: ${msg.content}`));
        // }
	},
};

//git add -u
//git reset -- .env   