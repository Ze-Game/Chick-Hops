// Variables
let username = localStorage.getItem('username');
let coins = parseInt(localStorage.getItem('coins')) || 0;
let equippedSkin = localStorage.getItem('equippedSkin') || 'default';
let highScore = parseInt(localStorage.getItem('highScore')) || 0;
let currentScore = 0;
const skinColors = ['blue', 'green', 'orange', 'red', 'violet', 'black', 'pink', 'gray', 'white', 'brown'];
const skinCost = 100;

// DOM Elements
const usernameInput = document.getElementById('usernameInput');
const saveUsernameButton = document.getElementById('saveUsernameButton');
const welcomeMessage = document.getElementById('welcomeMessage');
const userDisplay = document.getElementById('userDisplay');
const startButton = document.getElementById('startButton');
const shopButton = document.getElementById('shopButton');
const gamePage = document.getElementById('gamePage');
const startScreen = document.getElementById('startScreen');
const shopPage = document.getElementById('shopPage');
const scoreDisplay = document.getElementById('scoreDisplay');
const gameOverScreen = document.getElementById('gameOverScreen');
const finalScore = document.getElementById('finalScore');
const highScoreDisplay = document.getElementById('highScore');
const skinsContainer = document.getElementById('skins');
const coinsDisplay = document.getElementById('coinsDisplay');
const backToStartButton = document.getElementById('backToStartButton');
const shopButtonGameOver = document.getElementById('shopButtonGameOver');
const restartButton = document.getElementById('restartButton');

// Load Initial State
if (username) {
    userDisplay.textContent = username;
    welcomeMessage.style.display = 'block';
    startButton.style.display = 'block';
} else {
    document.getElementById('usernameContainer').style.display = 'flex';
}

coinsDisplay.textContent = `Coins: ${coins}`;

// Save Username
saveUsernameButton.addEventListener('click', () => {
    username = usernameInput.value.trim();
    if (username) {
        localStorage.setItem('username', username);
        userDisplay.textContent = username;
        document.getElementById('usernameContainer').style.display = 'none';
        welcomeMessage.style.display = 'block';
        startButton.style.display = 'block';
    }
});

// Start Game Button
startButton.addEventListener('click', () => {
    startScreen.style.display = 'none';
    gamePage.style.display = 'block';
    startGame();
});

// Shop Button
shopButton.addEventListener('click', openShop);
backToStartButton.addEventListener('click', () => {
    shopPage.style.display = 'none';
    startScreen.style.display = 'block';
});

// Generate Skins
function openShop() {
    startScreen.style.display = 'none';
    shopPage.style.display = 'block';
    skinsContainer.innerHTML = '';

    skinColors.forEach(color => {
        const skinDiv = document.createElement('div');
        skinDiv.classList.add('skin');
        skinDiv.style.backgroundColor = color;
        skinDiv.addEventListener('click', () => purchaseSkin(color));
        skinsContainer.appendChild(skinDiv);
    });
}

// Purchase Skins
function purchaseSkin(color) {
    if (coins >= skinCost) {
        coins -= skinCost;
        localStorage.setItem('coins', coins);
        equippedSkin = color;
        localStorage.setItem('equippedSkin', color);
        alert(`You have equipped the ${color} skin!`);
        coinsDisplay.textContent = `Coins: ${coins}`;
    } else {
        alert('Not enough coins!');
    }
}

// Game Over
function gameOver() {
    gamePage.style.display = 'none';
    gameOverScreen.style.display = 'block';
    finalScore.textContent = `Final Score: ${currentScore}`;
    if (currentScore > highScore) {
        highScore = currentScore;
        localStorage.setItem('highScore', highScore);
    }
    highScoreDisplay.textContent = `High Score: ${highScore}`;
}

// Restart Button
restartButton.addEventListener('click', () => {
    gameOverScreen.style.display = 'none';
    gamePage.style.display = 'block';
    startGame();
});

shopButtonGameOver.addEventListener('click', openShop);

// Start Game
function startGame() {
    currentScore = 0;
    updateScore();
    // Game logic goes here
}

// Update Score
function updateScore() {
    scoreDisplay.textContent = `Score: ${currentScore}`;
    coinsDisplay.textContent = `Coins: ${coins}`;
}

// Example Function for Adding Points and Converting to Coins
function addPoints(points) {
    currentScore += points;
    coins += points;
    updateScore();
    localStorage.setItem('coins', coins);
}

// Example Fence Speed Increment
function updateFenceSpeed(fencesPassed) {
    if (fencesPassed % 20 === 0 && fencesPassed > 0) {
        // Increment the fence speed here
    }
}
