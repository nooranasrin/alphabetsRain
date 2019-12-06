const { stdin, stdout } = process;
const chalk = require("chalk");
const { red, green, blue, yellow, magenta, white, greenBright } = chalk;
const colors = [red, green, blue, yellow, magenta, white, greenBright];
let alphabets = `abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ`.split(
  ""
);
const charactersQue = [];
const gameInfo = {
  time: new Date().valueOf(),
  correctAns: 0,
  totalChar: 0,
  wrongAns: 0
};

const collectAlphabetInfo = function() {
  let alphabet = {};
  let columns = stdout.columns - 5;
  alphabet.char = alphabets[Math.floor(Math.random() * alphabets.length)];
  alphabet.color = colors[Math.floor(Math.random() * 7)];
  alphabet.x = Math.floor(Math.random() * columns);
  alphabet.y = 2;
  return alphabet;
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

const main = function() {
  alphabets = alphabets.map(alphabet => `${alphabet}\n`);
  setInterval(fallChars, 500);
  setInterval(storeNextCharToPrint, 1000);
  stdin.on("data", userInput => {
    if (userInput == "?\n") {
      quitGame();
    }
    charactersQue.forEach(alphabet => {
      if (alphabet.char == userInput) {
        charactersQue.splice(charactersQue.indexOf(alphabet), 1);
        gameInfo.correctAns += 1;
      }
    });
    gameInfo.totalChar += 1;
    gameInfo.wrongAns = gameInfo.totalChar - gameInfo.correctAns;
  });
};

main();
