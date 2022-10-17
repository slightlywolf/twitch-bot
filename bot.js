const utility = require("./utility");
const commands = require("./commands");
const bot = require("./bot");

//env settings
require('dotenv').config();
const tmi = require("tmi.js");





// define configuration options
const opts = {
  options: {debug: true, messagesLogLevel: "info" },
  identity: {
    username: `${process.env.TWITCH_USERNAME}`,
    password: `oauth:${process.env.TWITCH_TOKEN}`,
  },
  connection: { reconnect : true, secure: true},
  channels: ["minusreidog", "jackolightttv"]
};

// to generate a token
// twitch token -u -s 'chat:read chat:edit'

// create a client with our options
const client = new tmi.client(opts);

//connect to Twitch:
client.connect().catch(
  console.error
);

//register our event handlers (defined below)
client.on("connected", onConnectedHandler);
function onConnectedHandler(addr, port) {
  console.log(`* Connected to ${addr}:${port}`);
}

/*************************Message Handling **********************/
client.on('message', (channel, tags, msg, self) =>{
  //tags['display-name'] displays the display name
  //bully the appropriate message
  if(commands.bully.includes(tags['display-name']))
  {
    console.log(toBully(msg))
    bot.printquiet(channel, toBully(msg))
  }


  /* remove surrounding whitespace */
  trimmedMsg = msg.trim()
  /* get the arguments */
  args = utility.split_arguments(trimmedMsg)
  /* get the command nam and remove the exclaimation mark */
  commandName = trimmedMsg.split(" ")[0].toLowerCase();

  /* if its own message then return */
  if(self) return;

  /* for picking up words that are hidden */
  trimmedMsg.split(" ").forEach(word => {
    if(word.toLowerCase() in commands.hidcmds)
    {
      /* get the function */
      funcObject = commands.hidcmds[word.toLowerCase()];
      /* get the reference to the function real */
      functionReal = funcObject["func"];
      /* run the function */
      functionReal(channel, commandName, args, tags);
    }
  });




  /* if the first character isnt ! then return */
  if(commandName[0] != '!') return;
  /*********************************************/
  if(commandName in commands.cmds)
  {
        /* get the function */
        funcObject = commands.cmds[commandName];
        /* get the reference to the function real */
        functionReal = funcObject["func"];
        /* run the function */
        functionReal(channel, commandName, args, tags);
  }
  else if(!(commandName in commands.cmds) && commandName[0] === '!')
  {
    utility.not_recognised(channel, commandName)
  }
});



/****************************
 * Wrapper for the client say function
 *******************************/
exports.print = function print(target, str)
{
  console.log(`🦆-> ${str}`);
    client.say(target, `🦆-> ${str}`);
}

exports.printquiet = function printquiet(target, str)
{
  client.say(target, `${str}`);
}

//this function is for bullying
function toBully(str)
{
  return str.split('').map((v,i) => i % 2 == 0 ? v.toUpperCase() : v.toLowerCase()).join("");
}





