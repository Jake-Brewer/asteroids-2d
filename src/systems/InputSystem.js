// Input system
// Handles keyboard input and updates ship state

/**
 * InputSystem handles keyboard input and updates the Ship's state.
 * Modular, LLM-friendly design.
 */
export default class InputSystem {
  /**
   * @param {Ship} ship - The player's ship entity to control
   */
  constructor(ship) {
    this.ship = ship;
    this.keys = {
      left: false,
      right: false,
      up: false
    };
    this._bindEvents();
  }

  /**
   * Binds keyboard event listeners for input handling
   */
  _bindEvents() {
    window.addEventListener("keydown", (e) => this._onKeyDown(e));
    window.addEventListener("keyup", (e) => this._onKeyUp(e));
  }

  /**
   * Handles keydown events
   * @param {KeyboardEvent} e
   */
  _onKeyDown(e) {
    switch (e.code) {
      case "ArrowLeft":
      case "KeyA":
        this.keys.left = true;
        break;
      case "ArrowRight":
      case "KeyD":
        this.keys.right = true;
        break;
      case "ArrowUp":
      case "KeyW":
        this.keys.up = true;
        break;
    }
    this._updateShipControls();
  }

  /**
   * Handles keyup events
   * @param {KeyboardEvent} e
   */
  _onKeyUp(e) {
    switch (e.code) {
      case "ArrowLeft":
      case "KeyA":
        this.keys.left = false;
        break;
      case "ArrowRight":
      case "KeyD":
        this.keys.right = false;
        break;
      case "ArrowUp":
      case "KeyW":
        this.keys.up = false;
        break;
    }
    this._updateShipControls();
  }

  /**
   * Updates the ship's rotation and thrusting state based on input
   */
  _updateShipControls() {
    if (this.ship) {
      if (this.keys.left && !this.keys.right) {
        this.ship.setRotation(-1);
      } else if (this.keys.right && !this.keys.left) {
        this.ship.setRotation(1);
      } else {
        this.ship.setRotation(0);
      }
      this.ship.setThrusting(this.keys.up);
    }
  }

  /**
   * Call this in the game loop if needed for future input polling
   */
  update() {
    // No-op for now; all updates handled by events
  }
}
