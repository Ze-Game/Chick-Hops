// JavaScript for all pages
document.addEventListener('DOMContentLoaded', () => {
    const startPage = document.getElementById('startPage');
    const gamePage = document.getElementById('gamePage');
    const gameOverPage = document.getElementById('gameOverPage');
    const usernameInput = document.getElementById('username-input');
    const welcomeBack = document.getElementById('welcome-back');

    const username = localStorage.getItem('username');
    if (username) {
        usernameInput.style.display = 'none';
        welcomeBack.innerText = `Welcome back, ${username}!`;
    }

    startPage.style.display = 'block'; // Show the starting page

    usernameInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            saveUsername();
        }
    });
});

function saveUsername() {
    const usernameInput = document.getElementById('username-input');
    const username = usernameInput.value.trim();
    if (username) {
        localStorage.setItem('username', username);
        window.location.reload(); // Reload page to show welcome message
    }
}

function startGame() {
    document.getElementById('startPage').style.display = 'none';
    document.getElementById('gamePage').style.display = 'block';
    initGame();
}

function goToShop() {
    alert("Shop feature is not implemented yet.");
}

let canvas = document.getElementById('gameCanvas');
let ctx = canvas.getContext('2d');
let score = 0;
let highScore = localStorage.getItem('highScore') ? parseInt(localStorage.getItem('highScore')) : 0;
let fenceSpeed = 2;
let fencesPassed = 0;
let fences = [];
let gameOver = false;

const chick = {
    x: 50,
    y: 300,
    width: 30,
    height: 30,
    color: 'yellow',
    draw: function () {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height); // Draw chick as a rectangle
    },
    jump: function () {
        if (this.y === 300) { // Only jump if on the ground
            this.y -= 60; // Jump height
            setTimeout(() => {
                this.y += 60; // Return to ground after jump
            }, 300);
        }
    }
};

function addFence() {
    const fence = {
        x: canvas.width,
        y: 320,
        width: 10,
        height: 20,
    };
    fences.push(fence);
}

function initGame() {
    score = 0;
    fencesPassed = 0;
    fences = [];
    fenceSpeed = 2;
    gameOver = false;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    update();
    setInterval(addFence, 2000); // Add a new fence every 2 seconds
}

function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    chick.draw();
    
    if (!gameOver) {
        for (let i = 0; i < fences.length; i++) {
            const fence = fences[i];
            fence.x -= fenceSpeed;
            ctx.fillStyle = 'brown';
            ctx.fillRect(fence.x, fence.y, fence.width, fence.height);

            // Check for collision
            if (chick.x < fence.x + fence.width && chick.x + chick.width > fence.x && chick.y + chick.height > fence.y) {
                gameOver = true;
                localStorage.setItem('finalScore', score);
                if (score > highScore) {
                    localStorage.setItem('highScore', score);
                }
            }

            // Increment score and speed
            if (fence.x + fence.width < 0) {
                fencesPassed++;
                score++;
                if (fencesPassed % 10 === 0) {
                    fenceSpeed += 0.5; // Increase speed every 10 fences passed
                }
                fences.splice(i, 1); // Remove fence
                i--; // Adjust index
            }
        }

        document.getElementById('score').innerText = `Score: ${score}`;
        requestAnimationFrame(update);
    } else {
        endGame();
    }
}

function endGame() {
    const finalScore = document.getElementById('final-score');
    const highScoreDisplay = document.getElementById('high-score');
    const coinsConverted = document.getElementById('coins-converted');
    finalScore.innerText = score;
    highScoreDisplay.innerText = highScore;
    coinsConverted.innerText = score; // Score is converted to coins
    document.getElementById('gamePage').style.display = 'none';
    document.getElementById('gameOverPage').style.display = 'block';
}

function restartGame() {
    document.getElementById('gameOverPage').style.display = 'none';
    document.getElementById('startPage').style.display = 'block'; // Go back to start page
}

document.addEventListener('keydown', (e) => {
    if (e.code === 'Space' && !gameOver) {
        chick.jump();
    }
});

canvas.addEventListener('click', () => {
    if (!gameOver) {
        chick.jump();
    }
});
