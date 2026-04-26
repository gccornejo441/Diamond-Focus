# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev        # Start dev server (requires Node.js 20.19+ or 22.12+)
npm run build      # Type-check then Vite build
npm run lint       # ESLint with auto-fix
npm run format     # Prettier formatting
npm run preview    # Preview production build
```

No test suite is configured.

## Environment

Firebase credentials must be in a `.env` file at the repo root:

```
VITE_FIREBASE_API_KEY
VITE_FIREBASE_AUTH_DOMAIN
VITE_FIREBASE_PROJECT_ID
VITE_FIREBASE_STORAGE_BUCKET
VITE_FIREBASE_MESSAGING_SENDER_ID
VITE_FIREBASE_APP_ID
```

## Path Aliases

Configured in `vite.config.ts`:

| Alias | Maps to |
|---|---|
| `@assets` | `src/assets` |
| `@components` | `src/components` |
| `@utilities` | `src/utilities` |
| `@hooks` | `src/hooks` |

## Architecture

**Diamond Focus** is a Pomodoro/focus timer SPA — React 19 + TypeScript + Vite 8, no backend except Firebase.

### State & Persistence

All app state is stored in `localStorage` (no Redux/Zustand). Two top-level keys:

- `appSettings` — timer durations, theme, alarm sound, feature flags (`SettingsProps`)
- `taskLists` — array of `TaskListProps`, each containing a `tasks` array

Both are initialized at startup in `main.tsx` via `initializeDefaultSettings` / `initializeDefaultTaskList` before the React tree renders. Reading/writing always goes through `getParsedSettings("appSettings")` and direct `localStorage` calls in hooks.

`useLocalStorageObjectState` is a generic hook that reads/writes a single property within a localStorage JSON object — used for individual settings fields.

### Timer

The timer runs in a **Web Worker** (`public/worker.js`) to avoid main-thread drift. `Timer.tsx` spawns and tears down the worker on each play/pause state change. `useTimerEffect` handles the worker communication and triggers the alarm when the countdown reaches zero.

The timer supports two modes toggled by `isBreak`: focus session (`count` seconds) and break (`breakDuration` seconds). Auto-switch flips the mode automatically on completion.

### Task Management

`useTasks` is the central hook for all task CRUD. It holds `taskLists` (all lists) and `currentSelectedTaskList` (the active list), keeps them in sync, and writes through to localStorage on every mutation. Tasks support completion toggle, favorites, inline editing, drag-and-drop reordering (`@dnd-kit`), and moving between lists.

### Auth

Firebase Auth is wrapped in `AuthContext` (`src/utilities/AuthContext.tsx`), provided at the root in `main.tsx`. Components access it via `useAuth()`. Currently supports email/password sign-in only.

### Component Structure

Each feature area lives under `src/components/<Feature>/` with this convention:
- `index.ts` — re-exports
- `components/` — the actual `.tsx` files
- `styles/` or `<Name>.module.css` — CSS Modules (all styling uses CSS Modules)
- `types/` — TypeScript interfaces
- `hooks/` — feature-specific hooks

SVGs are imported as React components via `vite-plugin-svgr`.

### Notable Libraries

| Library | Role |
|---|---|
| `@dnd-kit` | Drag-and-drop task reordering |
| `peerjs` | P2P screen/stream sharing (ShareStream feature) |
| `react-toastify` | Toast notifications |
| `react-contexify` | Right-click context menus |
| `firebase` | Auth, Firestore, Storage |
| `react-router-dom` | Routing (present in deps, minimal use currently) |
