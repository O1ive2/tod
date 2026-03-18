---
name: "personal-organizer-ops"
description: "Operate and troubleshoot the Vue3+Vite+Tailwind v4 app. Invoke for dev/build/typecheck, add shadcn-vue UI, calendar/state changes, or when debugging env issues."
---

# Personal Organizer Ops

Operations and diagnostics handbook for this workspace (Vue 3 + Vite + Tailwind v4 + shadcn-vue + Pinia + FullCalendar). Use this skill to run routine tasks, scaffold UI, and fix common issues.

## When to Invoke
- User requests to run/preview/build/typecheck the project
- Add or tweak shadcn-vue UI components (Button/Input/Checkbox/Dialog/…)
- Change Todo/Calendar data model or mapping logic
- Tailwind v4 / alias / Volar-Vetur issues; calendar/time-zone bugs
- Git tasks: initialize, commit, push to GitHub

## Quick Commands
- Dev server: `npm run dev`
- Build: `npm run build`
- Preview: `npm run preview`
- Type-check: `npx vue-tsc --noEmit`
- Add shadcn-vue component: `npx shadcn-vue add <component>`
- Install deps: `npm i <pkg>` or `npm i -D <pkg>`
- Git push main: `git add . && git commit -m "<msg>" && git push -u origin main`

## Project Map
- Alias config: `vite.config.ts` (`"@": "./src"`)
- Global styles & theme: `src/assets/main.css` (Tailwind v4 `@import "tailwindcss"`)
- Layout: `src/layouts/DefaultLayout.vue`
- Router: `src/router/index.ts`
- Stores:
  - Todos (with `date` and optional `time`): `src/stores/todos.ts`
  - Calendar events (derived from todos): `src/stores/calendar.ts`
- Views:
  - Todolist: `src/views/TodolistView.vue`
  - Calendar: `src/views/CalendarView.vue`

## UI (shadcn-vue)
- Add components via CLI: `npx shadcn-vue add button input checkbox dialog badge card`
- Import from `@/components/ui/<name>`
- Keep rounded shapes, soft shadows; avoid hard divider lines

## Calendar Mapping Rules
- If a todo has `time` (HH:mm): event becomes timed (`start: YYYY-MM-DDTHH:mm:00`, `allDay: false`)
- Without `time`: event is all-day on `date`
- Use local date (`YYYY-MM-DD`) to avoid UTC shift

## Troubleshooting
1) Alias red squiggles (`Cannot find module '@/…'`)
   - Ensure Volar is enabled; Vetur disabled
   - `tsconfig.app.json` contains:
     - `"types": ["vite/client"]`
     - `"baseUrl": "."` and `"paths": { "@/*": ["./src/*"] }"`
     - `"ignoreDeprecations": "6.0"` (TS 6 migration silence)
   - Reload VS Code window and restart TS server

2) Tailwind v4 errors (unknown utilities / `!important` with `@apply`)
   - Use `@tailwindcss/vite` plugin (already configured)
   - In SFC styles, avoid `@apply ... !important`; prefer standard CSS when overriding

3) Dates appearing on “today” only
   - Verify todo creation passes the selected `date`
   - Do not use `toISOString()` for local date; use `YYYY-MM-DD`

## GitHub
- Remote: `git@github.com:O1ive2/tod.git`
- Default branch: `main`
- Push: `git push -u origin main`

## Versions
- Vue 3, Vite (rolldown core), Tailwind CSS v4, Pinia, Volar

