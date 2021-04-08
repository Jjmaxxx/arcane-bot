const brain = require('brain.js');
const fs = require('fs');    
const trainingData = [
  {input: "You suck", output:"insult"},
  {input: "I hate you", output: "insult"},
  {input: "You're a dumbass", output:"insult"},
  {input: "I hope you stub your toe", output:"insult"},
  {input: "I feel pain everytime i hear you", output:"insult"},
  {input: "Fucking idiot", output:"insult"},
  {input: "Loser", output:"insult"},
  {input: "You're worthless, and nobody likes you.", output:"insult"},
  {input: "I dislike you", output:"insult"},
  {input: "You should die, kill yourself", output:"insult"},
  {input: "I can't stand being near you", output:"insult"},
  {input: "You're trash", output:"insult"},
  {input: "Give up", output:"insult"},
  {input: "You make me sick", output:"insult"},
  {input: "You're actually dumb", output:"insult"},
  {input: "Are you braindead", output:"insult"},
  {input: "Are you retarded", output:"insult"},
  {input: "bastard", output:"insult"},
  {input: "asshole", output:"insult"},
  {input: "You have 0 IQ", output:"insult"},
  {input: "you have 0 iq", output:"insult"},
  {input: "You have 100 IQ", output:"insult"},
  {input: "you have 100 iq", output:"insult"},
  {input: "Actual scum of the earth", output:"insult"},
  {input: "What is wrong with you", output:"insult"},
  {input: "Worthless human being", output:"insult"},
  {input: "You're actually terrible", output:"insult"},
  {input: "Degen", output:"insult"},
  {input: "Degenerate", output:"insult"},
  {input: "You're a terrible human being", output:"insult"},
  {input: "Damn, that's crazy. Did I ask?", output:"insult"},
  {input: "any askers?", output:"insult"},
  {input: "who asked?", output:"insult"},
  {input: "You're so dumb", output:"insult"},
  {input: "Bad", output:"insult"},
  {input: "Pile of toxic waste", output:"insult"},
  {input: "You're nice", output:"compliment"},
  {input: "I really like you", output:"compliment"},
  {input: "Maybe you aren't so bad", output:"compliment"},
  {input: "You're a really cool person", output:"compliment"},
  {input: "I really like your hair", output:"compliment"},
  {input: "Good job on following all your aspirations!", output:"compliment"},
  {input: "I'm so proud of you", output:"compliment"},
  {input: "That's great! I'm glad to hear it", output:"compliment"},
  {input: "I like you", output:"compliment"},
  {input: "You're a great person", output:"compliment"},
  {input: "I'm glad I know you", output:"compliment"},
  {input: "Never give up, keep trying", output:"compliment"},
  {input: "Sick!", output:"compliment"},
  {input: "you have 200 iq", output:"compliment"},
  {input: "you have 2000 iq", output:"compliment"},
  {input: "You have 2000 IQ", output:"compliment"},
  {input: "You have 200 IQ", output:"compliment"},
  {input: "I think you're a great human being", output:"compliment"},
  {input: "You're so chill", output:"compliment"},
  {input: "You're actually a cool person", output:"compliment"},
  {input: "I love how patient you are", output:"compliment"},
  {input: "Asking you questions is amazing", output:"compliment"},
];

  console.log(trainingData);
   const net = new brain.recurrent.LSTM();
   const result = net.train(trainingData, {
     iterations: 20000,
     log: details => console.log(details),
     errorThresh: 0.005
   });
   const json = net.toJSON()
   const data = JSON.stringify(json);
   fs.writeFileSync('trainingdata.json', data)
   
   
   console.log(net.run(""));

  // let mapData = trainingData.map(item=>({
  //   input:item.input,
  //   output:item.category
  // }))