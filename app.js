// 1. deposit some money
// 2. determine number of lines to bet on
// 3. collect a bet amount
// 4. spin the slot machine
// 5. check if the user won
// 6. give the user their money or take their bet
// 7. play again

// require our package to get user input
const prompt = require("prompt-sync")();

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

let balance = deposit();
const numberOfLines = getNumberofLines();
const bet = getBet(balance, numberOfLines);
