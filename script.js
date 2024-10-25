// Get username and high score from local storage
let username = localStorage.getItem('username');
let highScore = parseInt(localStorage.getItem('highScore')) || 0;
let leaderboard = JSON.parse(localStorage.getItem('leaderboard')) || [];

// Prompt user for a username only if it's not already set
if (!username) {
    username = prompt("Enter your username:");
    if (username) {
        localStorage.setItem('username', username);
    } else {
        // If no username is provided, give a default name
        username = "Player";
        localStorage.setItem('username', username);
    }
}

function showGameOver() {
    canvas.style.display = 'none';
    document.getElementById('gameOverScreen').style.display = 'block';
    document.getElementById('finalScore').innerHTML = `Final Score: ${score}`;

    // Update high score if current score is higher
    if (score > highScore) {
        highScore = score;
        localStorage.setItem('highScore', highScore);
    }

    // Update leaderboard for the current player
    let playerEntryIndex = leaderboard.findIndex(entry => entry.username === username);
    if (playerEntryIndex !== -1) {
        // Update the score only if the new score is higher
        if (score > leaderboard[playerEntryIndex].score) {
            leaderboard[playerEntryIndex].score = score;
        }
    } else {
        // Add a new entry for the player
        leaderboard.push({ username, score });
    }

    // Sort the leaderboard by score in descending order and update localStorage
    leaderboard.sort((a, b) => b.score - a.score);
    localStorage.setItem('leaderboard', JSON.stringify(leaderboard));

    // Display leaderboard
    let leaderboardHTML = '<h3>Leaderboard</h3><ol>';
    for (let entry of leaderboard) {
        leaderboardHTML += `<li>${entry.username}: ${entry.score}</li>`;
    }
    leaderboardHTML += '</ol>';
    document.getElementById('leaderboard').innerHTML = leaderboardHTML;

    // Display random quote based on score
    let quote;
    if (score < 10) {
        const negativeQuotes = [
            "Pretty suck!",
            "You need to touch some grass!",
            "Really, below 10?",
            "You need to quit!",
            "Get some new glasses.",
            "My dog is better than you.",
            "It's not even that hard.",
            "Skill Issue",
            "You Monster! The chick died!",
            "Is that it?"
        ];
        quote = negativeQuotes[Math.floor(Math.random() * negativeQuotes.length)];
    } else if (score < 30) {
        const averageQuotes = [
            "You're really working that hard?",
            "You can still try... If you can.",
            "Well... I can see you're doing great.",
            "Is it challenging?",
            "Oh! I see."
        ];
        quote = averageQuotes[Math.floor(Math.random() * averageQuotes.length)];
    } else {
        const positiveQuotes = [
            "Amazing!",
            "I can't believe you manage to get here?",
            "Outstanding!",
            "You made the chick so proud.",
            "You're Awesome!",
            "You crashed this game!",
            "That's the skill!!!",
            "Well done!",
            "Great job!",
            "Huge Congrats!!!"
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
