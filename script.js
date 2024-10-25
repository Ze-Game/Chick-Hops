// Global variables
let username = localStorage.getItem('username') || '';
let score = 0;
let coins = 0;
let highScore = parseInt(localStorage.getItem('highScore')) || 0;
let chickColor = 'yellow'; // Default chick color
let gameInterval; // For the game loop
let fenceSpeed = 2; // Initial speed of fences
let fenceCount = 0; // Count of fences passed

document.addEventListener('DOMContentLoaded', () => {
    initializeWelcomePage();
});

function initializeWelcomePage() {
    if (username) {
        document.getElementById('welcomeMessage').innerText = `Welcome back, ${username}!`;
        document.getElementById('usernameInput').style.display = 'none';
        document.getElementById('startButton').style.display = 'block';
    }

    document.getElementById('saveUsernameButton').addEventListener('click', () => {
        username = document.getElementById('username').value;
        if (username) {
            localStorage.setItem('username', username);
            document.getElementById('welcomeMessage').innerText = `Welcome back, ${username}!`;
            document.getElementById('usernameInput').style.display = 'none';
            document.getElementById('startButton').style.display = 'block';
        }
    });

    document.getElementById('startButton').addEventListener('click', () => {
        window.location.href = 'game.html';
    });

    document.getElementById('shopButton').addEventListener('click', () => {
        window.location.href = 'shop.html';
    });

    document.getElementById('backToMenu').addEventListener('click', () => {
        window.location.href = 'index.html';
    });

    loadShop();
}

function loadShop() {
    const skins = [
        { color: 'blue', price: 100 },
        { color: 'green', price: 100 },
        { color: 'red', price: 100 },
        { color: 'orange', price: 100 },
        { color: 'purple', price: 100 },
        { color: 'gray', price: 100 },
        { color: 'black', price: 100 },
        { color: 'brown', price: 100 },
        { color: 'peach', price: 100 },
        { color: 'pink', price: 100 },
    ];

    const skinContainer = document.getElementById('chickSkins');
    skins.forEach(skin => {
        const skinDiv = document.createElement('div');
        skinDiv.innerHTML = `
            <span style="color: ${skin.color}; font-weight: bold;">${skin.color.charAt(0).toUpperCase() + skin.color.slice(1)} Chick - ${skin.price} Coins</span>
            <button onclick="buySkin('${skin.color}', ${skin.price})">Buy</button>
        `;
        skinContainer.appendChild(skinDiv);
    });
}

function buySkin(color, price) {
    if (coins >= price) {
        coins -= price;
        chickColor = color; // Change the chick color
        localStorage.setItem('coins', coins); // Update coins in local storage
        alert(`You bought a ${color} chick!`);
    } else {
        alert('Not enough coins!');
    }
}

// Game logic functions
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('gameCanvas')) {
        startGame();
    }
});

function startGame() {
    const canvas = document.getElementById('gameCanvas');
    const ctx = canvas.getContext('2d');
    let chickY = canvas.height - 40; // Ground level for the chick
    let fences = []; // Array to store fences
    score = 0; // Reset score
    coins = parseInt(localStorage.getItem('coins')) || 0; // Load coins from local storage

    gameInterval = setInterval(() => {
        ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
        updateGame(ctx, chickY, fences);
    }, 20);
}

function updateGame(ctx, chickY, fences) {
    // Drawing the chick
    ctx.fillStyle = chickColor;
    ctx.fillRect(50, chickY, 30, 30); // Draw the chick

    // Adding new fences
    if (fences.length < 5 || fences[fences.length - 1].x < canvas.width - 150) {
        fences.push({ x: canvas.width, y: canvas.height - 50, width: 30, height: 50 });
    }

    // Update fences positions
    for (let i = 0; i < fences.length; i++) {
        fences[i].x -= fenceSpeed; // Move fences to the left
        ctx.fillStyle = 'brown'; // Color of the fences
        ctx.fillRect(fences[i].x, fences[i].y, fences[i].width, fences[i].height); // Draw fences

        // Check for collision
        if (fences[i].x < 80 && fences[i].x > 50 && chickY + 30 >= fences[i].y) {
            clearInterval(gameInterval); // Stop the game on collision
            displayGameOver();
        }

        // Update score
        if (fences[i].x + fences[i].width < 0) {
            fences.splice(i, 1); // Remove passed fences
            score++;
            coins += 1; // Increment coins for each fence jumped over
            if (score % 10 === 0) {
                fenceSpeed += 1; // Increase speed every 10 fences
            }
            i--; // Adjust index after splicing
        }
    }

    // Update scoreboard
    document.getElementById('scoreboard').innerText = `Score: ${score} Coins: ${coins}`;
}

function displayGameOver() {
    document.getElementById('gameOverMessage').style.display = 'flex';
    document.getElementById('finalScore').innerText = `Final Score: ${score}`;
    document.getElementById('highScore').innerText = `High Score: ${Math.max(score, highScore)}`;
    if (score > highScore) {
        highScore = score;
        localStorage.setItem('highScore', highScore); // Save new high score
    }
    localStorage.setItem('coins', coins); // Save coins
}

// Restart the game logic
document.getElementById('restartButton').addEventListener('click', () => {
    window.location.href = 'game.html';
});
        
