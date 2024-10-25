const startPage = document.getElementById('startPage');
const gamePage = document.getElementById('gameCanvas');
const gameOverPage = document.getElementById('gameOverPage');
const startButton = document.getElementById('startButton');
const restartButton = document.getElementById('restartButton');
const finalScore = document.getElementById('finalScore');
const quote = document.getElementById('quote');

let score = 0;
let highscore = 0;
let isGameOver = false;

// Quotes
const negativeQuotes = [
  "Pretty Suck!", "Skill Issue.", "Really? Below 10?",
  "My Dog is better than you.", "You need to touch some grass.",
  "You better quit playing.", "Still Playing? Even though you suck?",
  "You killed the chick!!!", "Get some new pairs of eyes.",
  "Come on! Is that it?"
];

const averageQuotes = [
  "Keep it up", "You're doing great!", "You're almost there", 
  "Practice more", "Great job!", "Well done", "You're on the roll", 
  "The chick believes in you", "You got the talent for this", 
  "Amazing"
];

const positiveQuotes = [
  "Unbelievable!", "The chick is so proud of you.", "You crushed it!",
  "Huge Congrats!", "Cheers to your success!!!", "Bravo!!!", 
  "Fantastic Achievement!", "You nailed it!", "Success is yours!", 
  "You rock!"
];

function showPage(page) {
  startPage.style.display = 'none';
  gamePage.style.display = 'none';
  gameOverPage.style.display = 'none';
  page.style.display = 'block';
}

function startGame() {
  score = 0;
  isGameOver = false;
  showPage(gamePage);
  // Add logic to start the game
}

function gameOver() {
  isGameOver = true;
  finalScore.textContent = `Score: ${score}`;
  
  let quoteText;
  if (score < 10) {
    quoteText = negativeQuotes[Math.floor(Math.random() * negativeQuotes.length)];
  } else if (score >= 10 && score < 20) {
    quoteText = averageQuotes[Math.floor(Math.random() * averageQuotes.length)];
  } else {
    quoteText = positiveQuotes[Math.floor(Math.random() * positiveQuotes.length)];
  }
  
  quote.textContent = quoteText;
  showPage(gameOverPage);
}

startButton.addEventListener('click', startGame);
restartButton.addEventListener('click', startGame);

// Call gameOver() function when the chick hits an obstacle
// Ensure you update the score in your game loop
