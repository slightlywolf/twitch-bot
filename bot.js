const tmi = require("tmi.js");
const utility = require("./utility");

// define configuration options
const opts = {
  identity: {
    username: "minusreidog",
    password: "ol1oxibsazwu1wjlhwhrh309ufcc6r",
    /* old auth id */
    // khxd2rykff5jy2vxfkw6eja7wg08iq
  },
  channels: ["minusreidog"],
};

// create a client with our options
const client = new tmi.client(opts);

//register our event handlers (defined below)
client.on("message", onMessageHandler);
client.on("connected", onConnectedHandler);

//connect to Twitch:

client.connect();

/*************************Message Handling **********************/

function onConnectedHandler(addr, port) {
  console.log(`* Connected to ${addr}:${port}`);
}

function onMessageHandler(target, context, msg, self) {
  if (self) {
    return;
  } // ignore self messages

  // remove whitespace from the input chatmessage
  const commandName = msg.trim();

  // If the command is known, let's execute it
  if (commandName === "!dice") {
    diceMsg(target);
  }
  else if(commandName === "suck")
  {
	print(target,"Just like your mother...")
  }
  else {
    /******************Otherwise ************/
	print(target, `Unknown command ${commandName}`)
  }
}
/****************************Message Functions********************* */

function diceMsg(target) {
  const num = utility.rollDice();
  client.say(target, `🦆-> You rolled a ${num}!`);
}

function print(target, str)
{
	console.log(`🦆-> ${str}`);
    client.say(target, `🦆-> ${str}`);
}
