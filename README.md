# Calvin Le - Personal Portfolio

Personal portfolio website built with **Next.js (App Router)**, **React 18**, **Material UI (MUI)**, and **Firebase** (Hosting, Realtime Database, Cloud Functions).

## Tech Stack

- **Next.js** - App Router + static export
- **React 18** - UI framework
- **Material-UI (MUI) 5** - Component library + theming
- **Firebase** - Hosting, Realtime Database, Cloud Functions

## Getting Started (Local)

### Prerequisites

- Node.js (v18+ recommended)
- npm

### Install

```bash
npm install
```

### Environment Variables

This app reads Firebase configuration from `NEXT_PUBLIC_FIREBASE_*` variables.

Create `.env.local` (not committed) with:

```bash
NEXT_PUBLIC_FIREBASE_API_KEY=...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=...
NEXT_PUBLIC_FIREBASE_PROJECT_ID=...
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=...
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=...
NEXT_PUBLIC_FIREBASE_APP_ID=...
NEXT_PUBLIC_FIREBASE_DATABASE_URL=...
```

### Run Dev Server

```bash
npm run dev
```

## Build & Preview (Static Export)

### Build

`next.config.mjs` is configured with `output: 'export'`, so `next build` generates a static site in `out/`.

```bash
npm run build
```

### Preview the Static Output

```bash
npm run preview
```

## Deploy (Firebase Hosting)

Firebase Hosting is configured to serve the static export from `out/` in [firebase.json](firebase.json).

### Deploy hosting

```bash
npm run build
firebase deploy --only hosting
```

### Deploy Cloud Functions (optional)

```bash
firebase deploy --only functions
```

## Project Structure

```
app/                      # Next.js App Router routes + root layout
├── layout.jsx            # Root layout (HTML shell + ThemeWrapper)
├── globals.css           # Global CSS imported by layout
├── page.jsx              # Route: /
├── about/page.jsx        # Route: /about
├── work/page.jsx         # Route: /work
├── projects/page.jsx     # Route: /projects
├── powerlifting/page.jsx # Route: /powerlifting
├── speedcubing/page.jsx  # Route: /speedcubing
└── contact/page.jsx      # Route: /contact

components/               # Shared app-wide components (Next-era)
├── ThemeWrapper.jsx      # Client wrapper: theme state + MUI ThemeProvider + NavBar
└── theme.js              # MUI theme definitions (light/dark/red)

lib/                      # Shared libraries/utilities (Next-era)
└── firebase.js           # Firebase client initialization (NEXT_PUBLIC_FIREBASE_*)

src/                      # Legacy component source (reused by Next routes)
├── components/           # Page components + NavBar implementation
│   ├── Home.jsx
│   ├── About.jsx
│   ├── Work.jsx
│   ├── Projects.jsx
│   ├── Powerlifting.jsx  # Reads Realtime DB: powerlifting/user_data
│   ├── Speedcubing.jsx   # Reads Realtime DB: speedcubing/wca_data
│   ├── Contact.jsx
│   └── NavBar.jsx        # Updated to Next Link + usePathname
├── __tests__/            # Jest + Testing Library component tests
├── App.jsx               # No longer used (Vite-era entrypoint)
├── main.jsx              # No longer used (Vite-era entrypoint)
├── firebase.js           # No longer used (Vite-era Firebase init)
└── theme.js              # Original theme file (themes moved to components/theme.js)

functions/                # Firebase Cloud Functions (Node runtime)
└── index.js              # Scheduled jobs fetch external data into Realtime Database

public/                   # Static assets served from /
out/                      # Next static export output (generated)
.next/                    # Next build artifacts (generated)
```

## Data Flow (Powerlifting / Speedcubing)

- The site reads from **Firebase Realtime Database**.
- Scheduled **Cloud Functions** fetch external data and store it under:
  - `powerlifting/user_data`
  - `speedcubing/wca_data`

## Migration Notes (Changelog-Style)

The application was migrated from a Vite + React Router single-page app to Next.js App Router with static export. Major changes included:

1. Next.js was introduced as the primary framework and build tool; Vite and React Router dependencies were removed from the runtime dependency set.
2. A Next.js App Router structure was added under `app/`, with one route file per existing page path.
3. A root layout (`app/layout.jsx`) was added to define the document shell and shared providers.
4. Theme state and theming were moved into a dedicated client wrapper (`components/ThemeWrapper.jsx`) using MUI `ThemeProvider`.
5. Navigation was updated to use Next routing (`next/link`, `next/navigation`) rather than `react-router-dom`.
6. Firebase client initialization was moved to `lib/firebase.js` and updated to read `NEXT_PUBLIC_FIREBASE_*` environment variables.
7. Powerlifting and Speedcubing components were re-pointed to the new Firebase module while retaining Realtime Database read logic.
8. Firebase Hosting configuration was updated to serve the static export output directory (`out/`).
9. Legacy Vite-era entrypoints/config were deprecated in place, and the build/deploy flow was updated to Next.js static export.

## Testing

Jest and Testing Library are configured via:

- `jest.config.mjs`
- `jest.setup.js`

Run:

```bash
npm test
```