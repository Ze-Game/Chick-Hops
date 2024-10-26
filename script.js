// Common elements
const welcomeBackMessage = document.getElementById('welcome-back');
const usernameInput = document.getElementById('username');
const startButton = document.getElementById('start-button');
const shopButton = document.getElementById('shop-button');

// Game elements
let gameCanvas, ctx;
let chick, fences, gameInterval, score, coins, speedMultiplier, isGameOver;

// Get stored username if available
const storedUsername = localStorage.getItem('username');
if (storedUsername) {
    welcomeBackMessage.innerText = `Welcome back, ${storedUsername}!`;
} else {
    usernameInput.style.display = 'block';
}

// Set username on user input
usernameInput.addEventListener('change', () => {
    const username = usernameInput.value.trim();
    if (username) {
        localStorage.setItem('username', username);
        welcomeBackMessage.innerText = `Welcome back, ${username}!`;
        usernameInput.style.display = 'none';
    }
});

// Handle button clicks to navigate pages
startButton.addEventListener('click', () => {
    window.location.href = 'game.html';
});

shopButton.addEventListener('click', () => {
    window.location.href = 'shop.html';
});

// Initialize the game canvas and elements for game page
function initGame() {
    gameCanvas = document.getElementById('gameCanvas');
    ctx = gameCanvas.getContext('2d');
    score = 0;
    coins = parseInt(localStorage.getItem('coins')) || 0;
    speedMultiplier = 1;
    isGameOver = false;

    // Chick properties
    chick = { x: 50, y: gameCanvas.height - 40, width: 30, height: 30, color: 'yellow', jump: false, jumpHeight: 60 };

    // Fences array
    fences = [];
    createFence();

    // Add score and coins display
    document.getElementById('scoreboard').innerText = `Score: ${score} Coins: ${coins}`;

    // Start the game loop
    gameInterval = setInterval(updateGame, 1000 / 60);

    // Handle chick jump on tap
    gameCanvas.addEventListener('click', () => {
        if (!isGameOver) chick.jump = true;
    });
}

// Create a new fence and add it to the array
function createFence() {
    const fence = { x: gameCanvas.width, y: gameCanvas.height - 40, width: 30, height: 40, speed: 2 * speedMultiplier };
    fences.push(fence);
}

// Update the game state and render elements
function updateGame() {
    ctx.clearRect(0, 0, gameCanvas.width, gameCanvas.height);

    // Handle chick jumping
    if (chick.jump) {
        chick.y -= 4;
        if (chick.y <= gameCanvas.height - chick.jumpHeight) {
            chick.jump = false;
        }
    } else if (chick.y < gameCanvas.height - 40) {
        chick.y += 4;
    }

    // Render the chick
    ctx.fillStyle = chick.color;
    ctx.fillRect(chick.x, chick.y, chick.width, chick.height);

    // Update and render fences
    fences.forEach((fence, index) => {
        fence.x -= fence.speed;
        if (fence.x + fence.width < 0) {
            fences.splice(index, 1);
            score += 1;
            if (score % 10 === 0) speedMultiplier += 0.5;
            createFence();
        }

        // Check for collision with the chick
        if (
            chick.x < fence.x + fence.width &&
            chick.x + chick.width > fence.x &&
            chick.y < fence.y + fence.height &&
            chick.y + chick.height > fence.y
        ) {
            endGame();
        }

        // Draw the fence
        ctx.fillStyle = 'green';
        ctx.fillRect(fence.x, fence.y, fence.width, fence.height);
    });

    // Update score and speed based on fence progress
    document.getElementById('scoreboard').innerText = `Score: ${score} Coins: ${coins}`;
}

// End the game and handle game-over page navigation
function endGame() {
    clearInterval(gameInterval);
    isGameOver = true;
    coins += score;
    localStorage.setItem('coins', coins);
    window.location.href = 'gameover.html';
}

// Call this function on the game page to initialize everything
if (window.location.pathname.includes('game.html')) {
    window.onload = initGame;
            }
