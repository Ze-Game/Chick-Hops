// Global variables
let username = localStorage.getItem('username') || '';
let score = 0;
let coins = 0;
let highScore = localStorage.getItem('highScore') || 0;
let fenceSpeed = 2; // Initial speed of fences
let fenceCount = 0; // Count of fences passed
let chickColor = 'yellow'; // Default chick color

document.addEventListener('DOMContentLoaded', () => {
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
});

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
            <span style="color: ${skin.color}">${skin.color} Chick - ${skin.price} Coins</span>
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

// Game logic functions will go here (game.html related code)
