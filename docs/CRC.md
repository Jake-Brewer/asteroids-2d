# CRC (Class-Responsibility-Collaborator) Diagram

| Class/System      | Responsibilities                                   | Collaborators           |
|-------------------|----------------------------------------------------|------------------------|
| Ship              | Position, velocity, rotation, draw, update         | InputSystem, Physics   |
| Asteroid          | Position, velocity, size, split, draw, update      | Physics, Collision     |
| Bullet            | Position, velocity, lifespan, draw, update         | Physics, Collision     |
| InputSystem       | Handle keyboard, update ship control state         | Ship                   |
| PhysicsSystem     | Move entities, handle screen wrap                  | Ship, Asteroid, Bullet |
| CollisionSystem   | Detect/handle collisions (ship/asteroid/bullet)    | Ship, Asteroid, Bullet |
| RenderSystem      | Draw all entities and UI                           | Ship, Asteroid, Bullet |
| GameManager       | Manage game state, score, lives, spawning          | All entities/systems   |
| MathUtils         | Math helpers (distance, angle, random)             | All                    |
| Constants         | Game constants (sizes, speeds, etc.)               | All                    |

This CRC diagram will be updated as the design evolves.
