---
name: "tod-ops"
description: "Operate and troubleshoot the tod (Vue3+Vite+Tailwind v4) app. Invoke for dev/build/typecheck, UI additions, calendar/state changes, or env debugging."
---

# tod Ops

Operations and diagnostics handbook for this workspace (Vue 3 + Vite + Tailwind v4 + shadcn-vue + Pinia + FullCalendar).

## When to Invoke
- Run/preview/build/type-check requests
- Add/tweak shadcn-vue UI components
- Change Todo/Calendar models or mapping
- Tailwind v4, alias, Volar issues; date/time bugs
- Git operations to GitHub

## Quick Commands
- Dev: `npm run dev`
- Build: `npm run build`
- Preview: `npm run preview`
- Type-check: `npx vue-tsc --noEmit`
- Add UI: `npx shadcn-vue add <component>`
- Git push: `git add . && git commit -m "<msg>" && git push -u origin main`

## Project Map
- Alias: `vite.config.ts` (`"@": "./src"`)
- Theme: `src/assets/main.css`
- Layout: `src/layouts/DefaultLayout.vue`
- Router: `src/router/index.ts`
- Stores: `src/stores/todos.ts`, `src/stores/calendar.ts`
- Views: `src/views/TodolistView.vue`, `src/views/CalendarView.vue`

## Calendar Mapping
- With `time` (HH:mm): `start = YYYY-MM-DDTHH:mm:00`, `allDay=false`
- Without `time`: all-day at `date` (local)

## Troubleshooting
- Aliases: enable Volar, disable Vetur; ensure `tsconfig.app.json` has `types: ["vite/client"]`, `paths`, `ignoreDeprecations: "6.0"`. Reload window + restart TS server.
- Tailwind v4: avoid `@apply ... !important`, use standard CSS overrides in SFC.
- Dates on wrong day: avoid `toISOString()`, use local `YYYY-MM-DD`.

## GitHub
- Remote: `git@github.com:O1ive2/tod.git`
- Branch: `main`

