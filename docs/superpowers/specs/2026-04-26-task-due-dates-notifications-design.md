# Task Due Dates & Notifications — Design Spec

**Date:** 2026-04-26
**Status:** Draft

## Overview

Add optional due dates and notification alerts to Diamond Focus tasks. Users can set a due date when creating or editing a task, see visual indicators for upcoming/overdue tasks, and receive configurable in-app and browser notifications.

## Data Model Changes

### `Task` interface — add two optional fields

```typescript
interface Task {
  id: number;
  text: string;
  completed: boolean;
  favorite: boolean;
  createdAt: Date;
  dueDate?: string | null;          // ISO 8601 string (localStorage-safe)
  reminder?: ReminderConfig | null;  // per-task notification config
}
```

### New `ReminderConfig` interface

```typescript
interface ReminderConfig {
  enabled: boolean;
  alertBefore: number;                              // minutes before due date
  recurrence: "none" | "daily" | "weekly" | "monthly";
  lastNotifiedAt?: string | null;                   // ISO string, dedup guard
}
```

### `SettingsProps` — add global notification defaults

```typescript
interface SettingsProps {
  // ...existing 9 fields...
  isDueDateNotificationsOn: boolean;  // master toggle
  defaultAlertBefore: number;         // default minutes (e.g. 15)
}
```

Both new `SettingsProps` fields get defaults in `defaultSettings`:
- `isDueDateNotificationsOn: true`
- `defaultAlertBefore: 15`

All new fields are optional or have defaults, so existing localStorage data deserializes without migration.

## Notification Strategy

### Channels (layered)

1. **Primary — react-toastify Toast**: Always used when notifications are enabled. Uses the existing `Toast()` wrapper from `src/utilities/helpers.ts`.
2. **Secondary — Browser Notification API**: Opt-in via settings. Requires `Notification.requestPermission()`. Fires alongside the toast when permission is granted.

### Detection mechanism

A new hook `useTaskDueNotifications` runs a `setInterval` (60-second poll) on the main thread. Each tick:
1. Reads all task lists from state
2. For each incomplete task with a `dueDate` and `reminder.enabled`:
   - Computes alert threshold: `dueDate - alertBefore minutes`
   - If `now >= threshold` and (`lastNotifiedAt` is null or recurrence interval has elapsed): fire notification, update `lastNotifiedAt`
3. Skips completed tasks and tasks without due dates

### Recurrence behavior

| Pattern | Re-fires after |
|---|---|
| `none` | Never (one-shot) |
| `daily` | 24 hours from `lastNotifiedAt` |
| `weekly` | 7 days from `lastNotifiedAt` |
| `monthly` | 30 days from `lastNotifiedAt` |

The due date itself does not auto-advance. The alert re-fires on the recurrence schedule until the user completes or removes the task.

### Clock mocking note

The poll interval is not hardcoded — it's sourced from a constant (`NOTIFICATION_POLL_INTERVAL_MS`) so Playwright tests can use `page.clock.fastForward()` effectively.

## UI Changes

### Task creation (`TaskInput.tsx`)

Add a calendar icon button next to the text input. Clicking it reveals/toggles an `<input type="datetime-local">` below the text input. The date is optional — submitting without a date creates a task as before.

### Task list display (`TaskItem.tsx`)

Below the task text (alongside the existing relative timestamp), show:
- Due date formatted as relative time (e.g. "due in 3 hours", "overdue by 2 days") using `date-fns`
- Visual indicator: default color for future, warning color for due within alertBefore window, error/red for overdue
- No indicator when `dueDate` is null

### Task detail view (`Sidebar.tsx`)

Add a "Due Date" section below the textarea:
- `<input type="datetime-local">` for setting/editing the due date
- A "Clear" button to remove the due date
- Reminder toggle (enabled/disabled)
- Alert timing dropdown (5, 10, 15, 30, 60 minutes before)
- Recurrence selector (None, Daily, Weekly, Monthly)

### Settings (`Settings.tsx`)

Add a "Notifications" menu item in the settings sidebar. Panel contains:
- Master toggle: "Enable due date notifications"
- Default alert timing dropdown (5, 10, 15, 30, 60 minutes before)
- Browser notifications toggle with permission request flow
- All saved to `appSettings` localStorage key

## New Component

### `DueDatePicker`

A small reusable component wrapping `<input type="datetime-local">` with:
- Props: `value`, `onChange`, `onClear`
- CSS Module styling consistent with existing input patterns
- Used in both `TaskInput.tsx` and `Sidebar.tsx`

## New Hook

### `useTaskDueNotifications`

```
Location: src/hooks/useTaskDueNotifications.ts
Inputs: taskLists (TaskListProps[]), settings (SettingsProps)
Side effects: fires Toast(), optionally fires browser Notification
Interval: 60 seconds (configurable via constant)
```

Returns nothing — purely side-effect driven. Mounted once at the app root level (`App.tsx`).

## Files Changed

