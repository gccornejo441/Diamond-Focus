# Development Rules

Rules for Claude when working in this repository.

---

## Component Structure

- Every new component lives under `src/components/<Feature>/` with subfolders: `components/`, `styles/`, `types/`, `hooks/` as needed; small single-component features may be flat (no subfolders)
- Always create an `index.ts` re-export file as the public API for each feature
- Use path aliases (`@components`, `@hooks`, `@utilities`, `@assets`) — never use relative `../../` imports across feature boundaries
- SVGs are imported as React components via `vite-plugin-svgr` using the `?react` suffix: `import Icon from "@assets/icon.svg?react"`
- One component per file; filename matches the component name exactly

## Routing

- Route files live under `src/routes/`
- Router setup lives in `App.tsx`, not `main.tsx`
- Auth guards wrap protected routes using `useAuth()` from `@utilities/AuthContext`
- Route-level state still follows the localStorage persistence rules below

## State & Persistence

- All app state persists to `localStorage` — do not introduce Redux, Zustand, or any external state library
- Use `appSettings` for settings and `taskLists` for task data; new persistent data that doesn't fit either may use its own clearly named key
- Use `useLocalStorageObjectState` to sync individual settings properties to localStorage
- In new code, read settings via `getParsedSettings("appSettings")` (import from `@components/Setting/utils/Settings`) — avoid calling `localStorage` directly; existing direct calls in legacy hooks are intentional
- All task CRUD flows through `useTasks` — do not duplicate task mutation logic elsewhere
- Firebase is for auth, Firestore, and Storage only — it is not a general state solution

## TypeScript

- Place interfaces and types in a `types/` subfolder within the feature, named `types/<Feature>Types.ts`
- Prefer `interface` over `type` for object shapes; use `type` for unions and aliases
- Never use `any` — use `unknown` and narrow, or define a proper interface
- All component props must be explicitly typed — no implicit prop types
- Use `import.meta.env.VITE_*` for environment variables; never hardcode Firebase config values

## Styling

- All styles use CSS Modules (`.module.css`) — no inline styles, no global class names except in `index.css`; exception: `applyBodyStyles()` in `@utilities/helpers` sets runtime dynamic styles on `document.body` (e.g. user background images)
- Style files live in the feature's `styles/` subfolder, named to match the component (e.g. `Timer.module.css`)
- Do not add third-party CSS libraries — existing globals are imported once: `react-tooltip` and `reactjs-popup` in `main.tsx`, `react-toastify` in `App.tsx`
- Theme changes go through the `theme` property in `appSettings`, not ad-hoc CSS overrides
- Use the `Toast` wrapper from `@utilities/helpers` instead of calling `toast()` directly — it applies consistent positioning and timing
