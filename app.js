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
    const numDepositAmount = parseFloat(depositAmount); //converts string to num

    if (isNaN(numDepositAmount) || numDepositAmount <= 0) {
      //validation for user input
      console.log("Invalid amount, try again.");
    } else {
      return numDepositAmount;
    }
  }
}

const depositAmount = deposit();

// 2. determine number of lines to bet on

function getNumberofLines(){
    
} 
