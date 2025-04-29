// Bullet entity definition
// Handles bullet data and behavior

import { SCREEN_WIDTH, SCREEN_HEIGHT, BULLET_RADIUS, BULLET_SPEED } from "../utils/Constants.js";

export default class Bullet {
  constructor(x, y, angle) {
    this.x = x;
    this.y = y;
    this.radius = BULLET_RADIUS;
    this.speed = BULLET_SPEED;
    this.angle = angle;
    this.velocity = {
      x: Math.cos(angle) * this.speed,
      y: Math.sin(angle) * this.speed
    };
    this.lifespan = 60; // frames
    this.isAlive = true;
  }

  update() {
    this.x += this.velocity.x;
    this.y += this.velocity.y;
    this.lifespan--;
    if (this.lifespan <= 0) this.isAlive = false;
    // Screen wrapping
    if (this.x < 0) this.x += SCREEN_WIDTH;
    else if (this.x > SCREEN_WIDTH) this.x -= SCREEN_WIDTH;
    if (this.y < 0) this.y += SCREEN_HEIGHT;
    else if (this.y > SCREEN_HEIGHT) this.y -= SCREEN_HEIGHT;
  }

  draw(ctx) {
    ctx.save();
    ctx.fillStyle = "#fff";
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
}
