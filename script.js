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

// ... (rest of the code remains unchanged)

// In the updateGame function, ensure the chick is drawn in yellow
function updateGame(ctx, chickY, fences) {
    // Drawing the chick
    ctx.fillStyle = chickColor; // Ensure the chick is yellow
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
