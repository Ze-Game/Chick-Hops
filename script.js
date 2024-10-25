// Initialize username, high score, and leaderboard
let username = localStorage.getItem('username');
let highScore = parseInt(localStorage.getItem('highScore')) || 0;
let leaderboard = JSON.parse(localStorage.getItem('leaderboard')) || [];

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

// Function to show the Game Over screen and update the leaderboard
function showGameOver() {
    canvas.style.display = 'none';
    document.getElementById('gameOverScreen').style.display = 'block';
    document.getElementById('finalScore').innerHTML = `Final Score: ${score}`;

    // Update high score if current score is higher
    if (score > highScore) {
        highScore = score;
        localStorage.setItem('highScore', highScore);
    }

    // Update or add the player's entry in the leaderboard
    let playerEntry = leaderboard.find(entry => entry.username === username);
    if (playerEntry) {
        // Update the score only if the new score is higher
        if (score > playerEntry.score) {
            playerEntry.score = score;
        }
    } else {
        // Add a new entry for the player
        leaderboard.push({ username, score });
    }

    // Sort the leaderboard by score in descending order and keep only the top 10
    leaderboard.sort((a, b) => b.score - a.score);
    leaderboard = leaderboard.slice(0, 10);

    // Update localStorage with the new leaderboard
    localStorage.setItem('leaderboard', JSON.stringify(leaderboard));

    // Display leaderboard on the Game Over screen
    let leaderboardHTML = '<h3>Leaderboard - Top 10</h3><ol>';
    for (let entry of leaderboard) {
        leaderboardHTML += `<li>${entry.username}: ${entry.score}</li>`;
    }
    leaderboardHTML += '</ol>';
    document.getElementById('leaderboard').innerHTML = leaderboardHTML;

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

// Function to manually reset the leaderboard (optional, for development purposes)
function resetLeaderboard() {
    leaderboard = [];
    localStorage.removeItem('leaderboard');
}
