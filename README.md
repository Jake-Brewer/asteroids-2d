# Asteroids 2D

A modular, maintainable 2D Asteroids-style game built with JavaScript and HTML5 Canvas.

## Overview

- Gameplay like classic Atari Asteroids.
- Developed with LLM-friendly design: small, focused functions and classes.
- Quality gates: ESLint, Prettier, tests via GitHub Actions and local Git hooks.

## Setup & Run

```bash
# Install dependencies (if any)
npm install

# Start local server (e.g., using http-server or live-server)
npm run start

# Run lint and format checks
npm run lint
npm run format

# Run tests
npm test
```

## Development Workflow

File change ➔ Local pre-commit checks ➔ Commit to `dev` ➔ Push to remote
➔ GitHub Actions CI checks ➔ Auto-merge to `main` on pass ➔ Deploy to GitHub Pages / Netlify ➔ Live at https://[your-site-url]

## Project Board

- **Correct Board URL:** https://github.com/users/Jake-Brewer/projects/5

## Directory Structure

```
/ 
├─ src/                 # Source code
├─ docs/                # Documentation and SDLC artifacts
│  ├─ sdlc/             # Developer and architecture docs
│  └─ *.md              # Other docs
├─ .github/             # CI/CD workflows and configs
├─ .husky/              # Git hooks
└─ README.md
