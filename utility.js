const bot = require("./bot")
const commands = require("./commands")
/**********************
 * Utility class for functions that
 * are useful for ever file
 ******************************************************/

/*****************
 * generates a random number between 1 and maxvalue
 *****************************/
exports.rollDice = function(maxValue)
{
	const sides = maxValue;
	return Math.floor(Math.random() * sides) + 1;
}

/***********************
 * displays the description of the command
 **********************/
exports.display_description = function display_description(target, command)
{
  bot.print(target, `${commands.cmds[command]["desc"]}`)
}

/*********************
 * displays a not recognised message
 ***********************/
exports.not_recognised = function not_recognised(target, str)
{
	bot.print(target, `Command ...${str}... is not recognised...`)
}

 /***************************
 * splits the incomming string and returns an array of
 * arguments
*************************/
exports.split_arguments = function split_arguments(str)
{
  /* split the arguments by spaces */
  const arr = str.split(" ");
  /* remove the first element of the array */
  arr.shift();
  /* return the array of arguments */
  return arr;
}
