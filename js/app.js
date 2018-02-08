/*
GAME FUNCTION:
- Player must guess a number between a min and max
- Player gets a certain amount of guesses
- Notify player of guesses remaining
- Notify the player of the correct answer if loose
- Let player choose to play again
*/

// Games Initial Values
let minNumb, maxNumb, winningNum, guessesLeft;
// UI Variables
const game = document.querySelector('#game'),
      minNum = document.querySelector('.min'),
      maxNum = document.querySelector('.max'),
      guessValue = document.querySelector('#guess-input'),
      submitBtn = document.querySelector('#submit-btn'),
      message = document.querySelector('.message');


// Games Initial Values
minNumb = 5,
maxNumb = 10,
winningNum = Math.round(Math.random() * (maxNumb - minNumb)) + minNumb,
guessesLeft = 3;

// Assign min & max value to UI
minNum.textContent = minNumb;
maxNum.textContent = maxNumb;

game.addEventListener('mousedown', (e) => {
  if(e.target.className === 'tryPlayAgain') {
    // resetting the game
    window.location.reload();
  }
  
});

// Listen for Guess
submitBtn.addEventListener('click', clickHandler);

function clickHandler () {
  let guess = parseInt(guessValue.value);

  // Validate guess
  if (isNaN(guess) || guess < minNumb || guess > maxNumb) {
    setMessage(`Please Enter A Number Between ${minNumb} and ${maxNumb}.`, '#a94442');
    // Change border
    guessValue.style.borderColor = '#a94442';
  }

  // Check if won
  if (guess === winningNum) {
    // Win the game 
    gameOver(false, `${guess} is correct! You Won !!!!`, 'Play Again!');

  } else {
    if (guessValue.value !== '') {
      // decrease guessesLeft
      guessesLeft--;
      
      if (guessesLeft === 0) {
        // game Over - lost
        gameOver(true, `Game over, You lost! Correct number was ${winningNum}.`, 'Try Again!');

      } else {
        // Game continue - answer wrong
        // Change border
        guessValue.style.borderColor = '#8a6d3b';
        // Notify left guesses
        setMessage(`${guess} is not correct! You have ${guessesLeft} left.`, '#8a6d3b');
        // Set input empty
        guessValue.value = '';
      }
    }
  }

}

// setting message
function setMessage(err, color) {
  message.textContent = err;
  message.style.color = color;
}

// Game over function
function gameOver(over, msg, btnText) {
  let color;
  over ? color = '#a94442' : color = '#3c763d';
  // Disable input
  guessValue.disabled = true;
  // Change border
  guessValue.style.borderColor = color;
  // Show winning message
  setMessage(msg, color);

  submitBtn.value = btnText;
  submitBtn.className = 'tryPlayAgain';
}

