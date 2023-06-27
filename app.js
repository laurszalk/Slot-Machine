// 1. deposit some money
// 2. determine number of lines to bet on
// 3. collect a bet amount
// 4. spin the slot machine
// 5. check if the user won
// 6. give the user their money
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
    // validation for user input
    if (isNaN(numDepositAmount) || numDepositAmount <= 0) {
      console.log("Invalid amount, try again.");
    } else {
      return numDepositAmount;
    }
  }
}

// 2. determine number of lines to bet on
// had to write this as an arrow function for it to work
const getNumberOfLines = () => {
  while (true) {
    const lines = prompt("Enter the number of lines to bet on (1-3): ");
    const numberOfLines = parseFloat(lines);

    if (isNaN(numberOfLines) || numberOfLines <= 0 || numberOfLines > 3) {
      console.log("Invalid number of lines, try again.");
    } else {
      return numberOfLines;
    }
  }
};

// 3. collect bet based on the balance they deposited
function getBet(balance, lines) {
  while (true) {
    const bet = prompt("Enter the bet per line: ");
    const numberBet = parseInt(bet);

    if (isNaN(numberBet) || numberBet <= 0 || numberBet > balance / lines) {
      console.log("Invalid bet, try again.");
    } else {
      return numberBet; // bet is per line
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
  // set columns to empty array so we can loop thru it
  const reels = [];
  for (let i = 0; i < COLS; i++) {
    reels.push([]); // push an array which represents each column
    const reelSymbols = [...symbols]; // available symbols for each reel copied into an array
    for (let j = 0; j < ROWS; j++) {
      // randomly generate one of the symbols
      const randomIndex = Math.floor(Math.random() * reelSymbols.length);
      const selectedSymbol = reelSymbols[randomIndex];
      reels[i].push(selectedSymbol);
      // remove symbol so we can't select it again
      reelSymbols.splice(randomIndex, 1);
    }
  }
  return reels;
}

function transpose(reels) {
  const rows = [];

  // for every row loop through every column
  for (let i = 0; i < ROWS; i++) {
    rows.push([]);
    for (let j = 0; j < COLS; j++) {
      rows[i].push(reels[j][i]);
    }
  }
  return rows;
}

// print the rows for the user
function printRows(rows) {
  for (const row of rows) {
    let rowString = "";
    for (const [i, symbol] of row.entries()) {
      rowString += symbol;
      if (i != row.length - 1) {
        rowString += " | ";
      }
    }
    console.log(rowString);
  }
}

// 5. check if the user won
function getWinnings(rows, bet, lines) {
  let winnings = 0;

  // check if the symbols are all the same (won)
  for (let row = 0; row < lines; row++) {
    const symbols = rows[row];
    let allSame = true;
    // check if the symbols are not all the same (lost)
    for (const symbol of symbols) {
      if (symbol != symbols[0]) {
        allSame = false;
        break;
      }
    }
    // calculate the winnings if they won
    if (allSame) {
      winnings += bet * VALUES[symbols[0]];
    }
  }
  return winnings;
}

// 7. play again
function game() {
  let balance = deposit();

  while (true) {
    console.log("You have a balance of $" + balance);
    const numberOfLines = getNumberOfLines;
    const bet = getBet(balance, numberOfLines);
    balance -= bet * numberOfLines;
    const reels = spin();
    const rows = transpose(reels);
    printRows(rows);
    const winnings = getWinnings(rows, bet, numberOfLines);
    balance += winnings;
    console.log("You won $" + winnings.toString());

    if (balance === 0) {
      console.log("You ran out of money!");
      break;
    }

    // ask the user if they want to keep playing or else stop the game
    const playAgain = prompt("Do you want to play again (y/n)? ");

    if (playAgain != "y") break;
  }
}

game();
