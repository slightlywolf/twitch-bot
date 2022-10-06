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
	},
	"!deez" : {
		"func" : deez_command,
		"desc" : "deeZ nuts lmao"
	  },
	"!nuts" : {
		"func" : nuts_command,
		"desc" : "deez "
	},
	"!discord" : {
		"func" : discord_command,
		"desc" : "posts jacks discord in chat "
	},
	"!socials" : {
		"func" : socials_command,
		"desc" : "jacks socials"
	},
	"!saki" : {
		"func" : saki_command,
		"desc" : "lmao"
	},
	"!pussy" : {
		"func" : pussy_command,
		"desc" : "its you"
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

function deez_command(target, msg, args, tags)
{
	bot.print(target, " nuts");
}

function nuts_command(target, msg, args, tags)
{
	bot.print(target, " jackolighttv");
}

function discord_command(target, msg, args, tags)
{
	bot.print(target, "https://discord.com/invite/Nshn8bhn2m");
}


function socials_command(target, msg, args, tags)
{
	const twitter = "TWITTER: https://twitter.com/JackolightTTV :"
	const tok = "TIKTOK: https://www.tiktok.com/@jackolightttv?lang=en : "
	const insta = "INSTA: https://www.instagram.com/_jackolightttv_/ : "
	const yoputube = "YOUTUBE: https://www.youtube.com/channel/UC3PsubWzQYexFIw7V3tLGTA :"

	bot.print(target, `${twitter} ${tok} ${insta} ${yoputube}`);
}

function saki_command(target, msg, args, tags)
{
	bot.print(target, `saki deez nuts`);
}

function pussy_command(target, msg, args, tags)
{
	bot.print(target, `${tags['display-name']}`);
}


