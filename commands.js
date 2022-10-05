const utility = require("./utility");
const bot = require("./bot");
/**************************** Message Functions********************* */
/**********************************Map */
// map of all commands
exports.cmds = {
	"!help" : {
		"func" : help_command,
		"desc" : "!help {command} ... displays the description for the command"
	  },
	"!dice" : {
	  "func" : dice_command,
	  "desc" : "!dice {max}... {max} = the maximum number the dice can roll (default 6)..."
	}
}



function dice_command(target, msg, args, tags) {
	const name = tags['display-name']
	if(args.length < 1)
	{
	  const num = utility.rollDice(6)
	  bot.print(target, `${name}  rolled a ${num}!`);
	}
	else
	{
	  const parsednum = Number(args[0])
	  if(Number.isNaN(parsednum))
	  {
		const num = utility.rollDice(6)
		bot.print(target, `${name} rolled a ${num}!`);
	  }
	  else
	  {
		const num = utility.rollDice(parsednum)
		bot.print(target, `${name} rolled a ${num}!`);
	  }
	}

  }

function help_command(target, msg, args, tags) {
	if(args.length < 1)
	{
	  commandsstring = "Commands = ...";
	  for(const [key, value] of Object.entries(exports.cmds))
	  {
		commandsstring += `...${key}...`
	  }
	  commandsstring += "...To get help with a specific command, type !help {command}..."
	  bot.print(target, commandsstring);
	}
	else
	{
	  appendedExc = `!${args[0]}`
	  if(appendedExc in exports.cmds)
		utility.display_description(target, appendedExc)
	  else
		utility.not_recognised(target, appendedExc)
	}
  }

