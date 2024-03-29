const { stdin, stdout } = process;
const chalk = require("chalk");
stdin.setEncoding("utf8");
const rl = require("readline-sync");
const { red, green, blue, yellow, magenta, white, greenBright } = chalk;
const colors = [red, green, blue, yellow, magenta, white, greenBright];
let characters = require("./characters.json");
const charactersQue = [];
const gameInfo = {
  time: new Date().valueOf(),
  correctAns: 0,
  totalChar: 0,
  wrongAns: 0
};

const collectAlphabetInfo = function() {
  let character = {};
  let columns = stdout.columns - 5;
  character.char = characters[Math.floor(Math.random() * characters.length)];
  character.color = colors[Math.floor(Math.random() * 7)];
  character.x = Math.floor(Math.random() * columns);
  character.y = 2;
  return character;
};

const storeNextCharToPrint = function() {
  charactersQue.push(collectAlphabetInfo());
};

const displayAlphabets = function() {
  stdout.cursorTo(0, 1);
  stdout.clearScreenDown();
  charactersQue.forEach(alphabet => {
    stdout.cursorTo(alphabet.x, alphabet.y);
    console.log(alphabet.color(alphabet.char));
    alphabet.y += 1;
  });
};

const quitGame = function() {
  stdout.cursorTo(0, 1);
  console.clear();
  stdout.write(chalk.green(`Correct Alphabets:`) + ` ${gameInfo.correctAns}\n`);
  stdout.write(chalk.red(`Wrong Alphabets:`) + ` ${gameInfo.wrongAns}\n`);
  stdout.write(
    `Total Time: ${Math.floor(
      (new Date().valueOf() - gameInfo.time) / 1000
    )}s\n`
  );
  process.exit(0);
};

const isGameOver = function(rows) {
  charactersQue.forEach(alphabet => {
    if (rows == alphabet.y || gameInfo.wrongAns >= 15) {
      quitGame();
    }
  });
};

const fallChars = function() {
  let rows = stdout.rows;
  displayAlphabets();
  isGameOver(rows);
  stdout.cursorTo(110, 90);
  stdout.write(
    `Time : ${Math.floor((new Date().valueOf() - gameInfo.time) / 1000)}s`
  );
  stdout.cursorTo(85, 90);
  stdout.write(`Wrong Answers : ${gameInfo.wrongAns}`);
  stdout.cursorTo(60, 90);
  stdout.write(`Correct Answers : ${gameInfo.correctAns}`);
  stdout.cursorTo(0, 90);
};

const selectMode = function(option) {
  if (option == "--c") {
    stdin.setRawMode("true");
  }
  if (option == "--w") {
    characters = require("./words.json");
    characters = characters.map(alphabet => `${alphabet}\n`);
  }
};

const printInstructions = function() {
  const instructions = `Press ? to quit the game\nPress Enter: to Start the game\n`;
  const key = rl.question(instructions);
  console.clear();
};

const isMatch = function(userInput, alphabet) {
  if (alphabet.char == userInput) {
    charactersQue.splice(charactersQue.indexOf(alphabet), 1);
    gameInfo.correctAns += 1;
  }
};

const analyseUserInput = function(userInput) {
  if (userInput.trim() == "?") {
    quitGame();
  }
  charactersQue.forEach(isMatch.bind(null, userInput));
  gameInfo.totalChar += 1;
  gameInfo.wrongAns = gameInfo.totalChar - gameInfo.correctAns;
};

const main = function(argv) {
  printInstructions();
  stdin.resume();
  selectMode(argv);
  setInterval(fallChars, 500);
  setInterval(storeNextCharToPrint, 1000);
  stdin.on("data", analyseUserInput);
};

main(process.argv[2]);
