// Game manager
// Manages game state, score, lives, and spawning

export default class GameManager {
  constructor() {
    this.score = 0;
    this.lives = 1; // Single life for simplicity
    this.gameOver = false;
  }

  addScore(points) {
    this.score += points;
  }

  reset() {
    this.score = 0;
    this.lives = 1;
    this.gameOver = false;
  }

  loseLife() {
    this.lives--;
    if (this.lives <= 0) {
      this.gameOver = true;
    }
  }
}
