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

# Testing Setup

## Dependencies
Install these packages for best-practice React testing:

```
npm install --save-dev jest @testing-library/react @testing-library/jest-dom
```

If you want to simulate user events:
```
npm install --save-dev @testing-library/user-event
```

## Running Tests

Add this to your `package.json` if not present:
```json
"scripts": {
  "test": "jest"
}
```

Then run:
```
npm test
```

## Firebase Mocks

The Powerlifting page test mocks Firebase imports. For more advanced Firebase testing, consider using [firebase-mock](https://github.com/soumak77/firebase-mock) or the official Firebase Emulator Suite for integration tests.

---
Test files are in `src/components/__tests__/`. Each page/component has a basic render test as a starting point.