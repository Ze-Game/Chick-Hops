let chick = { x: 50, y: 250, width: 30, height: 30, velocityY: 0, onGround: true };  // Added 'onGround' property
let gravity = 0.5;
let isJumping = false;
let fences = [];
let score = 0;
let highScore = 0;
let isGameOver = false;

// Function to draw a more detailed chick
function drawChick() {
  // Chick body
  ctx.fillStyle = "yellow";
  ctx.beginPath();
  ctx.ellipse(chick.x + 15, chick.y + 15, 15, 20, 0, 0, Math.PI * 2);
  ctx.fill();

  // Chick beak
  ctx.fillStyle = "orange";
  ctx.beginPath();
  ctx.moveTo(chick.x + 30, chick.y + 15);
  ctx.lineTo(chick.x + 35, chick.y + 10);
  ctx.lineTo(chick.x + 35, chick.y + 20);
  ctx.closePath();
  ctx.fill();

  // Chick legs
  ctx.strokeStyle = "black";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(chick.x + 10, chick.y + 30);
  ctx.lineTo(chick.x + 10, chick.y + 35);
  ctx.moveTo(chick.x + 20, chick.y + 30);
  ctx.lineTo(chick.x + 20, chick.y + 35);
  ctx.stroke();
}

function gameLoop() {
  if (isGameOver) return;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  chick.velocityY += gravity;
  chick.y += chick.velocityY;

  // Prevent the chick from falling off the canvas
  if (chick.y + chick.height >= canvas.height) {
    chick.y = canvas.height - chick.height;
    chick.velocityY = 0;
    chick.onGround = true;  // The chick is back on the ground
  } else {
    chick.onGround = false; // The chick is in the air
  }

  drawChick();
  drawFences();

  // Add new fences periodically
  if (Math.random() < 0.02) {
    createFence();
  }

  ctx.fillStyle = "black";
  ctx.font = "20px Arial";

