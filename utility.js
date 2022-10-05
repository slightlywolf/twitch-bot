// generates a random number between 1 and 6
exports.rollDice = function()
{
	const sides = 6;
	return Math.floor(Math.random() * sides) + 1;
}
