// Ship entity definition
// Highly modular, LLM-first design. All logic is broken into the smallest possible methods.
// This file and class are kept well under 500 lines for maintainability.

import {
  SCREEN_WIDTH,
  SCREEN_HEIGHT,
  SHIP_RADIUS,
  SHIP_THRUST,
  SHIP_ROTATE_SPEED,
} from "../utils/Constants.js";

export default class Ship {
  constructor(x = SCREEN_WIDTH / 2, y = SCREEN_HEIGHT / 2) {
    this.x = x;
    this.y = y;
    this.radius = SHIP_RADIUS;
    this.angle = 0; // Facing up (in radians)
    this.velocity = { x: 0, y: 0 };
    this.rotation = 0; // -1 for left, 1 for right, 0 for none
    this.thrusting = false;
    this.isAlive = true;
  }

  // --- State Update Methods ---

  setRotation(direction) {
    // direction: -1 (left), 1 (right), 0 (none)
    this.rotation = direction;
  }

  setThrusting(isThrusting) {
    this.thrusting = isThrusting;
  }

  kill() {
    this.isAlive = false;
  }

  revive(x = SCREEN_WIDTH / 2, y = SCREEN_HEIGHT / 2) {
    this.x = x;
    this.y = y;
    this.velocity = { x: 0, y: 0 };
    this.angle = 0;
    this.isAlive = true;
  }

  // --- Physics Methods ---

  update() {
    this._updateRotation();
    this._updateThrust();
    this._updatePosition();
    this._wrapScreen();
  }

  _updateRotation() {
    this.angle += this.rotation * SHIP_ROTATE_SPEED;
  }

  _updateThrust() {
    if (this.thrusting) {
      this.velocity.x += Math.cos(this.angle) * SHIP_THRUST;
      this.velocity.y += Math.sin(this.angle) * SHIP_THRUST;
    }
  }

  _updatePosition() {
    this.x += this.velocity.x;
    this.y += this.velocity.y;
  }

  _wrapScreen() {
    if (this.x < 0) this.x += SCREEN_WIDTH;
    else if (this.x > SCREEN_WIDTH) this.x -= SCREEN_WIDTH;
    if (this.y < 0) this.y += SCREEN_HEIGHT;
    else if (this.y > SCREEN_HEIGHT) this.y -= SCREEN_HEIGHT;
  }

  // --- Rendering ---

  draw(ctx) {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.angle);
    this._drawShipShape(ctx);
    ctx.restore();
  }

  _drawShipShape(ctx) {
    ctx.strokeStyle = "#fff";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(this.radius, 0);
    ctx.lineTo(-this.radius * 0.7, this.radius * 0.7);
    ctx.lineTo(-this.radius * 0.4, 0);
    ctx.lineTo(-this.radius * 0.7, -this.radius * 0.7);
    ctx.closePath();
    ctx.stroke();
  }
}

// End of "Ship.js" (well under 500 lines, highly modular, LLM-optimized)
