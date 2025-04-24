# 1.0- CRC Cards for Asteroids 2D Game

This document lists Class-Responsibility-Collaborator (CRC) cards for the main components of the Asteroids 2D game. Each card uses segmented numbering for clarity.

---

## 1.1- Ship
- 1.1.1- **Responsibilities:**
  - 1.1.1.1- Track position, velocity, and rotation
  - 1.1.1.2- Respond to player input (thrust, rotate, shoot)
  - 1.1.1.3- Detect collisions with asteroids
- 1.1.2- **Collaborators:**
  - 1.1.2.1- InputSystem
  - 1.1.2.2- PhysicsSystem
  - 1.1.2.3- CollisionSystem
  - 1.1.2.4- Bullet

---

## 1.2- Asteroid
- 1.2.1- **Responsibilities:**
  - 1.2.1.1- Move with velocity and rotation
  - 1.2.1.2- Split or disappear on collision
  - 1.2.1.3- Respawn as needed
- 1.2.2- **Collaborators:**
  - 1.2.2.1- PhysicsSystem
  - 1.2.2.2- CollisionSystem
  - 1.2.2.3- Ship
  - 1.2.2.4- Bullet

---

## 1.3- Bullet
- 1.3.1- **Responsibilities:**
  - 1.3.1.1- Move forward with constant velocity
  - 1.3.1.2- Detect collisions with asteroids
  - 1.3.1.3- Despawn after time or on collision
- 1.3.2- **Collaborators:**
  - 1.3.2.1- PhysicsSystem
  - 1.3.2.2- CollisionSystem
  - 1.3.2.3- Asteroid

---

## 1.4- InputSystem
- 1.4.1- **Responsibilities:**
  - 1.4.1.1- Capture and process keyboard input
  - 1.4.1.2- Relay input to Ship
- 1.4.2- **Collaborators:**
  - 1.4.2.1- Ship

---

## 1.5- PhysicsSystem
- 1.5.1- **Responsibilities:**
  - 1.5.1.1- Update position and velocity of entities
  - 1.5.1.2- Handle screen wrap-around
- 1.5.2- **Collaborators:**
  - 1.5.2.1- Ship
  - 1.5.2.2- Asteroid
  - 1.5.2.3- Bullet

---

## 1.6- CollisionSystem
- 1.6.1- **Responsibilities:**
  - 1.6.1.1- Detect and resolve collisions
- 1.6.2- **Collaborators:**
  - 1.6.2.1- Ship
  - 1.6.2.2- Asteroid
  - 1.6.2.3- Bullet

---

## 1.7- RenderSystem
- 1.7.1- **Responsibilities:**
  - 1.7.1.1- Draw all entities and UI elements
- 1.7.2- **Collaborators:**
  - 1.7.2.1- Ship
  - 1.7.2.2- Asteroid
  - 1.7.2.3- Bullet
  - 1.7.2.4- GameManager

---

## 1.8- GameManager
- 1.8.1- **Responsibilities:**
  - 1.8.1.1- Manage game state (start, play, game over)
  - 1.8.1.2- Track score and lives
  - 1.8.1.3- Spawn and reset entities
- 1.8.2- **Collaborators:**
  - 1.8.2.1- Ship
  - 1.8.2.2- Asteroid
  - 1.8.2.3- Bullet
  - 1.8.2.4- RenderSystem

---

*Last updated: 2025-04-23*
