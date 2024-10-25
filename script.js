// script.js
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
canvas.width = 800;
canvas.height = 400;

// Chick properties
let chick = {
    x: 50,
    y: 350,
    width: 30,
    height: 20,
    isJumping: false,
    jumpVelocity: 0,
    gravity: 0.8
};

// Fence properties
let fences = [];
let lastFenceTime = 0;
let fenceInterval = 1500;
let speed = 5;
let score = 0;
let highScore = 0;

// Game states
let isGameOver = false;
const gameOverScreen = document.getElementById('gameOverScreen');
const scoreText = document.getElementById('scoreText');
const quoteText = document.getElementById('quoteText');
const restartButton = document.getElementById('restartButton');

const negativeQuotes = [
    "Pretty Suck!", "Skill Issue.", "Really? Below 10?", 
    "My Dog is better than you.", "You need to touch some grass.", 
    "You better quit playing.", "Still Playing? Even though you suck?", 
    "You killed the chick!!!", "Get some new pairs of eyes.", 
    "Come on! Is that it?"
];
const averageQuotes = [
    "Keep it up!", "You're doing great!", "You're almost there!", 
    "Practice more.", "Great job!", "Well done!", 
    "You're on the roll!", "The chick believes in you!", 
    "You got the talent for this!", "Amazing!"
];
const positiveQuotes = [
    "Unbelievable!", "The chick is so proud of you.", 
    "You crushed it!", "Huge Congrats!", "Cheers to your success!!!", 
    "Bravo!!!", "Fantastic Achievement!", "You nailed it!", 
    "Success is yours!", "You rock!"
];
const specialQuote = "Wait... What?!";

// Event listeners
canvas.addEventListener('click', jump);
restartButton.addEventListener('click', restartGame);

// Game loop
function gameLoop(timestamp) {
    if (isGameOver) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw chick
    updateChick();
    drawChick();

    // Handle fences
    if (timestamp - lastFenceTime > fenceInterval) {
        addFence();
        lastFenceTime = timestamp;
    }
    updateFences();
    drawFences();

    // Check collisions
    if (checkCollision()) {
        endGame();
        return;
    }

    // Request the next frame
    requestAnimationFrame(gameLoop);
}

// Chick functions
function updateChick() {
    if (chick.isJumping) {
        chick.y -= chick.jumpVelocity;
        chick.jumpVelocity -= chick.gravity;
        if (chick.y > 350) {
            chick.y = 350;
            chick.isJumping = false;
        }
    }
}

function drawChick() {
    ctx.fillStyle = 'yellow';
    ctx.fillRect(chick.x, chick.y, chick.width, chick.height);
}

// Fence functions
function addFence() {
    let fenceHeight = 30;
    let fenceY = 350;
    let fenceX = canvas.width;
    fences.push({ x: fenceX, y: fenceY, width: 50, height: fenceHeight });
}

function updateFences() {
    fences.forEach(fence => {
        fence.x -= speed;
    });
    fences = fences.filter(fence => fence.x + fence.width > 0);

    // Check if chick passed a fence
    fences.forEach(fence => {
        if (fence.x + fence.width < chick.x && !fence.passed) {
            score++;
            fence.passed = true;
        }
    });
}

function drawFences() {
    ctx.fillStyle = 'brown';
    fences.forEach(fence => {
        ctx.fillRect(fence.x, fence.y, fence.width, fence.height);
    });
}

// Game logic
function checkCollision() {
    for (let fence of fences) {
        if (
            chick.x < fence.x + fence.width &&
            chick.x + chick.width > fence.x &&
            chick.y < fence.y + fence.height &&
            chick.y + chick.height > fence.y
        ) {
            return true;
        }
    }
    return false;
}

function jump() {
    if (!chick.isJumping) {
        chick.isJumping = true;
        chick.jumpVelocity = 12;
    }
}

function endGame() {
    isGameOver = true;
    gameOverScreen.classList.remove('hidden');

    scoreText.textContent = `Score: ${score}`;
    if (score < 10) {
        quoteText.textContent = randomQuote(negativeQuotes);
    } else if (score < 20) {
        quoteText.textContent = randomQuote(averageQuotes);
    } else if (score < 100) {
        quoteText.textContent = randomQuote(positiveQuotes);
    } else {
        quoteText.textContent = specialQuote;
    }
}

function restartGame() {
    isGameOver = false;
    gameOverScreen.classList.add('hidden');
    score = 0;
    fences = [];
    chick.y = 350;
    lastFenceTime = 0;
    requestAnimationFrame(gameLoop);
}

function randomQuote(quotesArray) {
    return quotesArray[Math.floor(Math.random() * quotesArray.length)];
}

// Start game loop
requestAnimationFrame(gameLoop);


