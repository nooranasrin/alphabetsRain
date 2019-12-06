const { stdin, stdout } = process;
let alphabets = `abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ`.split(
  ""
);
const charactersQue = [];

const collectAlphabetInfo = function() {
  let alphabet = {};
  let columns = stdout.columns - 5;
  alphabet.char = alphabets[Math.floor(Math.random() * alphabets.length)];
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
    console.log(alphabet.char);
    alphabet.y += 1;
  });
};

const fallChars = function() {
  displayAlphabets();
  stdout.cursorTo(0, 35);
};

const main = function() {
  alphabets = alphabets.map(alphabet => `${alphabet}\n`);
  setInterval(fallChars, 500);
  setInterval(storeNextCharToPrint, 1000);
};

main();
