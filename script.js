const startPage = document.getElementById('startPage');
const gamePage = document.getElementById('gameCanvas');
const gameOverPage = document.getElementById('gameOverPage');
const startButton = document.getElementById('startButton');
const restartButton = document.getElementById('restartButton');
const finalScore = document.getElementById('finalScore');
const highScoreDisplay = document.getElementById('highScore');
const quote = document.getElementById('quote');
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

let chick = { x: 50, y: 250, width: 30, height: 30, velocityY: 0 };
let gravity = 0.5;
let isJumping = false;
let fences = [];
let score = 0;
let highScore = 0;
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
  fences = [];
  isGameOver = false;
  chick.y = 250;
  chick.velocityY = 0;
  showPage(gamePage);
  requestAnimationFrame(gameLoop);
}

function gameOver() {
  isGameOver = true;
  finalScore.textContent = `Score: ${score}`;
  highScore = Math.max(highScore, score);
  highScoreDisplay.textContent = `High Score: ${highScore}`;

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

function createFence() {
  const gap = 120;
  const randomY = Math.random() * (canvas.height - gap) + 50;
  fences.push({ x: canvas.width, y: randomY, width: 40, height: 10 });
}

function drawChick() {
  ctx.fillStyle = "yellow";
  ctx.fillRect(chick.x, chick.y, chick.width, chick.height);
}

function drawFences() {
  ctx.fillStyle = "brown";
  fences.forEach((fence, index) => {
    fence.x -= 5; // Move fence to the left
    ctx.fillRect(fence.x, canvas.height - fence.height, fence.width, fence.height);

    // Check if chick passes through fence without hitting
    if (fence.x + fence.width < chick.x && !fence.passed) {
      fence.passed = true;
      score++;
    }

    // Remove fences that are off-screen
    if (fence.x + fence.width < 0) {
      fences.splice(index, 1);
    }

    // Check for collision
    if (
      chick.x < fence.x + fence.width &&
      chick.x + chick.width > fence.x &&
      chick.y + chick.height > canvas.height - fence.height
    ) {
      gameOver();
    }
  });
}

function gameLoop() {
  if (isGameOver) return;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  chick.velocityY += gravity;
  chick.y += chick.velocityY;

  if (chick.y + chick.height > canvas.height) {
    chick.y = canvas.height - chick.height;
    chick.velocityY = 0;
  }

  drawChick();
  drawFences();

  // Add new fences periodically
  if (Math.random() < 0.02) {
    createFence();
  }

  ctx.fillStyle = "black";
  ctx.font = "20px Arial";
  ctx.fillText(`Score: ${score}`, 10, 30);
  ctx.fillText(`High Score: ${highScore}`, canvas.width - 150, 30);

  requestAnimationFrame(gameLoop);
}

canvas.addEventListener('click', () => {
  if (!isGameOver) {
    chick.velocityY = -10;
  }
});

startButton.addEventListener('click', startGame);
restartButton.addEventListener('click', startGame);
  
