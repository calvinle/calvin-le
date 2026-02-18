# Calvin Le - Personal Portfolio

My personal portfolio website built with React, Material-UI, and Firebase.

## Tech Stack

- **React 18** - UI framework
- **Material-UI (MUI) 5** - Component library and theming
- **React Router 7** - Client-side routing
- **Vite 4** - Build tool and dev server
- **Firebase** - Hosting and backend services

## Getting Started

### Prerequisites

- Node.js (v18+)
- npm

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

### Build

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
src/
├── components/       # React components
│   ├── About.jsx
│   ├── Contact.jsx
│   ├── Home.jsx
│   ├── NavBar.jsx
│   ├── Powerlifting.jsx
│   ├── Projects.jsx
│   ├── Speedcubing.jsx
│   └── Work.jsx
├── App.jsx           # Main app with routing
├── firebase.js       # Firebase configuration
├── index.css         # Global styles
├── main.jsx          # Entry point
└── theme.js          # MUI theme configuration
```

## Features

- Responsive design with mobile navigation
- Multiple theme modes (light, dark, red)
- Client-side routing
- Firebase hosting

## Deployment

Deploy to Firebase:

```bash
npm run build
firebase deploy
```
