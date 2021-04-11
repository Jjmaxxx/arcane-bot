const brain = require('brain.js')
const fs = require('fs');    
let rawdata = fs.readFileSync('trainingdata.json');
let data = JSON.parse(rawdata);
const trainingData = [

  ];
var net = new brain.recurrent.LSTM();
net.fromJSON(data);
// net.train(trainingData, {
//     iterations: 20000,
//     log: details => console.log(details),
//     errorThresh: 0.005
//   })
let askBot = net.run("burger king");
if(askBot == "compliment" || askBot == "insult"){
    console.log(askBot);
}
else if(askBot.indexOf("insult") > 0){
    console.log(askBot.slice(askBot.indexOf("insult"),askBot.length));
}
else if(askBot.indexOf("compliment") > 0){
    console.log(askBot.slice(askBot.indexOf("compliment"),askBot.length));
}
