# Claude Rules Design

**Date:** 2026-04-26
**Topic:** `.claude/rules/` development rules file
**Status:** Approved

## Goal

Create a single `.claude/rules/development.md` file that guides Claude in future sessions for this repository. The rules cover component structure, state/persistence, TypeScript, and styling conventions derived from existing codebase patterns.

## Approach

Single file, sectioned by topic, using concise do/don't pairs. Chosen over multiple files (harder to maintain) and a flat list (harder to navigate).

## Design

### Component Structure

- Every new component lives under `src/components/<Feature>/` with subfolders: `components/`, `styles/`, `types/`, `hooks/` as needed
- Always create an `index.ts` re-export file for public API
- Use path aliases (`@components`, `@hooks`, `@utilities`, `@assets`) — never relative `../../` imports across feature boundaries
- SVGs are imported as React components via `vite-plugin-svgr`, not as image URLs
- One component per file; filename matches the component name exactly

### State & Persistence

- All app state persists to `localStorage` — do not introduce Redux, Zustand, or any external state library
- Two root keys only: `appSettings` (settings) and `taskLists` (task data) — new data should fit within these or get its own clearly named key
- Use `useLocalStorageObjectState` for syncing individual settings properties
- Use `getParsedSettings("appSettings")` to read settings — never access `localStorage` directly in components
- All task CRUD flows through `useTasks` — do not duplicate task mutation logic elsewhere
- Firebase is for auth, Firestore, and Storage only — it is not a general state solution

### TypeScript

- Place interfaces and types in a `types/` subfolder within the feature (`types/<Feature>Types.ts`)
- Prefer `interface` over `type` for object shapes; use `type` for unions and aliases
- Never use `any` — use `unknown` and narrow, or define a proper interface
- All component props must be explicitly typed — no implicit prop types
- Use `import.meta.env.VITE_*` for environment variables; never hardcode Firebase config values

### Styling

- All styles use CSS Modules (`.module.css`) — no inline styles, no global class names except in `index.css`
- Style files live in the feature's `styles/` subfolder and are named to match the component (`Timer.module.css`)
- Do not add third-party CSS libraries — existing globals (`react-tooltip`, `reactjs-popup`) are imported once in `main.tsx`
- Theme changes go through the `theme` setting in `appSettings`, not ad-hoc CSS overrides

## Output

Single file: `.claude/rules/development.md`
