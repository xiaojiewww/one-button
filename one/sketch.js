let character;
let characterX = 50;
let characterY;
let groundY = 300;
let isJumping = false;
let jumpSpeed = 0;
let gravity = 0.6;
let obstacles = [];
let obstacleSpeed = 5;
let gameOver = false;
let victory = false;
let score = 0;

let victoryImage;
let gameOverImage;

function preload() {
  character = loadImage('assets/2.png');
  victoryImage = loadImage('assets/4.GIF');
  gameOverImage = loadImage('assets/5.png');
}

function setup() {
  createCanvas(800, 400);
  characterY = groundY;
  
  for (let i = 1; i <= 3; i++) {
    obstacles.push(createVector(width + i * 250, groundY));
  }
}

function draw() {
  background(255);

  if (gameOver) {
    image(gameOverImage, width / 2 - gameOverImage.width / 2, height / 2 - gameOverImage.height / 2);
    textSize(18);
    textAlign(CENTER, CENTER);
    fill(80,80,80);
    text('Game Over! Press R to Restart', width / 2, height / 2 + 140);
    return;
  }

  if (victory) {
    image(victoryImage, width / 2 - victoryImage.width / 2, height / 2 - victoryImage.height / 2);
    textSize(32);
    textAlign(CENTER, CENTER);
    fill(0);
    text('Victory! Press R to Restart', width / 2, height / 2 + 100);
    return;
  }

  if (isJumping) {
    characterY += jumpSpeed;
    jumpSpeed += gravity;
    if (characterY >= groundY) {
      characterY = groundY;
      isJumping = false;
    }
  }
  image(character, characterX, characterY - character.height);

  fill(0, 255, 0);
  for (let i = 0; i < obstacles.length; i++) {
    let obstacle = obstacles[i];
    obstacle.x -= obstacleSpeed;
    ellipse(obstacle.x, obstacle.y - 10, 20, 20);

    if (
      obstacle.x < characterX + character.width &&
      obstacle.x + 20 > characterX &&
      characterY > groundY - 20
    ) {
      gameOver = true; 
    }

    
    if (obstacle.x < -20) {
      obstacle.x = width + random(200, 400);
      score++;
      if (score >= 10) {
        victory = true; 
      }
    }
  }


  textSize(20);
  fill(0);
  text("Score: " + score, width - 100, 30);
}

function keyPressed() {
  if (key === ' ' && !isJumping && !gameOver && !victory) {
    jumpSpeed = -12; 
    isJumping = true;
  }
  if (key === 'r' || key === 'R') {
    resetGame(); 
  }
}

function resetGame() {
  gameOver = false;
  victory = false;
  score = 0;
  characterY = groundY;
  for (let i = 0; i < obstacles.length; i++) {
    obstacles[i].x = width + i * 250;
  }
}
