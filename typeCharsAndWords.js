const { stdin, stdout } = process;
const alphabets = `abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ`.split(
  ""
);
const charactersQue = [];

const collectAlphabetInfo = function() {
  let alphabet = {};
  let columns = stdout.columns - 5;
  alphabet.char = alphabets[Math.floor(Math.random() * alphabets.length)];
  alphabet.x = Math.floor(Math.random() * columns);
  alphabet.y = 1;
  return alphabet;
};

const storeNextCharToPrint = function() {
  charactersQue.push(collectAlphabetInfo());
};

const main = function() {
  setInterval(storeNextCharToPrint, 1000);
};

main();
