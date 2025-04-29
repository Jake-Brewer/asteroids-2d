// Collision system
// Detects and handles collisions between entities

export default class CollisionSystem {
  static circleCollides(a, b) {
    const dx = a.x - b.x;
    const dy = a.y - b.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    return dist < (a.radius + b.radius);
  }
}
