// Asteroid entity definition
// Handles asteroid data and behavior

import { SCREEN_WIDTH, SCREEN_HEIGHT, ASTEROID_MIN_RADIUS } from "../utils/Constants.js";

export default class Asteroid {
  constructor(x, y, radius = ASTEROID_MIN_RADIUS, speed = 1, angle = Math.random() * Math.PI * 2) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.speed = speed;
    this.angle = angle;
    this.velocity = {
      x: Math.cos(angle) * speed,
      y: Math.sin(angle) * speed
    };
    this.isAlive = true;
  }

  update() {
    this.x += this.velocity.x;
    this.y += this.velocity.y;
    // Screen wrapping
    if (this.x < 0) this.x += SCREEN_WIDTH;
    else if (this.x > SCREEN_WIDTH) this.x -= SCREEN_WIDTH;
    if (this.y < 0) this.y += SCREEN_HEIGHT;
    else if (this.y > SCREEN_HEIGHT) this.y -= SCREEN_HEIGHT;
  }

  draw(ctx) {
    ctx.save();
    ctx.strokeStyle = "#fff";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.stroke();
    ctx.restore();
  }
}
