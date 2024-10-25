// Global variables
let username = localStorage.getItem('username') || '';
let score = 0;
let coins = 0;
let highScore = parseInt(localStorage.getItem('highScore')) || 0;
let chickColor = 'yellow'; // Set the chick color to yellow
let gameInterval; // For the game loop
let fenceSpeed = 2; // Initial speed of fences
let fenceCount = 0; // Count of fences passed

document.addEventListener('DOMContentLoaded', () => {
    initializeWelcomePage();
});

// Function to initialize the welcome page
function initializeWelcomePage() {
    const container = document.createElement('div');
    container.classList.add('container');

    const title = document.createElement('h1');
    title.innerText = 'Chick Hop';
    container.appendChild(title);

    const welcomeMessage = document.createElement('h2');
    welcomeMessage.innerText = username ? `Welcome back, ${username}!` : '';
    container.appendChild(welcomeMessage);

    const usernameInput = document.createElement('input');
    usernameInput.type = 'text';
    usernameInput.placeholder = 'Enter your username';
    usernameInput.classList.add('username-input');
    usernameInput.style.display = username ? 'none' : 'block';
    container.appendChild(usernameInput);

    const startButton = document.createElement('button');
    startButton.innerText = 'Start';
    startButton.onclick = () => {
        if (!username) {
            username = usernameInput.value;
            localStorage.setItem('username', username);
        }
        startGame();
    };
    container.appendChild(startButton);

    const shopButton = document.createElement('button');
    shopButton.innerText = 'Shop';
    shopButton.onclick = () => {
        showShopPage();
    };
    container.appendChild(shopButton);

    document.body.appendChild(container);
}

// Function to start the game
function startGame() {
    document.body.innerHTML = ''; // Clear previous content
    const gameContainer = document.createElement('div');
    gameContainer.classList.add('container');
    
    const canvas = document.createElement('canvas');
    canvas.width = 300; // Set canvas width
    canvas.height = 400; // Set canvas height
    gameContainer.appendChild(canvas);
    document.body.appendChild(gameContainer);
    
    const ctx = canvas.getContext('2d');
    let chickY = canvas.height - 30; // Ground level for chick
    const fences = []; // Array to hold fences
    gameInterval = setInterval(() => updateGame(ctx, chickY, fences), 20); // Update game every 20ms
    
    document.addEventListener('click', () => {
        // Jump the chick
        chickY -= 50; // Jump height
        setTimeout(() => {
            chickY += 50; // Gravity effect
        }, 300);
    });
}

// Function to update the game
function updateGame(ctx, chickY, fences) {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height); // Clear canvas

    // Drawing the chick
    ctx.fillStyle = chickColor; // Ensure the chick is yellow
    ctx.fillRect(50, chickY, 30, 30); // Draw the chick

    // Adding new fences
    if (fences.length < 5 || fences[fences.length - 1].x < ctx.canvas.width - 150) {
        fences.push({ x: ctx.canvas.width, y: ctx.canvas.height - 50, width: 30, height: 50 });
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

// Function to show the shop page
function showShopPage() {
    // Implementation for shop page
}

// Function to display game over
function displayGameOver() {
    // Implementation for game over page
}
