// Initialize username and high score
let username = localStorage.getItem('username');
let highScore = parseInt(localStorage.getItem('highScore')) || 0;

// Prompt the user for a username if not already set
if (!username) {
    username = prompt("Enter your username:");
    if (username) {
        localStorage.setItem('username', username);
    } else {
        // Default username if no username is provided
        username = "Player";
        localStorage.setItem('username', username);
    }
}

// Function to show the Game Over screen
function showGameOver() {
    canvas.style.display = 'none';
    document.getElementById('gameOverScreen').style.display = 'block';
    document.getElementById('finalScore').innerHTML = `Final Score: ${score}`;

    // Update high score if current score is higher
    if (score > highScore) {
        highScore = score;
        localStorage.setItem('highScore', highScore);
    }

    // Display a random quote based on the score
    let quote;
    if (score < 10) {
        const negativeQuotes = [
            "Pretty suck!", "You need to touch some grass!", "Really, below 10?", "You need to quit!",
            "Get some new glasses.", "My dog is better than you.", "It's not even that hard.", "Skill Issue",
            "You Monster! The chick died!", "Is that it?"
        ];
        quote = negativeQuotes[Math.floor(Math.random() * negativeQuotes.length)];
    } else if (score < 30) {
        const averageQuotes = [
            "You're really working that hard?", "You can still try... If you can.", "Well... I can see you're doing great.",
            "Is it challenging?", "Oh! I see."
        ];
        quote = averageQuotes[Math.floor(Math.random() * averageQuotes.length)];
    } else {
        const positiveQuotes = [
            "Amazing!", "I can't believe you managed to get here?", "Outstanding!", "You made the chick so proud.",
            "You're Awesome!", "You crashed this game!", "That's the skill!!!", "Well done!", "Great job!", "Huge Congrats!!!"
        ];
        quote = positiveQuotes[Math.floor(Math.random() * positiveQuotes.length)];
    }
    document.getElementById('quote').innerHTML = quote;
}

// Event listeners
canvas.addEventListener('click', () => {
    if (!chick.isJumping) {
        chick.velocityY = -10;
        chick.isJumping = true;
    }
});

document.getElementById('startButton').addEventListener('click', startGame);
document.getElementById('restartButton').addEventListener('click', startGame);

// Function to manually reset high score (optional, for development purposes)
function resetHighScore() {
    highScore = 0;
    localStorage.removeItem('highScore');
                                                          }
