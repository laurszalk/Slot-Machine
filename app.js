// 1. deposit some money
// 2. determine number of lines to bet on
// 3. collect a bet amount
// 4. spin the slot machine
// 5. check if the user won
// 6. give the user their money or take their bet
// 7. play again

// require our package to get user input
const prompt = require("prompt-sync")();

// define our variables for reels (cols and rows) and symbols
const ROWS = 3;
const COLS = 3;

const SYMBOLS = {
  A: 2,
  B: 4,
  C: 6,
  D: 8,
};

const VALUES = {
  A: 5,
  B: 4,
  C: 3,
  D: 2,
};

// 1. deposit some money
function deposit() {
  while (true) {
    const depositAmount = prompt("Enter a deposit amount: "); // returns a string
    const numDepositAmount = parseInt(depositAmount); //converts string to num
    //validation for user input
    if (isNaN(numDepositAmount) || numDepositAmount <= 0) {
      console.log("Invalid amount, try again.");
    } else {
      return numDepositAmount;
    }
  }
}

// 2. determine number of lines to bet on
function getNumberofLines() {
  while (true) {
    const lines = prompt("Enter the number of lines to bet on (1-3): ");
    const numberOfLines = parseInt(lines);

    if (isNaN(numberOfLines) || numberOfLines <= 0 || numberOfLines > 3) {
      console.log("Invalid number, try again.");
    } else {
      return numberOfLines;
    }
  }
}

// 3. collect bet based on the balance they deposited
function getBet(balance, lines) {
  while (true) {
    const bet = prompt("Enter the bet per line: ");
    const numberBet = parseInt(bet);

    if (isNaN(numberBet) || numberBet <= 0 || numberBet > balance / lines) {
      console.log("Invalid bet, try again.");
    } else {
      return numberBet;
    }
  }
}

// 4. spin the slot machine
function spin() {
  // first loop through all the possible symbols
  const symbols = [];
  for (const [symbol, count] of Object.entries(SYMBOLS)) {
    for (let i = 0; i < count; i++) {
      symbols.push(symbol);
    }
  }
  // array of columns for the reels
  const reels = [[], [], []];
  for (let i = 0; i < COLS; i++) {
    const reelSymbols = [...symbols]; // available symbols for each reel copied into an array
    for (let j = 0; j < ROWS; j++) {
      const randomIndex = Math.floor(Math.random() * reelSymbols.length);
      const selectedSymbol = reelSymbols[randomIndex];
      reels[i].push(selectedSymbol);
      //remove symbol so we can't select it again
      reelSymbols.splice(randomIndex, 1);
    }
  }
  return reels;
}

const reels = spin();
console.log(reels);

let balance = deposit();
const numberOfLines = getNumberofLines();
const bet = getBet(balance, numberOfLines);
