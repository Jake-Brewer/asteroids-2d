// Entry point for Ass-Steroids! (Atari-style Splash)
// Minimal retro splash screen with modular code for future expansion

import Ship from "./entities/Ship.js";
import Asteroid from "./entities/Asteroid.js";
import Bullet from "./entities/Bullet.js";
import InputSystem from "./systems/InputSystem.js";
import GameManager from "./systems/GameManager.js";
import CollisionSystem from "./systems/CollisionSystem.js";

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Retro color palette
const BG_COLOR = "#000";
const TEXT_COLOR = "#fff";
const ACCENT_COLOR = "#f00";

// Starfield generation
const STAR_COUNT = 64;
const stars = Array.from({length: STAR_COUNT}, () => ({
  x: Math.random() * canvas.width,
  y: Math.random() * canvas.height,
  speed: 0.5 + Math.random() * 1.5
}));

// Animation state
let flash = true;
let flashTimer = 0;
const FLASH_INTERVAL = 500; // ms

// --- Game Entities ---
const ship = new Ship();
const inputSystem = new InputSystem(ship);
const gameManager = new GameManager();
let asteroids = [];
let bullets = [];
let gameStarted = false;
let canShoot = true;

function drawStarfield() {
  ctx.save();
  ctx.fillStyle = "#fff";
  for (const star of stars) {
    ctx.globalAlpha = 0.5 + Math.random() * 0.5;
    ctx.fillRect(star.x, star.y, 2, 2);
  }
  ctx.globalAlpha = 1.0;
  ctx.restore();
}

function updateStarfield() {
  for (const star of stars) {
    star.y += star.speed;
    if (star.y > canvas.height) {
      star.y = 0;
      star.x = Math.random() * canvas.width;
    }
  }
}

function drawSplashText() {
  // Main title
  ctx.save();
  ctx.font = "bold 64px monospace";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.shadowColor = ACCENT_COLOR;
  ctx.shadowBlur = 16;
  ctx.fillStyle = TEXT_COLOR;
  ctx.fillText("ASS-STEROIDS!", canvas.width / 2, canvas.height / 2 - 30);
  ctx.shadowBlur = 0;
  ctx.font = "bold 32px monospace";
  ctx.fillStyle = ACCENT_COLOR;
  if (flash) {
    ctx.fillText("PRESS START", canvas.width / 2, canvas.height / 2 + 50);
  }
  ctx.restore();
}

function drawCopyright() {
  ctx.save();
  ctx.font = "16px monospace";
  ctx.textAlign = "center";
  ctx.fillStyle = "#888";
  ctx.fillText("A loving parody of Atari Asteroids", canvas.width / 2, canvas.height - 40);
  ctx.fillText("or: HEMEROIDS", canvas.width / 2, canvas.height - 20);
  ctx.restore();
}

function draw() {
  ctx.fillStyle = BG_COLOR;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  drawStarfield();
  if (gameStarted) {
    // Draw asteroids
    for (const asteroid of asteroids) {
      if (asteroid.isAlive) asteroid.draw(ctx);
    }
    // Draw bullets
    for (const bullet of bullets) {
      if (bullet.isAlive) bullet.draw(ctx);
    }
    // Draw ship if alive
    if (ship.isAlive) ship.draw(ctx);
    // Draw score
    ctx.save();
    ctx.font = "24px monospace";
    ctx.fillStyle = TEXT_COLOR;
    ctx.textAlign = "left";
    ctx.fillText("SCORE: " + gameManager.score, 20, 40);
    ctx.restore();
    // Game over overlay
    if (gameManager.gameOver) {
      ctx.save();
      ctx.font = "bold 48px monospace";
      ctx.fillStyle = ACCENT_COLOR;
      ctx.textAlign = "center";
      ctx.fillText("GAME OVER", canvas.width / 2, canvas.height / 2);
      ctx.font = "bold 24px monospace";
      ctx.fillStyle = TEXT_COLOR;
      ctx.fillText("Press R to Restart", canvas.width / 2, canvas.height / 2 + 50);
      ctx.restore();
    }
  } else {
    drawSplashText();
    drawCopyright();
  }
}

