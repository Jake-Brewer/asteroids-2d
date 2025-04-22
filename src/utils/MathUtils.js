// Utility math functions
export function degToRad(degrees) {
  return degrees * Math.PI / 180;
}

export function randomBetween(min, max) {
  return Math.random() * (max - min) + min;
}

export function distance(x1, y1, x2, y2) {
  return Math.hypot(x2 - x1, y2 - y1);
}
