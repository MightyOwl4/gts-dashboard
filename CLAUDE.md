<!-- SPECKIT START -->
For additional context about technologies to be used, project structure,
shell commands, and other important information, read the current plan
<!-- SPECKIT END -->

<!-- MANUAL ADDITIONS START -->

## Stack

Electron + electron-vite + React 19 + TypeScript + Tailwind v4 (Vite plugin) + electron-trpc + electron-builder (NSIS for Windows). See `README.md` for full project layout.

## Mandatory architectural rule: Container/Presentational split

UI code must follow this split so non-TS contributors can submit HTML/Tailwind-only PRs:

- `src/renderer/src/components/presentational/**` — pure JSX + Tailwind, props in only. **No** `useState`, `useEffect`, `useQuery`, `useReducer`, `useContext`, `useMemo`, `useCallback`, `useLayoutEffect`. **No** imports from `@renderer/hooks/*`, `@renderer/lib/*`, `@trpc/*`, `electron`, `electron-trpc/*`, `node:*`. Enforced by `eslint.config.js`.
- `src/renderer/src/hooks/**` — all renderer logic (IPC, derived state, side effects). Expose plain data + callback view-models.
- `src/renderer/src/components/containers/**` — thin wrappers wiring one hook to one presentational component.

When implementing a feature, write the hook first (logic), then the presentational component (pure markup), then a small container to bind them.

## Common commands

- `npm run dev` — full integrated dev with HMR (host Node required)
- `npm run lint` / `npm run typecheck` / `npm test`
- `npm run build:bundle` — bundle main+preload+renderer (no installer)
- `npm run build` — full installer build (Windows host required for NSIS)
- `docker compose up dev` — renderer-only Vite dev server in Docker, port 5173
- `docker compose --profile tools run --rm {install|lint|typecheck|test|bundle}` — containerized tooling

## IPC pattern

All renderer ↔ main calls go through tRPC, never raw `ipcRenderer`. Add new procedures to `src/main/trpc/router.ts`; consume from renderer via `trpc.<namespace>.<procedure>.useQuery/useMutation`. The preload exposes `electron-trpc` only — never expose `fs`, `child_process`, or raw `ipcRenderer`.

<!-- MANUAL ADDITIONS END -->
