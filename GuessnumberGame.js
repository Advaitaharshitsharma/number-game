// Get HTML elements
const submitButton = document.getElementById("submit-guess");
const userGuessInput = document.getElementById("user-guess");
const attemptsLeftText = document.getElementById("attempts-left");
const messageText = document.getElementById("message");
const maxAttemptsText = document.getElementById("max-attempts");
const endGameSection = document.getElementById("end-game");
const playAgainButton = document.getElementById("play-again");
const scoreMessage = document.getElementById("score-message");

let targetNumber;
let attempts;
const maxAttempts = 10;

// Initialize a new round
function startNewRound() {
  targetNumber = Math.floor(Math.random() * 100) + 1;
  attempts = 0;
  attemptsLeftText.textContent = maxAttempts;
  messageText.textContent = "";
  endGameSection.classList.add("hidden");
  userGuessInput.disabled = false;
  submitButton.disabled = false;
}

// Handle user guess
submitButton.addEventListener("click", () => {
  const userGuess = parseInt(userGuessInput.value);

  if (isNaN(userGuess) || userGuess < 1 || userGuess > 100) {
    messageText.textContent = "Please enter a valid number between 1 and 100.";
    return;
  }

  attempts++;
  attemptsLeftText.textContent = maxAttempts - attempts;

  if (userGuess < targetNumber) {
    messageText.textContent = "Too low! Try again.";
  } else if (userGuess > targetNumber) {
    messageText.textContent = "Too high! Try again.";
  } else {
    messageText.textContent = "Congratulations! You've guessed the correct number!";
    endGame();
  }

  if (attempts === maxAttempts && userGuess !== targetNumber) {
    messageText.textContent = "Sorry, you've run out of attempts! The correct number was " + targetNumber + ".";
    endGame();
  }
});

// End the game
function endGame() {
  userGuessInput.disabled = true;
  submitButton.disabled = true;
  endGameSection.classList.remove("hidden");
  scoreMessage.textContent = `You took ${attempts} attempts to guess the number.`;
}

// Play again
playAgainButton.addEventListener("click", () => {
  startNewRound();
  scoreMessage.textContent = "";
  userGuessInput.value = "";
});

// Start the first round when the page loads
startNewRound();
