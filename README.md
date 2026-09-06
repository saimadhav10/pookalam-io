# 🌸 Pookalam.io — Real-Time Onam Floral Carpet Arcade

<div align="center">

[![Live Game](https://img.shields.io/badge/🎮_Play_Now-pookalam--io.onrender.com-orange?style=for-the-badge&logo=render&logoColor=white)](https://pookalam-io.onrender.com/)
[![React 19](https://img.shields.io/badge/React-19-blue?style=for-the-badge&logo=react)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-8-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Socket.io](https://img.shields.io/badge/Socket.io-4-black?style=for-the-badge&logo=socketdotio)](https://socket.io/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Node.js](https://img.shields.io/badge/Node.js-%3E%3D18-green?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)

<br />

### 🔗 **Live Demo:** [https://pookalam-io.onrender.com/](https://pookalam-io.onrender.com/)

**A festive, fast-paced multiplayer drawing and judging arcade game inspired by the rich Kerala harvest festival tradition of Athapookalam (floral carpet design).**

[Features](#-features) • [How to Play](#-how-to-play) • [Tech Stack](#-tech-stack) • [Getting Started](#-getting-started) • [Deployment](#-deployment) • [Cultural Inspiration](#-cultural-inspiration)

</div>

---

## 🌼 Overview

**Pookalam.io** brings the communal joy and artistry of Onam's traditional flower carpets (*Athapookalam*) to the digital realm! Gather your friends, create or join a private room, study the round's reference Pookalam pattern, and race against the clock to recreate vibrant floral arrangements using authentic botanical colors. Once the timer strikes zero, enter the blind peer-judging arena where every player scores each other's masterpieces before the final champion is crowned on the podium.

---

## ✨ Features

- **🎮 Real-Time Multiplayer Gameplay**: Up to 12 players in private rooms with instant 6-character room codes.
- **🌺 Authentic Kerala Floral Palette**: Draw using traditional floral petal hues named after iconic blooms:
  - 🌺 **Chethi** (Hibiscus Crimson)
  - 🌼 **Jamanthi** (Marigold Gold)
  - 🌸 **Arali** (Oleander Pink)
  - 🤍 **Thumba** (Sacred White)
  - 🌿 **Pachila** (Bilva Leaf Green)
  - 💙 **Shanku** (Butterfly Pea Indigo)
  - 🪻 **Neela**, **Kongini**, **Mulla**, **Manjal**, and more (+ custom color picker)!
- **🖌️ Responsive Drawing Suite**:
  - Smooth HTML5 Canvas brush with variable sizes (`Fine 3px`, `Mid 8px`, `Bold 16px`, `Cluster 28px`).
  - Eraser, instant undo (`Ctrl+Z`), and canvas clear.
  - Live side-by-side reference pattern display.
- **⏱️ Customizable Game Timers**:
  - **Creation Phase**: 30s (Blitz), 60s (Standard), 120s (Artisan), or 180s (Master).
  - **Judging Phase**: 15s (Quick), 30s (Balanced), or 45s (Chill).
- **⭐ Blind Peer Judging System**:
  - Anonymous presentation of each player's canvas.
  - Interactive star rating widget (1 to 5 stars).
  - Players cannot rate their own creations, ensuring fair competition.
- **🏆 Live Scores & Podium Celebrations**:
  - Per-round score breakdowns and rolling leaderboard.
  - High-energy final podium with custom petal drop animations.
- **🎨 Festive Terracotta Aesthetic**:
  - Handcrafted UI styling inspired by Kerala's warm earth, temple architecture, and festival mandalas.

---

## 🎯 How to Play

```
   [ Create / Join Room ]
             │
             ▼
      [ Waiting Room ] ────► Host selects round & judging timers
             │
             ▼
    [ Creation Phase ]  ────► Recreate the reference Pookalam before time runs out!
             │
             ▼
     [ Judging Phase ]  ────► Star-rate each participant's artwork
             │
             ▼
    [ Round Leaderboard ]
             │
   (Repeats for all rounds)
             │
             ▼
     [ Final Podium ]   ────► Crown the Pookalam Master! 👑
```

1. **Enter Lobby**: Visit [pookalam-io.onrender.com](https://pookalam-io.onrender.com/), enter your display name, and click **Create Room** or **Join Room** using a 6-character room code.
2. **Lobby & Setup**: Wait for friends to join. The room host can tweak the creation and judging duration.
3. **Draw**: When the host starts the game, inspect the target Pookalam pattern and paint your floral carpet!
4. **Judge**: View everyone's artwork anonymously and cast your ratings.
5. **Win**: Tally the points across all rounds and celebrate on the grand podium!

---

## 🛠️ Tech Stack

### Frontend (`/client`)
- **React 19** with functional components & custom hooks
- **Vite 8** for instant hot module replacement (HMR) and lightning-fast builds
- **Tailwind CSS 3.4** for responsive, modern UI design
- **HTML5 Canvas API** for responsive multi-stroke drawing and export
- **Socket.io Client 4.8** for bi-directional real-time events

### Backend (`/server`)
- **Node.js** (>= 18.0.0) & **Express**
- **Socket.io 4.7** for room orchestration, real-time timer synchronization, and state management
- **UUID** for session and player token tracking

### Hosting & DevOps
- **Render**: Unified single-service deployment running static Vite assets served by Node.js/Express.

---

## 🚀 Getting Started Locally

### Prerequisites
- [Node.js](https://nodejs.org/) (version 18.0.0 or higher)
- [npm](https://www.npmjs.com/) (version 9 or higher)

### 1. Clone the Repository
```bash
git clone https://github.com/saimadhav10/pookalam-io.git
cd pookalam-io
```

### 2. Install Dependencies
Install dependencies for both client and server:
```bash
npm run install:all
```

### 3. Run Development Servers
Open two terminal windows to run both the frontend and backend with hot reload:

**Terminal 1 (Backend Server):**
```bash
npm run dev:server
# Server runs on http://localhost:3001
```

**Terminal 2 (Frontend Client):**
```bash
npm run dev:client
# Client runs on http://localhost:5173
```

Navigate to `http://localhost:5173` in your browser to start playing!

---

## 📦 Production Build

To build the client assets and test the unified production server locally:

```bash
# Build the client and install production server dependencies
npm run build

# Start the production server
npm start
```
The unified app will be available on `http://localhost:3001` (or the port defined by `PORT`).

---

## ☁️ Deployment

This project includes pre-configured settings for [Render](https://render.com) in `render.yaml`:

```yaml
services:
  - type: web
    name: pookalam-io
    runtime: node
    plan: free
    buildCommand: npm run build
    startCommand: npm start
    envVars:
      - key: NODE_VERSION
        value: 20
```

### Environment Variables
| Variable | Description | Default |
|---|---|---|
| `PORT` | Port the Express server listens on | `3001` |
| `NODE_ENV` | Runtime environment (`development` / `production`) | `production` |
| `VITE_SERVER_URL` | Optional backend URL for client builds (leave blank when co-hosted) | `""` |

---

## 🌺 Cultural Inspiration

**Athapookalam** is an integral part of Onam celebrations across Kerala. Starting on the day of *Atham* through to *Thiruvonam*, households arrange fresh, fragrant petals into intricate geometric and floral patterns at their doorways to welcome King Mahabali.

**Pookalam.io** is a tribute to this heritage—merging collaborative creativity, competitive spirit, and festive community celebration into a modern web arcade game.

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

<div align="center">
  <sub>Made with 💛 for Onam • <a href="https://pookalam-io.onrender.com/">Play Pookalam.io</a></sub>
</div>
