let arcaneTag = "437808476106784770";
let randomInsult = ["you're as useless as the ueue in queue", "you're cringe", "stop being cringe", "you're an idiot loser dumb idiot loser"
, "you're like the small rock that's in the inside of my shoe", "you seem like the type of person to eat the cap on a water bottle", 
"you will never amount to anything. Give up.", "nobody likes you. We just tolerate you.", "die."];
module.exports = {
	name: 'arcane',
	description: 'insults arcane',
	execute(msg, args) {
        let insult = randomInsult[Math.round(Math.random()*randomInsult.length-1)];
        if(insult != null){
           msg.channel.send("Hey " + "<@" + arcaneTag.toString() + ">, " +  insult);
        }else if(insult == null){
           msg.channel.send("Hey " + "<@" + arcaneTag.toString() + ">, " +  "you're so bad and sad that this insult is actually a null error");
        }
        // if(!msg.author.bot){
        //     msg.reply((`${msg.author.tag} in #${msg.channel.name} sent: ${msg.content}`));
        // }
	},
};

//git add -u
//git reset -- .env   