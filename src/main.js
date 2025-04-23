// Entry point for Ass-Steroids! (Atari-style Splash)
// Minimal retro splash screen with modular code for future expansion

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Retro color palette
const BG_COLOR = '#000';
const TEXT_COLOR = '#fff';
const ACCENT_COLOR = '#f00';

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

function drawStarfield() {
  ctx.save();
  ctx.fillStyle = '#fff';
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
  ctx.font = 'bold 64px monospace';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.shadowColor = ACCENT_COLOR;
  ctx.shadowBlur = 16;
  ctx.fillStyle = TEXT_COLOR;
  ctx.fillText('ASS-STEROIDS!', canvas.width / 2, canvas.height / 2 - 30);
  ctx.shadowBlur = 0;
  ctx.font = 'bold 32px monospace';
  ctx.fillStyle = ACCENT_COLOR;
  if (flash) {
    ctx.fillText('PRESS START', canvas.width / 2, canvas.height / 2 + 50);
  }
  ctx.restore();
}

function drawCopyright() {
  ctx.save();
  ctx.font = '16px monospace';
  ctx.textAlign = 'center';
  ctx.fillStyle = '#888';
  ctx.fillText('A loving parody of Atari Asteroids', canvas.width / 2, canvas.height - 40);
  ctx.fillText('or: HEMEROIDS', canvas.width / 2, canvas.height - 20);
  ctx.restore();
}

function draw() {
  ctx.fillStyle = BG_COLOR;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  drawStarfield();
  drawSplashText();
  drawCopyright();
}

function loop(ts) {
  updateStarfield();
  draw();
  // Flashing effect
  flashTimer += 16;
  if (flashTimer > FLASH_INTERVAL) {
    flash = !flash;
    flashTimer = 0;
  }
  requestAnimationFrame(loop);
}

// Start the splash
requestAnimationFrame(loop);