| File | Change type |
|---|---|
| `src/components/Sidebar/types/SidebarTypes.ts` | Modify — add `ReminderConfig`, extend `Task` |
| `src/components/Setting/types/SettingTypes.ts` | Modify — extend `SettingsProps`, `SettingPanelProps` |
| `src/components/Setting/utils/Settings.ts` | Modify — update `defaultSettings`, `settingFormHelper` |
| `src/components/TaskPanel/components/TaskInput.tsx` | Modify — add date picker toggle |
| `src/components/TaskPanel/components/TaskItem.tsx` | Modify — display due date + overdue state |
| `src/components/TaskPanel/styles/TaskItem.module.css` | Modify — due date + overdue styles |
| `src/components/TaskPanel/styles/TaskInput.module.css` | Modify — date picker layout |
| `src/components/Sidebar/components/Sidebar/Sidebar.tsx` | Modify — add due date editing section |
| `src/components/Sidebar/components/Sidebar/Sidebar.module.css` | Modify — due date section styles |
| `src/components/Setting/components/Settings.tsx` | Modify — add Notifications panel |
| `src/App.tsx` | Modify — mount `useTaskDueNotifications` |
| `src/utilities/helpers.ts` | Modify — add date formatting helpers if needed |
| **New:** `src/components/TaskPanel/components/DueDatePicker.tsx` | New — reusable date picker |
| **New:** `src/components/TaskPanel/styles/DueDatePicker.module.css` | New — date picker styles |
| **New:** `src/hooks/useTaskDueNotifications.ts` | New — notification polling hook |
| `package.json` | Modify — add `@playwright/test`, add `test:e2e` script |
| **New:** `playwright.config.ts` | New — Playwright configuration |
| **New:** `e2e/due-date-creation.spec.ts` | New — Slice 2 E2E test |
| **New:** `e2e/due-date-display.spec.ts` | New — Slice 3 E2E test |
| **New:** `e2e/due-date-editing.spec.ts` | New — Slice 4 E2E test |
| **New:** `e2e/notification-settings.spec.ts` | New — Slice 5 E2E test |
| **New:** `e2e/due-date-notifications.spec.ts` | New — Slice 6 E2E test |
| **New:** `e2e/recurring-alerts.spec.ts` | New — Slice 7 E2E test |
| **New:** `e2e/browser-notifications.spec.ts` | New — Slice 8 E2E test |

## Implementation Slices

| # | Slice | E2E test? |
|---|---|---|
| 0 | Playwright setup (install, config, npm script) | Smoke test: app loads |
| 1 | Data model + persistence (types, defaults) | No — verified by `tsc` |
| 2 | Due date on task creation (DueDatePicker, TaskInput) | `due-date-creation.spec.ts` |
| 3 | Due date display (TaskItem visual indicators) | `due-date-display.spec.ts` |
| 4 | Due date editing (Sidebar, context menu) | `due-date-editing.spec.ts` |
| 5 | Notification settings UI (Settings panel) | `notification-settings.spec.ts` |
| 6 | Due date checking hook (useTaskDueNotifications, Toast) | `due-date-notifications.spec.ts` (clock mock) |
| 7 | Recurring alerts (recurrence logic + UI selector) | `recurring-alerts.spec.ts` (clock mock) |
| 8 | Browser notifications (Notification API opt-in) | `browser-notifications.spec.ts` (permission mock) |

## E2E Testing Strategy

### Setup

- **Framework:** `@playwright/test` (dev dependency)
- **Config:** `playwright.config.ts` at project root, Chromium only, `webServer` directive starts `npm run dev`
- **Test directory:** `e2e/` at project root
- **Script:** `npm run test:e2e` → `npx playwright test`

### Patterns

- **localStorage seeding:** Tests use `page.evaluate()` to pre-populate `appSettings` and `taskLists` before navigating, ensuring deterministic starting state
- **Clock mocking:** Slices 6-8 use `page.clock.install()` + `page.clock.fastForward()` for time-dependent assertions
- **Toast assertions:** Check for `.Toastify__toast` selector appearance after triggering notifications
- **Browser Notification mocking:** Use `page.evaluate()` to stub `window.Notification` and track constructor calls
- **No Firebase:** Tests exercise core task features without signing in — the app works unauthenticated for tasks

### Test scope per slice

Each test file covers:
1. The happy path for the slice's feature
2. Edge cases (empty state, clearing values, invalid input)
3. Persistence verification (reload page, check state survives)

## Risks & Mitigations

| Risk | Mitigation |
|---|---|
| `<input type="datetime-local">` styling varies by browser/theme | Chromium-only for E2E; CSS Module styling wraps the native input consistently |
| `Date` vs ISO string confusion in localStorage | All new date fields use ISO strings explicitly; `createdAt` left as-is |
| `setInterval` throttled in background tabs | Acceptable for task due dates — sub-minute precision not needed |
| Toast flood if many tasks overdue simultaneously | Batch: max 3 toasts per poll tick, oldest first |
| Existing localStorage data lacks new fields | All new fields are optional with `?` — no migration needed |

## Out of Scope

- Push notifications / service worker
- Server-side scheduling (Firebase Cloud Functions)
- Calendar integration (Google Calendar, iCal export)
- Task priority / sorting by due date (could be a follow-up)
