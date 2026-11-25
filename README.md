# Study & Internship Task Tracker

A lightweight, mobile-first task tracker for managing coursework and internship to-dos. Built with React and Vite, with no external UI libraries.

**Live demo:** https://shehinshabeer.github.io/react-task-tracker/

## Features

- Add tasks with a title and a priority (High, Medium, Low)
- Filter by All, Active, or Completed tabs
- Live counter of remaining tasks
- Click a task to mark it done or not done (strikethrough styling)
- Delete individual tasks or clear all completed tasks at once
- Tasks are saved automatically in `localStorage`, with two starter tasks on first visit
- Color-coded priority badges and a responsive card layout

## Tech Stack

- React 18
- Vite 5
- Modern JavaScript (ES6+)
- Plain CSS3

## Getting Started

```bash
git clone https://github.com/shehinshabeer/react-task-tracker.git
cd react-task-tracker
npm install
npm run dev
```

Open the local URL printed in the terminal (usually http://localhost:5173).

## Build

```bash
npm run build     # outputs to dist/
npm run preview   # serve the production build locally
```

## Deploy to GitHub Pages

Deployment is automatic. `vite.config.js` sets `base: '/react-task-tracker/'`, and `.github/workflows/deploy.yml` builds and publishes the site on every push to `main`.

One-time setup: in the repo, go to **Settings → Pages** and set **Source** to **GitHub Actions**.

## Project Structure

```
├── .github/workflows/deploy.yml
├── index.html
├── package.json
├── vite.config.js
└── src
    ├── main.jsx
    ├── App.jsx
    └── App.css
```
