# Claude Development Rules Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Create `.claude/rules/development.md` — a single rules file that guides Claude in future sessions with conventions for component structure, state/persistence, TypeScript, and styling.

**Architecture:** One markdown file under `.claude/rules/`, organized into four topic sections using concise do/don't pairs. No dependencies on other files; Claude loads it automatically from that directory.

**Tech Stack:** Markdown only.

---

### Task 1: Create the rules directory and file

**Files:**
- Create: `.claude/rules/development.md`

- [ ] **Step 1: Create the directory**

```bash
mkdir -p .claude/rules
```

Expected: directory `.claude/rules/` exists with no error.

- [ ] **Step 2: Create `.claude/rules/development.md` with the following exact content**

```markdown
# Development Rules

Rules for Claude when working in this repository.

---

## Component Structure

- Every new component lives under `src/components/<Feature>/` with subfolders: `components/`, `styles/`, `types/`, `hooks/` as needed
- Always create an `index.ts` re-export file as the public API for each feature
- Use path aliases (`@components`, `@hooks`, `@utilities`, `@assets`) — never use relative `../../` imports across feature boundaries
- SVGs are imported as React components via `vite-plugin-svgr`, not as image URLs
- One component per file; filename matches the component name exactly

## State & Persistence

- All app state persists to `localStorage` — do not introduce Redux, Zustand, or any external state library
- Two root localStorage keys only: `appSettings` (settings) and `taskLists` (task data) — new data must fit within these or use its own clearly named key
- Use `useLocalStorageObjectState` to sync individual settings properties to localStorage
- Use `getParsedSettings("appSettings")` to read settings — never call `localStorage` directly in components
- All task CRUD flows through `useTasks` — do not duplicate task mutation logic elsewhere
- Firebase is for auth, Firestore, and Storage only — it is not a general state solution

## TypeScript

- Place interfaces and types in a `types/` subfolder within the feature, named `types/<Feature>Types.ts`
- Prefer `interface` over `type` for object shapes; use `type` for unions and aliases
- Never use `any` — use `unknown` and narrow, or define a proper interface
- All component props must be explicitly typed — no implicit prop types
- Use `import.meta.env.VITE_*` for environment variables; never hardcode Firebase config values

## Styling

- All styles use CSS Modules (`.module.css`) — no inline styles, no global class names except in `index.css`
- Style files live in the feature's `styles/` subfolder, named to match the component (e.g. `Timer.module.css`)
- Do not add third-party CSS libraries — existing globals (`react-tooltip`, `reactjs-popup`) are already imported once in `main.tsx`
- Theme changes go through the `theme` property in `appSettings`, not ad-hoc CSS overrides
```

- [ ] **Step 3: Verify the file exists and content looks correct**

```bash
cat .claude/rules/development.md
```

Expected: full file content printed with four sections (Component Structure, State & Persistence, TypeScript, Styling).

- [ ] **Step 4: Commit**

```bash
git add .claude/rules/development.md
git commit -m "feat: add Claude development rules"
```

Expected: commit succeeds on master branch.