function updateGame() {
  inputSystem.update();
  if (ship.isAlive) ship.update();
  // Update asteroids
  for (const asteroid of asteroids) {
    if (asteroid.isAlive) asteroid.update();
  }
  // Update bullets
  for (const bullet of bullets) {
    if (bullet.isAlive) bullet.update();
  }
  // Remove dead bullets
  bullets = bullets.filter(b => b.isAlive);
  // Remove dead asteroids
  asteroids = asteroids.filter(a => a.isAlive);
}

function handleShipAsteroidCollision() {
  if (ship.isAlive) {
    for (const asteroid of asteroids) {
      if (asteroid.isAlive && CollisionSystem.circleCollides(ship, asteroid)) {
        ship.kill();
        gameManager.loseLife();
        break;
      }
    }
  }
}

function handleBulletAsteroidCollision() {
  for (const bullet of bullets) {
    if (!bullet.isAlive) continue;
    for (const asteroid of asteroids) {
      if (asteroid.isAlive && CollisionSystem.circleCollides(bullet, asteroid)) {
        bullet.isAlive = false;
        asteroid.isAlive = false;
        gameManager.addScore(100);
        // Optionally split asteroid if large
        if (asteroid.radius > 25) {
          for (let i = 0; i < 2; i++) {
            asteroids.push(new Asteroid(
              asteroid.x,
              asteroid.y,
              asteroid.radius / 2,
              asteroid.speed * 1.2,
              Math.random() * Math.PI * 2
            ));
          }
        }
        break;
      }
    }
  }
}

function handleCollisions() {
  handleShipAsteroidCollision();
  handleBulletAsteroidCollision();
}

function loop() {
  updateStarfield();
  if (gameStarted) {
    if (!gameManager.gameOver) {
      updateGame();
      handleCollisions();
      // Win condition: all asteroids destroyed
      if (asteroids.length === 0 && ship.isAlive) {
        spawnAsteroids();
      }
      // Game over if ship dead
      if (!ship.isAlive && !gameManager.gameOver) {
        gameManager.loseLife();
      }
    }
  }
  draw();
  // Flashing effect
  flashTimer += 16;
  if (flashTimer > FLASH_INTERVAL) {
    flash = !flash;
    flashTimer = 0;
  }
  requestAnimationFrame(loop);
}


// --- Start/Transition Logic ---
function isStartKey(e) {
  return e.code === "Enter" || e.code === "Space";
}
function isShootKey(e) {
  return e.code === "Space";
}
function isRestartKey(e) {
  return e.code === "KeyR";
}

function handleShoot() {
  if (canShoot && bullets.length < 5) {
    bullets.push(new Bullet(
      ship.x + Math.cos(ship.angle) * ship.radius,
      ship.y + Math.sin(ship.angle) * ship.radius,
      ship.angle
    ));
    canShoot = false;
  }
}

function handleRestart() {
  restartGame();
}

function canShootNow() {
  return gameStarted && !gameManager.gameOver && ship.isAlive;
}
function canRestartNow() {
  return gameManager.gameOver;
}

function handleKeyDown(e) {
  if (!gameStarted && isStartKey(e)) {
    gameStarted = true;
    startGame();
    return;
  }
  if (canShootNow() && isShootKey(e)) {
    handleShoot();
    return;
  }
  if (canRestartNow() && isRestartKey(e)) {
    handleRestart();
  }
}

window.addEventListener("keydown", handleKeyDown);
window.addEventListener("keyup", (e) => {
  if (e.code === "Space") {
    canShoot = true;
  }
});

function startGame() {
  gameManager.reset();
  ship.revive();
  bullets = [];
  asteroids = [];
  spawnAsteroids();
}

function restartGame() {
  gameStarted = true;
  startGame();
}

function spawnAsteroids() {
  asteroids = [];
  for (let i = 0; i < 5; i++) {
    // Spawn away from ship
    let x, y;
    do {
      x = Math.random() * canvas.width;
      y = Math.random() * canvas.height;
    } while (Math.hypot(x - ship.x, y - ship.y) < 100);
    asteroids.push(new Asteroid(x, y, 40 + Math.random() * 20, 1 + Math.random() * 1.5));
  }
}

// Start the splash
requestAnimationFrame(loop);
