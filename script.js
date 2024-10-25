let username = localStorage.getItem('username') || '';
let score = 0;
let coins = 0;
let highScore = parseInt(localStorage.getItem('highScore')) || 0;
let gameInterval;
let fenceSpeed = 2; // Initial speed of fences
let fenceCount = 0; // Count of fences passed

document.addEventListener('DOMContentLoaded', () => {
    if (username) {
        document.getElementById('welcome-back').innerText = `Welcome back, ${username}!`;
    } else {
        document.getElementById('username').style.display = 'block';
    }

    document.getElementById('start-button').onclick = startGame;
    document.getElementById('shop-button').onclick = showShop;
    document.getElementById('back-button').onclick = () => window.location.href = 'index.html';
    document.getElementById('restart-button').onclick = restartGame;

    if (document.getElementById('skins')) {
        loadShop();
    }

    if (document.getElementById('gameCanvas')) {
        initGame();
    }

    if (document.getElementById('final-score')) {
        displayGameOver();
    }
});

// Function to start the game
function startGame() {
    if (!username) {
        username = document.getElementById('username').value;
        localStorage.setItem('username', username);
        document.getElementById('welcome-back').innerText = `Welcome back, ${username}!`;
    }
    window.location.href = 'game.html'; // Redirect to the game page
}

// Function to initialize the game
function initGame() {
    const canvas = document.getElementById('gameCanvas');
    const ctx = canvas.getContext('2d');
    const chick = { x: 50, y: canvas.height - 40, width: 30, height: 30, color: 'yellow' }; // Chick properties
    const fences = []; // Array to hold fences
    gameInterval = setInterval(() => updateGame(ctx, chick, fences), 20); // Update game every 20ms

    document.addEventListener('click', () => {
        chick.y -= 50; // Jump height
        setTimeout(() => {
            chick.y += 50; // Gravity effect
        }, 300);
    });

    // Function to update the game
    function updateGame(ctx, chick, fences) {
        ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas

        // Draw the chick
        ctx.fillStyle = chick.color;
        ctx.fillRect(chick.x, chick.y, chick.width, chick.height); // Draw the chick

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
            if (fences[i].x < 80 && fences[i].x > 50 && chick.y + 30 >= fences[i].y) {
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
}

// Function to load the shop
function loadShop() {
    const skins = ['blue', 'green', 'red', 'orange', 'purple', 'gray', 'black', 'brown', 'peach', 'pink'];
    const skinsDiv = document.getElementById('skins');

    skins.forEach(color => {
        const skinButton = document.createElement('button');
        skinButton.innerText = `${color.charAt(0).toUpperCase() + color.slice(1)} Chick - 100 Coins`;
        skinButton.onclick = () => buySkin(color);
        skinsDiv.appendChild(skinButton);
    });
}

// Function to buy a skin
function buySkin(color) {
    if (coins >= 100) {
        coins -= 100; // Deduct coins
        localStorage.setItem('coins', coins); // Save coins
        alert(`You bought a ${color} chick!`);
    } else {
        alert("Not enough coins!");
    }
}

// Function to display game over
function displayGameOver() {
    document.getElementById('final-score').innerText = `Final Score: ${score}`;
    document.getElementById('high-score').innerText = `High Score: ${highScore}`;
    localStorage.setItem('coins', coins); // Save coins to localStorage
}

// Function to restart the game
function restartGame() {
    score = 0;
    coins = parseInt(localStorage.getItem('coins')) || 0;
    fenceSpeed = 2;
    window.location.href = 'game.html'; // Restart the game
        }
