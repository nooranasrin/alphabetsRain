const { stdin, stdout } = process;
const chalk = require("chalk");
const { red, green, blue, yellow, magenta, white, greenBright } = chalk;
const colors = [red, green, blue, yellow, magenta, white, greenBright];
let alphabets = `abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ`.split(
  ""
);
const charactersQue = [];
const gameInfo = { time: new Date().valueOf() };

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

const fallChars = function() {
  displayAlphabets();
  stdout.cursorTo(110, 90);
  stdout.write(
    `Time : ${Math.floor((new Date().valueOf() - gameInfo.time) / 1000)}s`
  );
  stdout.cursorTo(0, 35);
};

const main = function() {
  alphabets = alphabets.map(alphabet => `${alphabet}\n`);
  setInterval(fallChars, 500);
  setInterval(storeNextCharToPrint, 1000);
};

main();
